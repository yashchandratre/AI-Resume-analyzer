const express = require("express");
const cors =require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose =require("mongoose");
const dotenv = require("dotenv");
const router =require("./router/auth-router");
const adminRouter = require("./router/admin-router");
const resumeRouter = require("./router/resume-router");
const analysisRouter = require("./router/analysis-router");
const defaultRouter = require("./router/default-router");
const cookieParser = require("cookie-parser")
const user= require('./model/user_model');
dotenv.config();

const PORT = process.env.PORT || 5000;
const app=express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PATCH","DELETE", "PUT"],
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_DB_URL).then(()=> console.log("Mongo DB Connected"))
.catch((e)=> console.log("Error To connect MongoDB: ",e));

app.use((req, res, next) => {
  console.log("🔥 REQUEST:", req.method, req.originalUrl);
  next();
});

app.use("/api/auth",router);
// All admin endpoints live behind /api/admin and are protected in admin-router.js.
app.use("/api/admin", adminRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/analysis", analysisRouter);
app.use("/api/", defaultRouter);

app.get("/health",async(req,res)=>{
    res.status(200).send({message:"Server is running"});
    console.log("Server is running");
});

app.listen(PORT,()=>{
    console.log("🚀 NEW SERVER STARTED");
})
