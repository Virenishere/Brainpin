import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import axios from "axios";
import BrainCard from "@/components/BrainCard";
import { toast } from "sonner";

const TagSearch = ({ postCreated }) => {
  const [tags, setTags] = useState([]);
  const [searchTag, setSearchTag] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) {
        setError("Please log in to view tags");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://brainpin.onrender.com/api/posts",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        const posts = response.data;
        // Extract unique tags
        const allTags = posts.flatMap((post) =>
          post.tags.map((tag) => tag.title)
        );
        const uniqueTags = [...new Set(allTags)].sort();
        setTags(uniqueTags);
        setAllPosts(posts);
        setFilteredPosts(posts); // Initially show all posts
        setLoading(false);
      } catch (err) {
        console.error("Fetch posts error:", err.response?.data || err.message);
        setError(
          "Failed to fetch tags: " +
            (err.response?.data?.message || err.message)
        );
        setLoading(false);
      }
    };
    fetchPosts();
  }, [userId, postCreated]);

  const handleSearch = () => {
    if (!searchTag) {
      setFilteredPosts(allPosts);
      return;
    }

    const filtered = allPosts.filter((post) =>
      post.tags.some((tag) =>
        tag.title.toLowerCase().includes(searchTag.toLowerCase())
      )
    );
    setFilteredPosts(filtered);
    if (filtered.length === 0) {
      toast.info(`No posts found with tag "${searchTag}"`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="tag-search">Search Tags</Label>
        <div className="flex gap-2 mt-1">
          <Input
            id="tag-search"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            placeholder="Enter tag (e.g., react)"
            className="max-w-md font-medium"
          />
          <Button onClick={handleSearch} className="cursor-pointer">
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">All Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.length === 0 ? (
            <p className="font-medium">No tags found.</p>
          ) : (
            tags.map((tag) => (
              <Button
                key={tag}
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTag(tag);
                  handleSearch();
                }}
                className="text-blue-800 border-blue-200 hover:bg-blue-100 cursor-pointer"
              >
                #{tag}
              </Button>
            ))
          )}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Posts</h3>
        <BrainCard posts={filteredPosts} />
      </div>
    </div>
  );
};

export default TagSearch;
