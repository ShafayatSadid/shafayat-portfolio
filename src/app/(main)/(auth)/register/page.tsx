// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const { data: result, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (result) {
        toast.success("Account created successfully!");
        router.push("/");
        router.refresh();
        return;
      }

      toast.error(error?.message || "Registration failed");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 relative overflow-hidden py-10">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center">
        <div className="absolute top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md rounded-3xl border bg-card/80 backdrop-blur-sm p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Create an Account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Join to manage your portfolio seamlessly</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Shafayat Sadid"
                className="pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="password"
                type={isShowPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {isShowPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={isShowConfirm ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setIsShowConfirm(!isShowConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {isShowConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="mt-2 w-full rounded-full" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}