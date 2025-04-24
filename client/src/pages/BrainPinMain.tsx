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
import axios from "axios";

const BrainPinMain = () => {
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [postCreated, setPostCreated] = useState(false);

  const handleAddContent = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        type,
        title,
        link: { hash: link },
        tags: tags.split(",").map((tag) => ({ title: tag.trim() })),
      };
      await axios.post("https://brainpin.onrender.com/api/posts", newPost, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPostCreated(!postCreated); // Trigger BrainCard to refetch posts
      setIsAddContentOpen(false);
      setType("");
      setTitle("");
      setLink("");
      setTags("");
      alert("Post created successfully!");
    } catch (err) {
      alert("Failed to create post");
    }
  };

  return (
    <div className="h-screen p-4">
      <div className="flex flex-row justify-between">
        <div className="font-bold">All Notes</div>
        <div className="flex gap-2">
          <Button>
            <Share2 className="mr-2 h-4 w-4" /> Share Brain
          </Button>
          <Dialog open={isAddContentOpen} onOpenChange={setIsAddContentOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Content
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Content</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddContent} className="space-y-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  />
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
                <Button type="submit">Create Post</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <BrainCard onPostCreated={postCreated} />
      </div>
    </div>
  );
};

export default BrainPinMain;