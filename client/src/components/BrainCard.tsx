import * as React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Share2, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

const BrainCard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId"); // Get logged-in user's ID

  // Fetch posts for the logged-in user
  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) {
        setError("Please log in to view your posts");
        setLoading(false);
        return;
      }

      try {
        // Option 1: Backend filters by req.user._id (preferred)
        const response = await axios.get("https://brainpin.onrender.com/api/posts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Option 2: Use query parameter if backend supports it
        // const response = await axios.get(
        //   `https://brainpin.onrender.com/api/posts?userId=${userId}`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     },
        //   }
        // );

        // Option 3: Client-side filtering (fallback if backend doesn't filter)
        // const response = await axios.get("https://brainpin.onrender.com/api/posts");
        // const userPosts = response.data.filter(
        //   (post) => post.userId._id === userId
        // );

        setPosts(response.data); // Use response.data or userPosts for Option 3
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch posts");
        setLoading(false);
      }
    };
    fetchPosts();
  }, [userId]);

  // Delete post
  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`https://brainpin.onrender.com/api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (err) {
        alert("Failed to delete post");
      }
    }
  };

  // Share post
  const handleShare = async (postId) => {
    try {
      const response = await axios.post(
        `https://brainpin.onrender.com/api/posts/${postId}/share`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const shareLink = response.data.shareLink || `https://brainpin.onrender.com/api/posts/shared/${postId}`;
      navigator.clipboard.writeText(shareLink);
      alert("Shareable link copied to clipboard!");
    } catch (err) {
      alert("Failed to share post");
    }
  };

  if (!userId) {
    return <div>Please log in to view your posts.</div>;
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {posts.length === 0 ? (
        <div>No posts found. Create a new post to get started!</div>
      ) : (
        posts.map((post) => (
          <Card key={post._id} className="w-[350px] shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-gray-800">{post.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500">{post.type}</CardDescription>
              </div>
              <div className="flex gap-3">
                <Share2
                  className="h-5 w-5 text-gray-600 hover:text-blue-500 cursor-pointer"
                  onClick={() => handleShare(post._id)}
                />
                <UpdatePostModal post={post} setPosts={setPosts} posts={posts} />
                <Trash2
                  className="h-5 w-5 text-gray-600 hover:text-red-500 cursor-pointer"
                  onClick={() => handleDelete(post._id)}
                />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {post.link?.hash && (
                  <div>
                    <strong className="text-sm font-medium text-gray-700">Link:</strong>{" "}
                    <a
                      href={post.link.hash}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {post.link.hash}
                    </a>
                  </div>
                )}
                <div>
                  <strong className="text-sm font-medium text-gray-700">Tags:</strong>{" "}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium"
                      >
                        #{tag.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

// Update Post Modal Component
const UpdatePostModal = ({ post, setPosts, posts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [link, setLink] = useState(post.link?.hash || "");
  const [tags, setTags] = useState(post.tags.map((tag) => tag.title).join(", "));

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        title,
        link: { hash: link },
        tags: tags.split(",").map((tag) => ({ title: tag.trim() })),
      };
      const response = await axios.put(
        `https://brainpin.onrender.com/api/posts/${post._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPosts(posts.map((p) => (p._id === post._id ? response.data : p)));
      setIsOpen(false);
    } catch (err) {
      alert("Failed to update post");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Edit2 className="h-5 w-5 text-gray-600 hover:text-green-500 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrainCard;