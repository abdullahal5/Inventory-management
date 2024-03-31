const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
 try {
  console.log("connecting to database...");
  const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.zelnjpd.mongodb.net/?retryWrites=true&w=majority`;
  await mongoose.connect(uri, {
   dbName: "foodi",
  });
  console.log("connected to database");
 } catch (error) {
  console.log("MONOGODB CONNECTION FAILED", error);
 }
};

module.exports = connectDB;
