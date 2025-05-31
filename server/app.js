const express = require("express");
const app = express();
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const port = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(cors({
    origin: NODE_ENV === "development" ? "*" : process.env.FRONTEND_URL || "https://defect-detect.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));


// Configure rate limiter middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes window
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        status: 429,
        message: "Too many requests, please try again later."
    }
});

// Apply rate limiter to all requests
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


const router = require("./routes");
app.use("/api", router);

app.listen(port, () => {
    console.log("Server started on port " + port);
});