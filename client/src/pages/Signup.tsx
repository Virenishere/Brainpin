import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { instance } from "@/lib/axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", { username, email, password });
    setError("");
    try {
      console.log("Making API call to /api/users/signup");
      const response = await instance.post("/api/users/signup", {
        username,
        email,
        password,
      });
      console.log("API response:", response.data);
      const { token, user } = response.data;
      if (!token || !user?.id) {
        throw new Error("No token or user ID received from server");
      }
      console.log("Saving token and userId:", { token, userId: user.id });
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", user.id);
      console.log("Navigating to dashboard");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("API error:", err);
      const errorMessage =
        err.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold font-medium">
            Create Account
          </CardTitle>
          <CardDescription className="font-medium">
            Enter your details to register
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2 mb-2">
              <Label htmlFor="username" className="font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                required
                className="font-medium"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2 mb-2">
              <Label htmlFor="email" className="font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="abc@example.com"
                required
                className="font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2 mb-10">
              <Label htmlFor="password" className="font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button className="w-full font-medium" type="submit">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <div className="flex items-center justify-center pb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
