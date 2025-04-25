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
exports.getSharedPost = exports.sharePost = exports.deletePost = exports.getPostsByUserId = exports.getPosts = exports.updatePost = exports.createPost = void 0;
const zod_1 = require("zod");
const postModel_1 = __importDefault(require("../models/postModel"));
const tagsModel_1 = __importDefault(require("../models/tagsModel"));
const linkModel_1 = __importDefault(require("../models/linkModel"));
const postSchema = zod_1.z.object({
    type: zod_1.z.enum(["images", "video", "articles", "audio"]),
    link: zod_1.z.string().url(),
    title: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
});
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { type, link, title, tags } = postSchema.parse(req.body);
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
            res.status(401).json({ message: "Unauthorized: User not authenticated" });
            return;
        }
        let linkDoc = yield linkModel_1.default.findOne({ hash: link });
        if (!linkDoc) {
            linkDoc = yield linkModel_1.default.create({
                hash: link,
                userId: req.user._id,
            });
        }
        const linkId = linkDoc._id;
        let tagIds = [];
        if (tags && tags.length > 0) {
            tagIds = yield Promise.all(tags.map((tagTitle) => __awaiter(void 0, void 0, void 0, function* () {
                let tag = yield tagsModel_1.default.findOne({ title: tagTitle });
                if (!tag) {
                    tag = yield tagsModel_1.default.create({ title: tagTitle });
                }
                return tag._id;
            })));
        }
        const post = yield postModel_1.default.create({
            type,
            link: linkId,
            title,
            tags: tagIds,
            userId: req.user._id,
        });
        const populatedPost = yield postModel_1.default.findById(post._id)
            .populate("link", "hash")
            .populate("tags");
        res.status(201).json(populatedPost);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { type, link, title, tags } = postSchema.partial().parse(req.body);
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
            res.status(401).json({ message: "Unauthorized: User not authenticated" });
            return;
        }
        let linkId;
        if (link) {
            let linkDoc = yield linkModel_1.default.findOne({ hash: link });
            if (!linkDoc) {
                linkDoc = yield linkModel_1.default.create({
                    hash: link,
                    userId: req.user._id,
                });
            }
            linkId = linkDoc._id;
        }
        let tagIds;
        if (tags && tags.length > 0) {
            tagIds = yield Promise.all(tags.map((tagTitle) => __awaiter(void 0, void 0, void 0, function* () {
                let tag = yield tagsModel_1.default.findOne({ title: tagTitle });
                if (!tag) {
                    tag = yield tagsModel_1.default.create({ title: tagTitle });
                }
                return tag._id;
            })));
        }
        const updateData = {};
        if (type)
            updateData.type = type;
        if (linkId)
            updateData.link = linkId;
        if (title)
            updateData.title = title;
        if (tagIds)
            updateData.tags = tagIds;
        const post = yield postModel_1.default.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
        })
            .populate("link", "hash")
            .populate("tags");
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updatePost = updatePost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
            res.status(401).json({ message: "Unauthorized: User not authenticated" });
            return;
        }
        const typeQuery = req.query.type;
        let query = { userId: req.user._id };
        if (typeQuery) {
            const types = typeQuery.split(",");
            query.type = { $in: types };
        }
        const posts = yield postModel_1.default.find(query)
            .populate("tags")
            .populate("link", "hash")
            .populate("userId", "username email");
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
});
exports.getPosts = getPosts;
const getPostsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const typeQuery = req.query.type;
        let query = { userId };
        if (typeQuery) {
            const types = typeQuery.split(",");
            query.type = { $in: types };
        }
        const posts = yield postModel_1.default.find(query)
            .populate("tags")
            .populate("link", "hash")
            .populate("userId", "username email");
        if (posts.length === 0) {
            res.status(404).json({ message: `No posts found for user ${userId}` });
            return;
        }
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
});
exports.getPostsByUserId = getPostsByUserId;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postModel_1.default.findByIdAndDelete(req.params.id);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.json({ message: "Post deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
});
exports.deletePost = deletePost;
const sharePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postModel_1.default.findById(req.params.id);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.json({ message: `Post with ID ${req.params.id} shared successfully.` });
    }
    catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
});
exports.sharePost = sharePost;
const getSharedPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postModel_1.default.findById(req.params.id)
            .populate("tags")
            .populate("link", "hash");
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
});
exports.getSharedPost = getSharedPost;
