require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://inventory-management-client-wheat.vercel.app",
        ],
        credentials: true,
    })
);

// routes
const userRoute = require("./routes/userRoute.js");
const productRoute = require("./routes/productRoute.js")

// routes middlewares
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);

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
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

main();
