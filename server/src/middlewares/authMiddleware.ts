import { Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";


interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Not authorized, token missing" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        req.user = await User.findById(decoded.id).select("-password");
        next(); // Pass control
    } catch (err) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

