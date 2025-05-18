import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import { Pool } from "pg";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

const app = express();
config();
const port = 4000;
app.use(
  cors({
    origin: "https://citycravings1.onrender.com",
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const connectionString = process.env.CONNECTION_STRING;
const pool = new Pool({
  connectionString,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection not established
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("error", (err, client) => {
  console.log("Error on the postgres server side");
  console.error("Unexpected error on idle client", err);
  // Optional: Exit the process if it's critical
  // process.exit(-1);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api", async (req, res) => {});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log("Error in authentication with passport middleware", err);
      return res.status(500).json({ message: "Server error" });
    }
    if (!user) {
      console.log("The user is not available");
      return res.status(401).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });
      console.log("Login successful");
      return res.status(200).json({
        email: user.email,
        userId: user.id,
        verified: true,
        role: user.role,
      });
    });
  })(req, res, next);
}); //password Authentication and login

app.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  console.log(req.body);
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password, address, phone_number, role) values($1, $2, $3, $4, $5, $6)",
      [name, email.toLowerCase(), password, address, phone, "customer"]
    );
    console.log("Successfully registered the user!!");
    res.json({ message: "Registration successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "A server error occured during registration process." });
  }
}); //register user

app.get("/check-session", (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    const name = user.name.split(" ")[0];
    res.status(200).json({ user: name, userId: user.id });
  } else {
    res.json({ user: null });
  }
});

app.post("/logOut", (req, res) => {
  req.logOut(() => {
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out" });
  });
});

app.post(
  "/handleSubmit",
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      console.log("The user is not Authenticated");
      return res
        .status(401)
        .json({ message: "You must be logged in to place an order!!!" });
    }
    next();
  },
  async (req, res) => {
    console.log("The user object looks like this" + req.user);
    const userId = req.user.id;
    const total_price = req.body.total;
    const items = req.body.items;
    try {
      const result = await pool.query(
        "insert into orders (user_id, total_price, status) values ($1, $2, $3) returning id",
        [userId, total_price, "Cooking"]
      );

      const id = result.rows[0].id;
      for (let i = 0; i < items.length; i++) {
        await pool.query(
          "insert into order_items (order_id, quantity, name) values($1, $2, $3)",
          [id, items[i].quantity, items[i].name]
        );
      }
      console.log("Succeffuly inserted into the database");
      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.log("error inserting into the database");
    }
  }
);

app.get(
  "/getOrder",
  (req, res, next) => {
    if (req.user && req.user.role === "customer") {
      console.log("Customer login not authorized");
      return res.status(403).json({ message: "Not authorized!!" });
    } else {
      next();
    }
  },
  async (req, res) => {
    try {
      const result = await pool.query(
        "select order_id, user_id, name,total_price, status, quantity from order_items inner join orders on order_items.order_id = orders.id"
      );
      const groupedItems = [];
      result.rows.forEach((row) => {
        let existing = groupedItems.find(
          (object) => object.order_id === row.order_id
        );

        if (existing) {
          existing.items.push(row);
        } else {
          console.log(row);
          groupedItems.push({
            order_id: row.order_id,
            total_price: row.total_price,
            user_id: row.user_id,
            items: [row],
            status: row.status,
          });
        }
      });
      res.status(200).json({ groupedItems: groupedItems });
    } catch (error) {
      console.log("Error fetching the data from the database.");
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.get(
  "/getOrderCustomer",
  (req, res, next) => {
    req.isAuthenticated() ? next() : res.json({ verified: false });
  },

  async (req, res) => {
    try {
      const userId = req.user.id;
      const result = await pool.query(
        `select order_id, user_id, quantity, name, total_price, status 
        from 
        order_items 
        inner join orders on order_items.order_id = orders.id where user_id = $1`,
        [userId]
      );
      const groupedItems = [];

      result.rows.forEach((row) => {
        const existing = groupedItems.find(
          (order) => order.order_id === row.order_id
        );
        if (!existing) {
          groupedItems.push({
            order_id: row.order_id,
            user_id: row.user_id,
            total_price: row.total_price,
            status: row.status,
            items: [{ name: row.name, quantity: row.quantity }],
          });
        } else {
          existing.items.push({ name: row.name, quantity: row.quantity });
        }
      });

      res.json({
        verified: true,
        message: "Successful",
        groupedItems: groupedItems,
      });
    } catch (error) {
      res.status(500).json({ verified: true, message: "Unsuccessful" });
      console.log("Error fetching data from the database.");
    }
  }
);

app.patch("/updateStatus", async (req, res) => {
  const order_id = req.body.order_id;
  try {
    await pool.query("update orders set status='Ready' WHERE id = $1", [
      order_id,
    ]);
    res.status(200).json({ message: "Updating order status was successful" });
  } catch (error) {
    console.log("Error updating the order status", error);
  }
});

passport.use(
  new Strategy({ usernameField: "email" }, async function verify(
    email,
    password,
    cb
  ) {
    try {
      const result = await pool.query(
        "select id, email, role, password from users where email = $1",
        [email.toLowerCase()]
      );
      if (result.rows.length === 0) {
        return cb(null, false, { message: "Invalid credentials" });
      } else {
        const user = result.rows[0];
        if (user.password === password) {
          return cb(null, user);
        } else {
          return cb(null, false, { message: "Invalid password" });
        }
      }
    } catch (error) {
      console.log("Error on the database connection part", error);
      return cb(error);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, { email: user.email, id: user.id, role: user.role });
});

passport.deserializeUser(async (serializedUser, cb) => {
  try {
    const result = await pool.query("select * from users where email = $1", [
      serializedUser.email,
    ]);

    if (result.rows.length === 0) {
      return cb(null, false);
    }
    cb(null, result.rows[0]);
  } catch (error) {
    cb(error);
  }
});

app.listen(port, () => {
  console.log("The server is running on:" + port);
});
