import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Import cors
import { connectDB } from "./config/dbConnection";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";

// Load env variables
dotenv.config();

// Create express app
const app = express();

// ✅ Enable CORS (this must come before routes)
app.use(cors({
  origin: "https://brainpin.vercel.app", // Vite default port
  credentials: true,
}));

// Parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// APIs
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
