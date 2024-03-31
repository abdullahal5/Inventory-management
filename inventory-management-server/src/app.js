require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db");
const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Inventory management is running");
});

app.all("*", (req, res, next) => {
  const error = new Error(`The requested url is invalid ${req.url}`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

const main = async () => {
  await connectDB()
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
main().catch(console.error);
