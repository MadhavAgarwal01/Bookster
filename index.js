import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";

dotenv.config();
const app = express();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB.");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
});

app.get("/", (req, res) => {
    res.send("Hello bookster");
});

app.listen(8800, () => {
    connect();
    console.log("Connected to backend.");
});

