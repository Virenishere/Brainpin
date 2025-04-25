import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import BrainCard from "@/components/BrainCard";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 max-w-md w-[300px] h-[240px] bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
      <Skeleton className="h-[100px] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

const SharedPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://brainpin.onrender.com/api/posts/shared/${postId}`
        );
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        console.error(
          "Fetch shared post error:",
          err.response?.data || err.message
        );
        const errorMessage =
          err.response?.status === 404
            ? "Post not found. It may have been deleted or the link is invalid."
            : "Failed to fetch post: " +
              (err.response?.data?.message || err.message);
        setError(errorMessage);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId, navigate]);

  return (
    <div className="min-h-screen p-4 flex flex-col items-center bg-white dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Shared Post</h1>
      {loading ? (
        <SkeletonCard />
      ) : error ? (
        <div className="text-center p-4 text-red-500">{error}</div>
      ) : (
        <BrainCard singlePost={post} />
      )}
      <Link to="/" className="mt-4 text-blue-600 hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

export default SharedPost;
