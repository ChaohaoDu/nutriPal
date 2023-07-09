import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// import routes
import dishRoutes from "./routes/dish.js";

// load env variables
dotenv.config();

// init express
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;
const baseApi = "/api/v1";

// routes
app.use(`${baseApi}/dishes`, dishRoutes);

// connect to db
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(err));

// start server
app.listen(PORT, "localhost", () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
