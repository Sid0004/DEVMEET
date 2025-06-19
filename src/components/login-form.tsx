"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, LogIn } from "lucide-react"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await signIn("credentials", {
      redirect: false,
      identifier: email,
      password,
    })

    if (result?.error) {
      setError(result.error)
    } else {
      router.push("/")
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <div className={cn("flex justify-center items-center min-h-[80vh]", className)} {...props}>
      <Card className="w-full max-w-md rounded-2xl border bg-white/80 backdrop-blur-md shadow-2xl dark:bg-black/50">
        <CardHeader className="text-center space-y-2">
          <LogIn className="mx-auto text-muted-foreground" size={28} />
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Sign in to your DevMeet account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email or Username
                </Label>
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                  className="px-4 py-2"
                />
              </div>

              <div className="grid gap-1">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    href="#"
                    className="text-xs text-muted-foreground hover:text-primary underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                    className="px-4 py-2 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full transition-all duration-200"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </div>

            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>

        <div className="px-6 pb-4 text-center text-xs text-muted-foreground">
          By signing in, you agree to our{" "}
          <Link href="#" className="underline hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-primary">
            Privacy Policy
          </Link>
        </div>
      </Card>
    </div>
  )
}
