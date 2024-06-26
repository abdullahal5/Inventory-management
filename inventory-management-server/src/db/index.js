const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        console.log("connecting to database...");
        const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.zelnjpd.mongodb.net/?retryWrites=true&w=majority`;
        await mongoose.connect(uri, {
            dbName: "Inventory-management",
        });
        console.log("connected to database");
    } catch (error) {
        console.log("MONOGODB CONNECTION FAILED", error);
    }
};

module.exports = connectDB;
// mongodb+srv://Inventory-Management:RHKjFEmPZB6wyA71@cluster0.zelnjpd.mongodb.net/?retryWrites=true&w=majority