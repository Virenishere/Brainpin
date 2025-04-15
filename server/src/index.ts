import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/dbConnection"
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";

// load env varaibles from .env files
dotenv.config();

// create an express app and also adding a middleware to parse on JSON requests
const app = express();
app.use(express.json());

// connect to MongoDB
connectDB();

//apis
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// default route to check if server is working
app.get("/", (req,res)=>{
    res.send("API is running...");
})

// Start the server on the defined port
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> console.log(`Sever running on http://localhost:${PORT}`));

