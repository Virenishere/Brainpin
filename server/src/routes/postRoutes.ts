import express from "express";
import {
    createPost,
    getPosts,
    getPostsByUserId, // Changed from getPostById
    updatePost,
    deletePost,
    sharePost,
    getSharedPost,
} from "../controllers/postController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", protect, getPosts);
router.get("/:id", getPostsByUserId); // Updated to getPostsByUserId
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

// Share functionalities
router.post("/:id/share", protect, sharePost);
router.get("/shared/:id", getSharedPost);

export default router;