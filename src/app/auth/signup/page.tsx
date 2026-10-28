"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, User, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simple password strength calculation
  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/app/dashboard");
    }, 700);
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
          <CardTitle className="text-2xl font-bold">Create your Zellij Account</CardTitle>
          <CardDescription>
            Turn your digital product vision into complete, build-ready architecture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zellij-ivory">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-zellij-mutedText absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Alex Rivera"
                  className="w-full h-9 pl-9 pr-3 rounded-md bg-zellij-navy border border-zellij-border text-sm text-zellij-ivory focus:outline-none focus:border-zellij-gold transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zellij-ivory">Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zellij-mutedText absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="alex@company.com"
                  className="w-full h-9 pl-9 pr-3 rounded-md bg-zellij-navy border border-zellij-border text-sm text-zellij-ivory focus:outline-none focus:border-zellij-gold transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zellij-ivory">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zellij-mutedText absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a strong password"
                  className="w-full h-9 pl-9 pr-3 rounded-md bg-zellij-navy border border-zellij-border text-sm text-zellij-ivory focus:outline-none focus:border-zellij-gold transition-colors"
                />
              </div>

              {/* Password Strength Meter */}
              {password.length > 0 && (
                <div className="space-y-1 pt-1">
                  <div className="flex gap-1 h-1">
                    <div className={`flex-1 rounded-full ${strength >= 1 ? "bg-red-500" : "bg-zellij-border"}`} />
                    <div className={`flex-1 rounded-full ${strength >= 2 ? "bg-amber-500" : "bg-zellij-border"}`} />
                    <div className={`flex-1 rounded-full ${strength >= 3 ? "bg-zellij-gold" : "bg-zellij-border"}`} />
                    <div className={`flex-1 rounded-full ${strength >= 4 ? "bg-green-500" : "bg-zellij-border"}`} />
                  </div>
                  <div className="flex justify-between text-[10px] text-zellij-mutedText">
                    <span>Min 8 characters, numbers, and symbols</span>
                    <span className="font-mono text-zellij-gold">
                      {strength <= 1 ? "Weak" : strength <= 3 ? "Good" : "Strong"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-10 font-semibold shadow-lg shadow-zellij-gold/20">
              {isLoading ? "Creating Account..." : "Create Account & Get Started"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t border-zellij-border text-xs text-zellij-mutedText pt-4">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-zellij-gold font-medium ml-1 hover:underline">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
