"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("architect@zellij.app");
  const [password, setPassword] = useState("••••••••••••");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate authentication verification
    setTimeout(() => {
      setIsLoading(false);
      router.push("/app/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-zellij-navy text-zellij-ivory bg-zellij-grid flex flex-col justify-center items-center p-4">
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <div className="w-9 h-9 rounded-md bg-gradient-to-br from-zellij-gold to-[#B89655] flex items-center justify-center shadow-lg shadow-zellij-gold/20 group-hover:scale-105 transition-transform">
          <div className="w-4 h-4 border-2 border-zellij-navy rotate-45 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-zellij-navy" />
          </div>
        </div>
        <span className="font-bold text-xl text-zellij-ivory tracking-wide">
          ZELLIJ
        </span>
      </Link>

      <Card className="w-full max-w-md border-zellij-border bg-zellij-surface/90 shadow-2xl backdrop-blur-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Sign in to Zellij</CardTitle>
          <CardDescription>
            Enter your credentials to access your product blueprints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-red-500/10 border border-red-500/30 text-xs text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zellij-ivory">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zellij-mutedText absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full h-9 pl-9 pr-3 rounded-md bg-zellij-navy border border-zellij-border text-sm text-zellij-ivory focus:outline-none focus:border-zellij-gold transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-medium text-zellij-ivory">Password</label>
                <a href="#" className="text-zellij-gold hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zellij-mutedText absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full h-9 pl-9 pr-3 rounded-md bg-zellij-navy border border-zellij-border text-sm text-zellij-ivory focus:outline-none focus:border-zellij-gold transition-colors"
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-10 font-semibold shadow-lg shadow-zellij-gold/20">
              {isLoading ? "Authenticating..." : "Sign In to Studio"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zellij-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-mono">
              <span className="bg-zellij-surface px-2 text-zellij-mutedText">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" onClick={() => router.push("/app/dashboard")}>
              GitHub
            </Button>
            <Button variant="outline" size="sm" onClick={() => router.push("/app/dashboard")}>
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="justify-center border-t border-zellij-border text-xs text-zellij-mutedText pt-4">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-zellij-gold font-medium ml-1 hover:underline">
            Sign up free
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
