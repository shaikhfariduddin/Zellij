"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, ArrowLeft, UploadCloud, Layers } from "lucide-react";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TargetPlatform, ZellijProject } from "@/types/blueprint";
import { analyzeIdeaToDiscovery } from "@/lib/ai-engine";
import { saveProject } from "@/lib/storage";

export default function IdeaSubmissionPage() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [targetPlatform, setTargetPlatform] = useState<TargetPlatform>("SAAS");
  const [ideaText, setIdeaText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const platforms: { id: TargetPlatform; label: string }[] = [
    { id: "SAAS", label: "Full SaaS Platform" },
    { id: "WEB", label: "Web Application" },
    { id: "MOBILE", label: "Mobile App (iOS/Android)" },
    { id: "INTERNAL_TOOL", label: "Internal Team Tool" },
    { id: "API_SERVICE", label: "API / Backend Service" },
  ];

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ideaText.trim().length < 20) return;

    setIsAnalyzing(true);

    try {
      // Run AI discovery extraction
      const discovery = await analyzeIdeaToDiscovery(ideaText, targetPlatform);

      const newId = "proj-" + Math.random().toString(36).substring(2, 9);
      const name = projectName.trim() || "New Digital Blueprint";

      const newProject: ZellijProject = {
        id: newId,
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: ideaText.slice(0, 160) + "...",
        targetPlatform,
        technicalDepth: "ARCHITECT",
        status: "DISCOVERY",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        problemStatement: discovery.problemStatement,
        targetPersonas: discovery.targetPersonas,
        clarifications: discovery.clarifications,
        assumptions: discovery.assumptions,
        requirements: [],
        features: [],
        screens: [],
        workflows: [],
        techSpec: {
          architectureStyle: "MODULAR_MONOLITH",
          frontendStack: { framework: "Next.js 15", styling: "Tailwind CSS", stateManagement: "Zustand" },
          backendStack: { runtime: "Node.js 22", language: "TypeScript", framework: "Next.js API", database: "PostgreSQL 16", orm: "Prisma" },
          databaseEntities: [],
          apiEndpoints: [],
          securityPolicies: [],
        },
        testMatrix: {
          buildReadinessScore: 0,
          checklist: [],
          testCases: [],
          recommendedImplementationOrder: [],
        },
        versionTag: "v0.1-draft",
        versionCount: 1,
      };

      saveProject(newProject);
      router.push(`/app/projects/${newId}/discovery`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-zellij-navy text-zellij-ivory flex flex-col">
      <AppNavbar />

      <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div>
          <Link href="/app/projects/new" className="inline-flex items-center text-xs text-zellij-mutedText hover:text-zellij-ivory transition-colors mb-2">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Mode Choice
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="gold" className="font-mono text-[10px]">PATH A</Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zellij-ivory">
              Describe Your Product Idea
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zellij-mutedText mt-1">
            Write what you want to build in plain natural language. Our AI will analyze your domain, identify user personas, and detect missing architectural requirements.
          </p>
        </div>

        <form onSubmit={handleAnalyze} className="space-y-6">
          <Card className="border-zellij-border bg-zellij-surface/70 p-6 space-y-5">
            {/* Project Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zellij-ivory">
                Project Name <span className="text-zellij-mutedText font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Zenith Clinic OS, ExpenseFlow, NomadMarket"
                className="w-full h-10 px-3.5 rounded-md bg-zellij-navy border border-zellij-border text-sm text-zellij-ivory focus:outline-none focus:border-zellij-gold transition-colors"
              />
            </div>

            {/* Target Platform Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zellij-ivory">
                Target Platform Architecture
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {platforms.map((plat) => (
                  <button
                    key={plat.id}
                    type="button"
                    onClick={() => setTargetPlatform(plat.id)}
                    className={`px-3 py-2 rounded-md text-xs font-medium text-left transition-colors border ${
                      targetPlatform === plat.id
                        ? "bg-zellij-goldMuted border-zellij-gold text-zellij-gold font-semibold"
                        : "bg-zellij-navy border-zellij-border text-zellij-mutedText hover:text-zellij-ivory"
                    }`}
                  >
                    {plat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Idea Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zellij-ivory">
                  What do you want to build?
                </label>
                <span className="text-[11px] font-mono text-zellij-mutedText">
                  {ideaText.length} characters (min 20)
                </span>
              </div>
              <textarea
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                required
                rows={7}
                placeholder="Example: I want to build a clinic management and nutrition planning platform. Nutritionists should be able to create custom macro meal plans and send them to patients. Patients can book consultations, view meal plans on mobile, and message their doctor securely. Billing should support subscriptions or direct payments..."
                className="w-full p-3.5 rounded-md bg-zellij-navy border border-zellij-border text-sm text-zellij-ivory focus:outline-none focus:border-zellij-gold transition-colors leading-relaxed"
              />
            </div>

            {/* Reference Upload Box */}
            <div className="border border-dashed border-zellij-border/80 rounded-lg p-4 text-center hover:border-zellij-gold/40 transition-colors bg-zellij-navy/40">
              <UploadCloud className="w-6 h-6 text-zellij-mutedText mx-auto mb-1.5" />
              <div className="text-xs text-zellij-ivory font-medium">Attach reference notes or documents (Optional)</div>
              <div className="text-[10px] text-zellij-mutedText mt-0.5">Supports .txt, .md, .pdf up to 5MB</div>
            </div>
          </Card>

          <div className="flex items-center justify-between pt-2">
            <Link href="/app/projects/new">
              <Button type="button" variant="ghost" size="sm">
                Cancel
              </Button>
            </Link>

            <Button
              type="submit"
              disabled={ideaText.trim().length < 20 || isAnalyzing}
              className="h-11 px-8 font-semibold shadow-lg shadow-zellij-gold/25"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  <span>Analyzing Domain Requirements...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span>Analyze & Discover Requirements</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
