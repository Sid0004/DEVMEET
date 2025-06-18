"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function SignUpForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      
      if (res.ok) {
        // Automatically sign in the user after successful signup
        const result = await signIn("credentials", {
          redirect: false,
          identifier: form.email,
          password: form.password,
        });

        if (result?.error) {
          setError("Signup successful but login failed. Please try logging in manually.");
          setTimeout(() => {
            router.push("/sign-in");
          }, 2000);
        } else {
          router.push("/");
          router.refresh();
        }
      } else {
        setError(data.error || "Something went wrong during signup");
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Create an account</CardTitle>
        <CardDescription>Sign up to start collaborating on DevMeet</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
              disabled={loading}
              minLength={2}
              maxLength={50}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
              minLength={8}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Password must be at least 8 characters with uppercase, lowercase, number, and special character
            </p>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </form>
        
        <div className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/sign-in" className="underline underline-offset-4">
            Sign in
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
