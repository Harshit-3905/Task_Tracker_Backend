const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

const dotenv = require("dotenv");
dotenv.config();

const { connectDB } = require("./config/db");
connectDB();
const path = require("path");
const cors = require("cors");

app.use(cors({ origin: "*" }));

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/task", taskRoutes);

app.get("/",(req,res)=>{
    res.json({
        message: "Server is Up"
    });
})

setInterval(async()=>{
    const res = await fetch("https://tasktrackerbackend-raao.onrender.com/");
    console.log(res.message);
},14*60*1000);

app.listen(PORT, console.log(`Server Started on Port ${PORT}`));
