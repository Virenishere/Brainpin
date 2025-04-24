"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/signup", userController_1.signup);
router.post("/signin", userController_1.signin);
router.get("/profile/:id", authMiddleware_1.protect, userController_1.getProfile);
router.get("/all", authMiddleware_1.protect, userController_1.getAllUsers);
exports.default = router;
