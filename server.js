const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

const dotenv = require("dotenv");
dotenv.config();

const { connectDB } = require("./config/db");
connectDB();
const path = require("path");
// Import the CORS package
const cors = require("cors");

// Configure CORS to allow requests from http://localhost:3000
app.use(cors({ origin: "*" }));

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/task", taskRoutes);

setInterval(()=>{
    console.log("Server is Up")
},14*60*1000);

app.listen(PORT, console.log(`Server Started on Port ${PORT}`));
