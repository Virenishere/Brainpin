import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/userModel";

interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
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

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
        console.log('Protect: Token decoded, user ID:', decoded.id);

        if (!mongoose.connection.readyState) {
            console.error('Protect: Database not connected');
            throw new Error('Database not connected');
        }

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            console.log('Protect: User not found for ID:', decoded.id);
            res.status(401).json({ message: "Not authorized, user not found" });
            return;
        }

        req.user = user;
        console.log('Protect: User authenticated, proceeding to next middleware');
        next();
    } catch (err: any) {
        console.error('Protect error:', err.message, err.stack);
        res.status(401).json({ message: "Not authorized, token failed", error: err.message });
    }
};