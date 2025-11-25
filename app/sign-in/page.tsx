"use client";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/services/user";
 


import { useState } from "react";

export default function Login() {
    const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false, 
        });

        if (result?.error) {
          throw new Error("Invalid email or password");
        }

        toast.success("Welcome back!");
        router.refresh(); 
        router.push("/dashboard");
      }
      else {
        const res = await createUser({name, email, password});
        if (!res.ok) {
          throw new Error("Registration failed");
        }

        // 2. If registration succeeds, auto sign-in
        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (signInResult?.error) {
          throw new Error("Account created, but failed to auto-login.");
        }

        toast.success("Account created successfully!");
        router.push("/dashboard"); 
        router.refresh();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold tracking-tight">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-sm mt-2">
            {isLogin
              ? "Please enter your details to sign in."
              : "Enter your details to get started."}
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="pl-9"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                className="pl-9"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                className="pl-9"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
              type="button"
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
          </div>

          <Button className="w-full mt-4" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

            {isLogin ? "Sign In" : "Sign Up"}
          </Button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center text-sm ">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Button
            variant="ghost"

            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold hover:underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </Button>
        </div>
      </div>
    </div>
  );
}
function preventDefault() {
  throw new Error("Function not implemented.");
}

