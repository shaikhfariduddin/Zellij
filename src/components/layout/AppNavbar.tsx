"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  Sparkles, 
  Layers, 
  Bell, 
  User, 
  CheckCircle2, 
  Sun, 
  Moon, 
  PlusCircle, 
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AppNavbarProps {
  projectName?: string;
  projectId?: string;
  saveStatus?: "saved" | "saving" | "idle";
}

export function AppNavbar({ projectName, projectId, saveStatus = "saved" }: AppNavbarProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zellij-border bg-zellij-navy/95 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        {/* Left Section: Brand Logo & Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link href="/app/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-zellij-gold to-[#B89655] flex items-center justify-center shadow-sm shadow-zellij-gold/20 group-hover:scale-105 transition-transform">
              {/* Zellij Geometric Octagonal Mark */}
              <div className="w-4 h-4 border-2 border-zellij-navy rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-zellij-navy" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-zellij-ivory tracking-wide leading-none flex items-center gap-1.5">
                ZELLIJ
                <span className="text-[10px] uppercase font-mono px-1 py-0.5 rounded bg-zellij-gold/10 text-zellij-gold border border-zellij-gold/30">
                  STUDIO
                </span>
              </span>
            </div>
          </Link>

          {projectName && (
            <div className="hidden md:flex items-center gap-2 text-sm text-zellij-mutedText pl-3 border-l border-zellij-border">
              <Link href="/app/dashboard" className="hover:text-zellij-ivory transition-colors">
                Projects
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-zellij-border" />
              <span className="font-medium text-zellij-ivory max-w-[200px] truncate">
                {projectName}
              </span>
              {saveStatus === "saved" && (
                <span className="inline-flex items-center gap-1 text-[11px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                  <CheckCircle2 className="w-3 h-3" /> Saved
                </span>
              )}
              {saveStatus === "saving" && (
                <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" /> Saving...
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/app/projects/new">
            <Button size="sm" className="hidden sm:flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4" />
              <span>New Blueprint</span>
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to Warm Ivory theme" : "Switch to Midnight Navy theme"}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4 text-zellij-mutedText" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-zellij-gold" />
          </Button>

          <div className="w-8 h-8 rounded-full border border-zellij-border bg-zellij-surface flex items-center justify-center text-xs font-semibold text-zellij-gold">
            Z
          </div>
        </div>
      </div>
    </header>
  );
}
