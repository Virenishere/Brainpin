import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import User from "../models/userModel";

const signupSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = signupSchema.parse(req.body);

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exist" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

        res.status(201).json({ token, user: { id: user._id, username, email } });
    } catch (error: any) {
        console.error('Signup error:', error.message, error.stack);
        res.status(400).json({ message: error.message });
    }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = signinSchema.parse(req.body);

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

        res.json({ token, user: { id: user._id, username: user.username, email } });
    } catch (error: any) {
        console.error('Signin error:', error.message, error.stack);
        res.status(400).json({ message: error.message });
    }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.json(user);
    } catch (err: any) {
        console.error('GetProfile error:', err.message, err.stack);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const getAllUsers = async (res: Response): Promise<void> => {
    try {
        console.log('Fetching all users...');
        const users = await User.find().select('-password');
        console.log('Users fetched:', users.length);
        res.json(users);
    } catch (err: any) {
        console.error('GetAllUsers error:', err.message, err.stack);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};