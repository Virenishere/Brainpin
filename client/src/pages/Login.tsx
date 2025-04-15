import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold font-medium">Login</CardTitle>
          <CardDescription className="font-medium">
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="abc@example.com" 
              required
              className="font-medium"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-medium">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              required
              className="font-medium"
            />
          </div>
          <Button className="w-full font-medium" type="submit">
            Login
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;