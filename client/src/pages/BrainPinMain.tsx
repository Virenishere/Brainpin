import BrainCard from "@/components/BrainCard";
import { Button } from "@/components/ui/button";
import { Plus, Share2 } from "lucide-react";
import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const BrainPinMain = () => {
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [postCreated, setPostCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const navigate = useNavigate();

  const handleAddContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormMessage(null);
    try {
      const newPost = {
        type,
        title,
        link: link || undefined,
        tags: tags ? tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
      };
      console.log("Creating post with payload:", newPost);
      console.log("Token:", localStorage.getItem("authToken"));
      const response = await axios.post(
        "https://brainpin.onrender.com/api/posts",
        newPost,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("Create post response:", response.data);
      setPostCreated(!postCreated);
      setIsAddContentOpen(false);
      setType("");
      setTitle("");
      setLink("");
      setTags("");
      setFormMessage({ type: "success", text: "Post created successfully!" });
    } catch (err: any) {
      console.error("Create post error:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        navigate("/login");
        setFormMessage({ type: "error", text: "Session expired. Please log in again." });
      } else {
        setFormMessage({
          type: "error",
          text: "Failed to create post: " + (err.response?.data?.message || err.message),
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-black">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="font-bold text-xl mb-4 sm:mb-0">All Notes</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Share2 className="mr-2 h-4 w-4" /> Share Brain
          </Button>
          <Dialog open={isAddContentOpen} onOpenChange={setIsAddContentOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Add Content
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Content</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddContent} className="space-y-4">
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
                {formMessage && (
                  <div
                    className={`text-sm ${
                      formMessage.type === "error" ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {formMessage.text}
                  </div>
                )}
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Creating..." : "Create Post"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <BrainCard onPostCreated={postCreated} />
      </div>
    </div>
  );
};

export default BrainPinMain;