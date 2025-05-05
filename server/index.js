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
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "Yulrubis@58", // Change this to a random secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
    }, // If using HTTPS, set secure: true
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
    if (err) return res.status(500).json({ message: "Server error" });
    if (!user) return res.status(401).json({ message: info.message });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });
      console.log("Login successful");
      return res.status(200).json({ email: user.email, verified: true });
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

app.get("/check-session", async (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    console.log(req.user);
    const name = user.name.split(" ")[0];
    res.status(200).json({ user: name });
  } else {
    console.log("user doesnt exist");
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

passport.use(
  new Strategy({ usernameField: "email" }, async function verify(
    email,
    password,
    cb
  ) {
    try {
      const result = await pool.query(
        "select email, password from users where email = $1",
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
      console.log("Error on the query part.");
      return cb(error);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.email);
});

passport.deserializeUser(async (email, cb) => {
  try {
    const result = await pool.query("select * from users where email = $1", [
      email,
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
