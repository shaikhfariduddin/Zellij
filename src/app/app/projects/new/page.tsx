"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, MessageSquare, ArrowRight, ArrowLeft } from "lucide-react";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function NewProjectChoicePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zellij-navy text-zellij-ivory flex flex-col">
      <AppNavbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center space-y-8">
        <div className="text-center space-y-3">
          <Link href="/app/dashboard" className="inline-flex items-center text-xs text-zellij-mutedText hover:text-zellij-ivory transition-colors mb-2">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zellij-ivory">
            Start a New Product Blueprint
          </h1>
          <p className="text-sm text-zellij-mutedText max-w-md mx-auto">
            Choose how you want to initiate requirements discovery. Both paths lead to the same comprehensive 5-module architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Path A Card */}
          <Card 
            onClick={() => router.push("/app/projects/new/idea")}
            className="cursor-pointer border-zellij-border bg-zellij-surface/70 hover:bg-zellij-surface hover:border-zellij-gold/60 transition-all duration-200 group p-6 flex flex-col justify-between space-y-6 shadow-md hover:shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-zellij-goldMuted border border-zellij-gold/30 flex items-center justify-center text-zellij-gold group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <Badge variant="gold" className="text-[10px] font-mono">
                  FASTEST
                </Badge>
              </div>

              <div>
                <CardTitle className="text-xl font-bold group-hover:text-zellij-gold transition-colors">
                  Path A: I Have an Idea
                </CardTitle>
                <CardDescription className="text-xs text-zellij-mutedText mt-2 leading-relaxed">
                  For creators with a defined concept, feature bullet points, or existing raw notes. Describe your product in plain text and let the AI extract structured domain models.
                </CardDescription>
              </div>

              <div className="space-y-1.5 text-xs text-zellij-mutedText border-t border-zellij-border/60 pt-3">
                <p>• Natural language prompt input</p>
                <p>• Support for pasted specifications</p>
                <p>• Instant domain & entity extraction</p>
              </div>
            </div>

            <Button className="w-full font-semibold shadow-md shadow-zellij-gold/20">
              <span>Write My Idea</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>

          {/* Path B Card */}
          <Card 
            onClick={() => router.push("/app/projects/new/guided")}
            className="cursor-pointer border-zellij-border bg-zellij-surface/70 hover:bg-zellij-surface hover:border-blue-400/60 transition-all duration-200 group p-6 flex flex-col justify-between space-y-6 shadow-md hover:shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <Badge variant="secondary" className="text-[10px] font-mono border-blue-400/30 text-blue-300">
                  GUIDED INTERVIEW
                </Badge>
              </div>

              <div>
                <CardTitle className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                  Path B: Help Me Develop My Idea
                </CardTitle>
                <CardDescription className="text-xs text-zellij-mutedText mt-2 leading-relaxed">
                  For founders who have a rough vision but need guided questions to pinpoint the target audience, core feature boundaries, monetization, and technical requirements.
                </CardDescription>
              </div>

              <div className="space-y-1.5 text-xs text-zellij-mutedText border-t border-zellij-border/60 pt-3">
                <p>• 1-by-1 focused strategic questions</p>
                <p>• AI smart answer suggestions</p>
                <p>• Skip non-essential questions freely</p>
              </div>
            </div>

            <Button variant="secondary" className="w-full font-semibold border-blue-500/30 hover:border-blue-400 text-zellij-ivory">
              <span>Start Guided Interview</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
