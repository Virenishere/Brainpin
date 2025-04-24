import { Request, Response } from "express";
import { z } from "zod";
import Post, { IPost } from "../models/postModel";
import Tag from "../models/tagsModel";
import Link from "../models/linkModel";
import { Types } from "mongoose";

const postSchema = z.object({
    type: z.enum(["images", "video", "articles", "audio"]),
    link: z.string().url(),
    title: z.string(),
    tags: z.array(z.string()).optional(),
});

// Extend Request interface to include user from auth middleware
interface AuthRequest extends Request {
    user?: { _id: string }; // Adjust based on your auth middleware
}

export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { type, link, title, tags } = postSchema.parse(req.body);

        // Ensure user is authenticated
        if (!req.user?._id) {
            res.status(401).json({ message: "Unauthorized: User not authenticated" });
            return;
        }

        let linkDoc = await Link.findOne({ hash: link });
        if (!linkDoc) {
            linkDoc = await Link.create({
                hash: link,
                userId: req.user._id, // Use req.user._id instead of req.body.userId
            });
        }
        const linkId = linkDoc._id as Types.ObjectId;

        let tagIds: Types.ObjectId[] = [];
        if (tags && tags.length > 0) {
            tagIds = await Promise.all(
                tags.map(async (tagTitle: string): Promise<Types.ObjectId> => {
                    let tag = await Tag.findOne({ title: tagTitle });
                    if (!tag) {
                        tag = await Tag.create({ title: tagTitle });
                    }
                    return tag._id as Types.ObjectId;
                })
            );
        }

        const post = await Post.create({
            type,
            link: linkId,
            title,
            tags: tagIds,
            userId: req.user._id, // Use req.user._id for post as well
        });

        const populatedPost = await Post.findById(post._id)
            .populate("link", "hash")
            .populate("tags");

        res.status(201).json(populatedPost);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Update updatePost similarly
export const updatePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { type, link, title, tags } = postSchema.partial().parse(req.body);

        // Ensure user is authenticated
        if (!req.user?._id) {
            res.status(401).json({ message: "Unauthorized: User not authenticated" });
            return;
        }

        let linkId: Types.ObjectId | undefined;
        if (link) {
            let linkDoc = await Link.findOne({ hash: link });
            if (!linkDoc) {
                linkDoc = await Link.create({
                    hash: link,
                    userId: req.user._id, // Use req.user._id
                });
            }
            linkId = linkDoc._id as Types.ObjectId;
        }

        let tagIds: Types.ObjectId[] | undefined;
        if (tags && tags.length > 0) {
            tagIds = await Promise.all(
                tags.map(async (tagTitle: string): Promise<Types.ObjectId> => {
                    let tag = await Tag.findOne({ title: tagTitle });
                    if (!tag) {
                        tag = await Tag.create({ title: tagTitle });
                    }
                    return tag._id as Types.ObjectId;
                })
            );
        }

        const updateData: Partial<IPost> = {};
        if (type) updateData.type = type;
        if (linkId) updateData.link = linkId;
        if (title) updateData.title = title;
        if (tagIds) updateData.tags = tagIds;

        const post = await Post.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
        })
            .populate("link", "hash")
            .populate("tags");

        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }

        res.json(post);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Other functions (getPosts, getPostById, deletePost, sharePost, getSharedPost) remain unchanged
export const getPosts = async (_req: Request, res: Response): Promise<void> => {
    const posts = await Post.find()
        .populate("tags")
        .populate("link", "hash")
        .populate("userId", "username email");
    res.json(posts);
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("tags")
            .populate("link", "hash");
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.json(post);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.json({ message: "Post deleted successfully" });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
};

export const sharePost = async (req: Request, res: Response): Promise<void> => {
    const postId = req.params.id;
    res.json({ message: `Post with ID ${postId} shared successfully.` });
};

export const getSharedPost = async (req: Request, res: Response): Promise<void> => {
    const postId = req.params.id;
    res.json({ message: `Shared post with ID ${postId}` });
};