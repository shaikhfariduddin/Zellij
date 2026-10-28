"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, MessageSquare } from "lucide-react";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ZellijProject } from "@/types/blueprint";
import { analyzeIdeaToDiscovery } from "@/lib/ai-engine";
import { saveProject } from "@/lib/storage";

interface QuestionStep {
  step: number;
  category: string;
  title: string;
  description: string;
  suggestions: string[];
}

const STEPS: QuestionStep[] = [
  {
    step: 1,
    category: "Problem Definition",
    title: "What core problem or frustration does your product solve?",
    description: "Describe what is broken, inefficient, or painful in the current manual workflow.",
    suggestions: [
      "Manual spreadsheets and paper intake forms cause excessive administrative delay.",
      "Fragmented communication between clients and team members leads to missed deadlines.",
      "High subscription costs of generic tools without tailored domain workflows.",
    ],
  },
  {
    step: 2,
    category: "Target Audience",
    title: "Who are the primary people who will use this product?",
    description: "Identify both the administrative operators and the end consumers or clients.",
    suggestions: [
      "Specialty clinic directors, consulting practitioners, and their registered patients.",
      "Freelance designers, project managers, and their enterprise client stakeholders.",
      "Store operations managers, warehouse staff, and wholesale buyers.",
    ],
  },
  {
    step: 3,
    category: "Core Solution",
    title: "What are the 2 or 3 most critical actions users must accomplish?",
    description: "Focus on the MVP must-haves for launch day.",
    suggestions: [
      "Self-service online booking with automated SMS/email reminders.",
      "Drag-and-drop template builder with automated macro nutrient calculations.",
      "Secure encrypted messaging and audit logging for sensitive communications.",
    ],
  },
  {
    step: 4,
    category: "Business Model",
    title: "How should access and monetization be managed?",
    description: "Determines checkout workflows, subscription tiers, and invoicing requirements.",
    suggestions: [
      "Monthly and annual SaaS subscriptions via Stripe Billing with a 14-day trial.",
      "Direct pay-per-consultation with automatic PDF superbill receipt generation.",
      "Free tier for individuals, with paid team seats for practices and agencies.",
    ],
  },
];

export default function GuidedDiscoveryPage() {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(["", "", "", ""]);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const step = STEPS[currentStepIndex];

  const handleSuggestionClick = (suggestion: string) => {
    const updated = [...answers];
    updated[currentStepIndex] = suggestion;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    setIsSynthesizing(true);
    const combinedIdea = `
Problem: ${answers[0] || "Streamline manual operations"}
Target Users: ${answers[1] || "Administrators and end users"}
Core Features: ${answers[2] || "Online dashboard and tracking"}
Monetization: ${answers[3] || "Subscription billing"}
    `.trim();

    const discovery = await analyzeIdeaToDiscovery(combinedIdea, "SAAS");
    const newId = "proj-" + Math.random().toString(36).substring(2, 9);

    const newProject: ZellijProject = {
      id: newId,
      name: "Guided Discovery Blueprint",
      slug: "guided-blueprint",
      description: combinedIdea.slice(0, 150) + "...",
      targetPlatform: "SAAS",
      technicalDepth: "BALANCED",
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
  };

  return (
    <div className="min-h-screen bg-zellij-navy text-zellij-ivory flex flex-col">
      <AppNavbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <div>
          <Link href="/app/projects/new" className="inline-flex items-center text-xs text-zellij-mutedText hover:text-zellij-ivory transition-colors mb-2">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Mode Choice
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-mono text-[10px] text-blue-300 border-blue-400/30">
              PATH B: STEP {step.step} OF {STEPS.length}
            </Badge>
            <span className="text-xs font-mono text-zellij-mutedText uppercase">{step.category}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zellij-ivory mt-1">
            {step.title}
          </h1>
          <p className="text-xs sm:text-sm text-zellij-mutedText mt-1">
            {step.description}
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-zellij-surface h-1.5 rounded-full overflow-hidden flex gap-1">
          {STEPS.map((s, idx) => (
            <div
              key={s.step}
              className={`h-full flex-1 rounded-full transition-all duration-300 ${
                idx <= currentStepIndex ? "bg-zellij-gold" : "bg-zellij-border"
              }`}
            />
          ))}
        </div>

        <div className="space-y-6">
          <Card className="border-zellij-border bg-zellij-surface/70 p-6 space-y-4">
            <textarea
              value={answers[currentStepIndex]}
              onChange={(e) => {
                const updated = [...answers];
                updated[currentStepIndex] = e.target.value;
                setAnswers(updated);
              }}
              rows={4}
              placeholder="Type your answer here or click one of the suggested answers below..."
              className="w-full p-3.5 rounded-md bg-zellij-navy border border-zellij-border text-sm text-zellij-ivory focus:outline-none focus:border-zellij-gold transition-colors leading-relaxed"
            />

            {/* Smart Suggestions */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono text-zellij-mutedText uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-zellij-gold" />
                Suggested Answers (Click to select)
              </span>
              <div className="space-y-2">
                {step.suggestions.map((sugg, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSuggestionClick(sugg)}
                    className="w-full text-left p-3 rounded-md bg-zellij-navy/60 hover:bg-zellij-navy border border-zellij-border hover:border-zellij-gold/40 text-xs text-zellij-mutedText hover:text-zellij-ivory transition-colors flex items-center justify-between group"
                  >
                    <span>{sugg}</span>
                    <ChevronRight className="w-4 h-4 text-zellij-mutedText group-hover:text-zellij-gold transition-colors flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={currentStepIndex === 0}
              onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
            >
              Previous Question
            </Button>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={handleNext}
                className="text-xs text-zellij-mutedText hover:text-zellij-ivory"
              >
                Skip Question
              </Button>

              <Button
                type="button"
                onClick={handleNext}
                disabled={isSynthesizing}
                className="px-6 font-semibold shadow-md shadow-zellij-gold/20"
              >
                {currentStepIndex === STEPS.length - 1 ? (
                  isSynthesizing ? (
                    "Synthesizing Blueprint..."
                  ) : (
                    "Synthesize My Blueprint ->"
                  )
                ) : (
                  "Next Question ->"
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
