import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 4000;
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/api", (req, res) => {
  res.json({ message: "This API is up and running!!!" });
});

app.listen(port, () => {
  console.log("The server is running on:" + port);
});
