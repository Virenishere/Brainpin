import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Share2, Trash2, Edit2, FileText, Youtube, Twitter } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";

const BrainCard = ({ onPostCreated, singlePost, posts }) => {
  const [internalPosts, setInternalPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const typeFilter = singlePost || posts ? null : queryParams.get("type");

  useEffect(() => {
    if (singlePost) {
      setInternalPosts([singlePost]);
      setLoading(false);
      return;
    }

    if (posts) {
      setInternalPosts(posts);
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      if (!userId) {
        setError("Please log in to view your posts");
        setLoading(false);
        return;
      }

      try {
        let response;
        const types = typeFilter ? typeFilter.split(",") : [];
        if (types.length > 1) {
          // Fetch all posts and filter client-side
          response = await axios.get("https://brainpin.onrender.com/api/posts", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          const filteredPosts = response.data.filter((post) =>
            types.includes(post.type)
          );
          setInternalPosts(filteredPosts);
        } else {
          // Single type or no filter
          const url = typeFilter
            ? `https://brainpin.onrender.com/api/posts?type=${typeFilter}`
            : "https://brainpin.onrender.com/api/posts";
          response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          setInternalPosts(response.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Fetch posts error:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          navigate("/login");
          setError("Session expired. Please log in again.");
        } else {
          setError(
            "Failed to fetch posts: " +
              (err.response?.data?.message || err.message)
          );
        }
        setLoading(false);
      }
    };
    fetchPosts();
  }, [userId, onPostCreated, typeFilter, navigate, singlePost, posts]);

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`https://brainpin.onrender.com/api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setInternalPosts(internalPosts.filter((post) => post._id !== postId));
        toast.success("Post deleted successfully!");
      } catch (err) {
        console.error("Delete post error:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          navigate("/login");
          toast.error("Session expired. Please log in again.");
        } else {
          toast.error(
            "Failed to delete post: " +
              (err.response?.data?.message || err.message)
          );
        }
      }
    }
  };

  const handleShare = async (postId) => {
    try {
      await axios.post(
        `https://brainpin.onrender.com/api/posts/${postId}/share`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      const shareLink = `${window.location.origin}/shared/${postId}`;
      navigator.clipboard.writeText(shareLink);
      toast.success("Shareable link copied to clipboard!");
    } catch (err) {
      console.error("Share post error:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        navigate("/login");
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(
          "Failed to share post: " + (err.response?.data?.message || err.message)
        );
      }
    }
  };

  const typeIcons = {
    articles: <FileText className="h-5 w-5 text-gray-600 inline-block mr-2" />,
    video: <Youtube className="h-5 w-5 text-gray-600 inline-block mr-2" />,
    images: <Twitter className="h-5 w-5 text-gray-600 inline-block mr-2" />,
    audio: <Twitter className="h-5 w-5 text-gray-600 inline-block mr-2" />,
  };

  if (!userId && !singlePost && !posts) {
    return <div>Please log in to view your posts.</div>;
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      className={`${
        singlePost
          ? "flex justify-center"
          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
      }`}
    >
      {internalPosts.length === 0 ? (
        <div className="col-span-full text-center">
          No posts found. Try a different filter or create a new post!
        </div>
      ) : (
        internalPosts.map((post) => (
          <Card key={post._id} className="w-full max-w-md shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {typeIcons[post.type] || null}
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {post.type}
                </CardDescription>
              </div>
              <div className="flex gap-3">
                <Share2
                  className="h-5 w-5 text-gray-600 hover:text-blue-500 cursor-pointer"
                  onClick={() => handleShare(post._id)}
                />
                {!singlePost && (
                  <>
                    <UpdatePostModal
                      post={post}
                      setPosts={setInternalPosts}
                      posts={internalPosts}
                    />
                    <Trash2
                      className="h-5 w-5 text-gray-600 hover:text-red-500 cursor-pointer"
                      onClick={() => handleDelete(post._id)}
                    />
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {post.link?.hash && (
                  <div>
                    <strong className="text-sm font-medium text-gray-700">
                      Link:
                    </strong>{" "}
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
                  <strong className="text-sm font-medium text-gray-700">
                    Tags:
                  </strong>{" "}
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

const UpdatePostModal = ({ post, setPosts, posts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(post.type);
  const [title, setTitle] = useState(post.title);
  const [link, setLink] = useState(post.link?.hash || "");
  const [tags, setTags] = useState(post.tags.map((tag) => tag.title).join(", "));
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        type,
        title,
        link: link || undefined,
        tags: tags ? tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
      };
      const response = await axios.put(
        `https://brainpin.onrender.com/api/posts/${post._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setPosts(posts.map((p) => (p._id === post._id ? response.data : p)));
      setIsOpen(false);
      toast.success("Post updated successfully!");
    } catch (err) {
      console.error("Update post error:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        navigate("/login");
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(
          "Failed to update post: " + (err.response?.data?.message || err.message)
        );
      }
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
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={setType} required>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="articles">Articles</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="images">Images</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            <Label htmlFor="link">Link (optional)</Label>
            <Input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          <div>
            <Label htmlFor="tags">Tags (comma-separated, optional)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tag1, tag2"
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrainCard;