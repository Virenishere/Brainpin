"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.protect, postController_1.createPost);
router.get("/", postController_1.getPosts);
router.get("/:id", postController_1.getPostById);
router.put("/:id", authMiddleware_1.protect, postController_1.updatePost);
router.delete("/:id", authMiddleware_1.protect, postController_1.deletePost);
// share functionalities
router.post("/:id/share", authMiddleware_1.protect, postController_1.sharePost);
router.get("/shared/:id", postController_1.getSharedPost);
exports.default = router;
