import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/dbConnection";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";

// Load env variables
dotenv.config();

// Create express app
const app = express();

// Define allowed origins
const allowedOrigins = [
  "https://brainpin.vercel.app",
  "http://localhost:8000",
  "http://localhost:5173", 
];

// Enable CORS with dynamic origin
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., Postman or curl) test
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// APIs
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Default route
app.get("/", (_req: Request, res: Response) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));