import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import { Pool } from "pg";

const app = express();
config();
const port = 4000;
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/api", async (req, res) => {});

app.post("/login", async (req, res) => {
  //password Authentication and login
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await pool.query(
      "select email, password from users where email = $1 and password = $2",
      [email, password]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({
        verified: false,
        message: "Email or password did not match our recoreds",
      });
    }
    return res
      .status(200)
      .json({ verified: true, message: "Login Successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ verified: false, message: "Server Error try again later." });
  }
});

app.post("register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const result = await pool.query(
    "INSERT INTO users (name, email, password, address, phone_number, role) values($1, $2, $3, $4, $5, $6)",
    [name, email, password, address, phone, "customer"]
  );
});

app.listen(port, () => {
  console.log("The server is running on:" + port);
});
