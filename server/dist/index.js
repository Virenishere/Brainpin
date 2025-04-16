"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dbConnection_1 = require("./config/dbConnection");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
// Load env variables
dotenv_1.default.config();
// Create express app
const app = (0, express_1.default)();
// Enable CORS (this must come before routes)
app.use((0, cors_1.default)({
    origin: "https://brainpin.vercel.app",
    credentials: true,
}));
// Parse JSON
app.use(express_1.default.json());
// Connect to MongoDB
(0, dbConnection_1.connectDB)();
// APIs
app.use("/api/users", userRoutes_1.default);
app.use("/api/posts", postRoutes_1.default);
// Default route
app.get("/", (_req, res) => {
    res.send("API is running...");
});
// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
