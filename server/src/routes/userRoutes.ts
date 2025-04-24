import express from "express";
import { signup, signin, getProfile, getAllUsers } from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile/:id", protect, getProfile);
router.get("/all", protect, getAllUsers);

export default router;