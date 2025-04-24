"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../models/userModel"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log('Protect: No token provided');
        res.status(401).json({ message: "Not authorized, token missing" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        if (!process.env.JWT_SECRET) {
            console.error('Protect: JWT_SECRET is not defined');
            throw new Error('Server configuration error: JWT_SECRET missing');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log('Protect: Token decoded, user ID:', decoded.id);
        if (!mongoose_1.default.connection.readyState) {
            console.error('Protect: Database not connected');
            throw new Error('Database not connected');
        }
        const user = yield userModel_1.default.findById(decoded.id).select("-password");
        if (!user) {
            console.log('Protect: User not found for ID:', decoded.id);
            res.status(401).json({ message: "Not authorized, user not found" });
            return;
        }
        req.user = user;
        console.log('Protect: User authenticated, proceeding to next middleware');
        next();
    }
    catch (err) {
        console.error('Protect error:', err.message, err.stack);
        res.status(401).json({ message: "Not authorized, token failed", error: err.message });
    }
});
exports.protect = protect;
