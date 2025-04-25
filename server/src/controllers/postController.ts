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
    user?: { _id: string };
}

export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { type, link, title, tags } = postSchema.parse(req.body);

        if (!req.user?._id) {
            res.status(401).json({ message: "Unauthorized: User not authenticated" });
            return;
        }

        let linkDoc = await Link.findOne({ hash: link });
        if (!linkDoc) {
            linkDoc = await Link.create({
                hash: link,
                userId: req.user._id,
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
            userId: req.user._id,
        });

        const populatedPost = await Post.findById(post._id)
            .populate("link", "hash")
            .populate("tags");

        res.status(201).json(populatedPost);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updatePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { type, link, title, tags } = postSchema.partial().parse(req.body);

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
                    userId: req.user._id,
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

export const getPosts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user?._id) {
            res.status(401).json({ message: "Unauthorized: User not authenticated" });
            return;
        }

        const typeQuery = req.query.type as string;
        let query: { userId: string; type?: any } = { userId: req.user._id };

        if (typeQuery) {
            const types = typeQuery.split(",");
            query.type = { $in: types };
        }

        const posts = await Post.find(query)
            .populate("tags")
            .populate("link", "hash")
            .populate("userId", "username email");

        res.json(posts);
    } catch (error: any) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

export const getPostsByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const typeQuery = req.query.type as string;

        let query: { userId: string; type?: any } = { userId };

        if (typeQuery) {
            const types = typeQuery.split(",");
            query.type = { $in: types };
        }

        const posts = await Post.find(query)
            .populate("tags")
            .populate("link", "hash")
            .populate("userId", "username email");

        if (posts.length === 0) {
            res.status(404).json({ message: `No posts found for user ${userId}` });
            return;
        }

        res.json(posts);
    } catch (error: any) {
        res.status(500).json({ message: "Server error: " + error.message });
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
    } catch (error: any) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

export const sharePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.json({ message: `Post with ID ${req.params.id} shared successfully.` });
    } catch (error: any) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

export const getSharedPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("tags")
            .populate("link", "hash");
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.json(post);
    } catch (error: any) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
};