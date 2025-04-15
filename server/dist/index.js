"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnection_1 = require("./config/dbConnection");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
// load env varaibles from .env files
dotenv_1.default.config();
// create an express app and also adding a middleware to parse on JSON requests
const app = (0, express_1.default)();
app.use(express_1.default.json());
// connect to MongoDB
(0, dbConnection_1.connectDB)();
//apis
app.use("/api/users", userRoutes_1.default);
app.use("/api/posts", postRoutes_1.default);
// default route to check if server is working
app.get("/", (req, res) => {
    res.send("API is running...");
});
// Start the server on the defined port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Sever running on http://localhost:${PORT}`));
