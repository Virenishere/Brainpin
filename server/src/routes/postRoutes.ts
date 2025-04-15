import express from "express";
import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    sharePost,
    getSharedPost,
} from "../controllers/postController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

// share functionalities
router.post("/:id/share", protect, sharePost);
router.get("/shared/:id", getSharedPost);

export default router;
