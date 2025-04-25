import BrainCard from "@/components/BrainCard";
import TagSearch from "@/components/TagSearch"; // New component
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
import { useNavigate, useLocation } from "react-router-dom";
import { instance } from "@/lib/axios";
import { toast } from "sonner";

const BrainPinMain = () => {
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [postCreated, setPostCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isTagSearch = location.pathname === "/dashboard/tags";

  const handleAddContent = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate type and title
    if (!type || !title) {
      toast.error("Please provide a type and title");
      setIsLoading(false);
      return;
    }

    try {
      const newPost = {
        type,
        title,
        link: link || undefined,
        tags: tags
          ? tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
          : [],
      };
      const response = await instance.post("api/posts", newPost, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setPostCreated(!postCreated);
      setIsAddContentOpen(false);
      setType("");
      setTitle("");
      setLink("");
      setTags("");
      toast.success("Post created successfully!");
    } catch (err) {
      console.error("Create post error:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        navigate("/login");
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(
          "Failed to create post: " +
            (err.response?.data?.message || err.message)
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="font-bold text-xl mb-4 sm:mb-0">
          {isTagSearch ? "Tag Search" : "All Notes"}
        </h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full cursor-pointer sm:w-auto">
            <Share2 className="mr-2 h-4 w-4" /> Share Brain
          </Button>
          <Dialog open={isAddContentOpen} onOpenChange={setIsAddContentOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto cursor-pointer">
                <Plus className="mr-2 h-4 w-4" /> Add Content
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Content</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleAddContent}
                className="space-y-4 font-medium"
              >
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={type} onValueChange={setType} required>
                    <SelectTrigger id="type" className="cursor-pointer">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent className="font-medium">
                      <SelectItem value="articles" className="cursor-pointer">
                        Articles
                      </SelectItem>
                      <SelectItem value="video" className="cursor-pointer">
                        Video
                      </SelectItem>
                      <SelectItem value="images" className="cursor-pointer">
                        Images
                      </SelectItem>
                      <SelectItem value="audio" className="cursor-pointer">
                        Audio
                      </SelectItem>
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
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <Label htmlFor="link">Link (optional)</Label>
                  <Input
                    id="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://example.com"
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated, optional)</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="tag1, tag2"
                    className="cursor-pointer"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer"
                >
                  {isLoading ? "Creating..." : "Create Post"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="w-full">
        {isTagSearch ? (
          <TagSearch postCreated={postCreated} />
        ) : (
          <BrainCard onPostCreated={postCreated} />
        )}
      </div>
    </div>
  );
};

export default BrainPinMain;
