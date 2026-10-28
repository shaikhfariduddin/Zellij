"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Users, 
  ShieldAlert, 
  Layers, 
  ArrowLeft,
  Clock
} from "lucide-react";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { getProjectById, saveProject } from "@/lib/storage";
import { ZellijProject, ClarificationQuestion } from "@/types/blueprint";
import { generateFiveModules } from "@/lib/ai-engine";

export default function DiscoveryWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project, setProject] = useState<ZellijProject | null>(null);
  const [clarifications, setClarifications] = useState<ClarificationQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const p = getProjectById(projectId);
    if (p) {
      setProject(p);
      setClarifications(p.clarifications || []);
    }
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-zellij-navy text-zellij-ivory flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-zellij-gold border-t-transparent animate-spin mx-auto" />
          <p className="text-xs text-zellij-mutedText">Loading discovery workspace...</p>
        </div>
      </div>
    );
  }

  const handleSelectOption = (questionId: string, optionKey: string) => {
    const updated = clarifications.map((q) => {
      if (q.id === questionId) {
        return { ...q, selectedOptionKey: optionKey, status: "CONFIRMED" as const };
      }
      return q;
    });
    setClarifications(updated);
  };

  const handleDecideLater = (questionId: string) => {
    const updated = clarifications.map((q) => {
      if (q.id === questionId) {
        return { ...q, status: "DECIDED_LATER" as const };
      }
      return q;
    });
    setClarifications(updated);
  };

  const handleGenerateBlueprint = () => {
    setIsGenerating(true);

    setTimeout(() => {
      // Synthesize full 5 modules
      const generated = generateFiveModules(project.name, project.targetPlatform, clarifications);

      const updatedProject: ZellijProject = {
        ...project,
        clarifications,
        requirements: generated.requirements,
        features: generated.features,
        screens: generated.screens,
        workflows: generated.workflows,
        techSpec: generated.techSpec,
        testMatrix: generated.testMatrix,
        status: "BUILD_READY",
        versionTag: "v1.0",
        versionCount: 1,
        updatedAt: Date.now(),
      };

      saveProject(updatedProject);
      router.push(`/app/projects/${projectId}/workspace`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zellij-navy text-zellij-ivory flex flex-col">
      <AppNavbar projectName={project.name} projectId={project.id} />

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zellij-border">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="gold" className="font-mono text-[10px]">DISCOVERY WORKSPACE</Badge>
              <span className="text-xs text-zellij-mutedText">Step 6 of 11 in System Journey</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zellij-ivory mt-1">
              AI Requirements Clarification
            </h1>
            <p className="text-xs sm:text-sm text-zellij-mutedText mt-1">
              Review AI-detected problem statements, user personas, and architectural decisions before generating your 5-module blueprint.
            </p>
          </div>

          <Button
            onClick={handleGenerateBlueprint}
            disabled={isGenerating}
            className="h-11 px-8 font-semibold shadow-xl shadow-zellij-gold/25"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                <span>Synthesizing 5 Modules...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                <span>Confirm Scope & Generate Blueprint</span>
              </>
            )}
          </Button>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Core Problem & Personas */}
          <div className="space-y-6">
            <Card className="border-zellij-border bg-zellij-surface/70 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-zellij-gold uppercase font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>Extracted Problem Statement</span>
              </div>
              <p className="text-xs text-zellij-ivory leading-relaxed bg-zellij-navy p-3 rounded border border-zellij-border">
                {project.problemStatement}
              </p>
            </Card>

            <Card className="border-zellij-border bg-zellij-surface/70 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-zellij-gold uppercase font-mono">
                <Users className="w-4 h-4" />
                <span>Identified User Personas</span>
              </div>
              <div className="space-y-2.5">
                {project.targetPersonas?.map((persona) => (
                  <div key={persona.id} className="p-3 rounded-md bg-zellij-navy border border-zellij-border text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-zellij-ivory">{persona.roleName}</span>
                      <Badge variant="outline" className="text-[9px] font-mono">{persona.technicalLevel}</Badge>
                    </div>
                    <p className="text-zellij-mutedText text-[11px]">{persona.painPoint}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Column 2: Clarification Questions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-zellij-gold" />
                <h3 className="text-base font-bold text-zellij-ivory">Architectural Clarifications</h3>
              </div>
              <span className="text-xs font-mono text-zellij-mutedText">
                {clarifications.filter((c) => c.status === "CONFIRMED").length} / {clarifications.length} Resolved
              </span>
            </div>

            <div className="space-y-4">
              {clarifications.map((q) => (
                <Card
                  key={q.id}
                  className={`border transition-all p-5 space-y-4 ${
                    q.status === "CONFIRMED"
                      ? "border-green-500/30 bg-zellij-surface/90"
                      : "border-zellij-border bg-zellij-surface/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {q.isBlocking && (
                          <Badge variant="destructive" className="text-[9px] font-mono">BLOCKING</Badge>
                        )}
                        <h4 className="text-sm font-semibold text-zellij-ivory">{q.question}</h4>
                      </div>
                      <p className="text-xs text-zellij-mutedText leading-relaxed">
                        {q.impactExplanation}
                      </p>
                    </div>

                    {q.status === "CONFIRMED" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-green-400 font-mono flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                      </span>
                    ) : (
                      <button
                        onClick={() => handleDecideLater(q.id)}
                        className="text-[11px] text-zellij-mutedText hover:text-zellij-ivory flex-shrink-0 flex items-center gap-1"
                      >
                        <Clock className="w-3 h-3" /> Decide Later
                      </button>
                    )}
                  </div>

                  {/* Options Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {q.options.map((opt) => {
                      const isSelected = q.selectedOptionKey === opt.key;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => handleSelectOption(q.id, opt.key)}
                          className={`p-3 rounded-md text-left text-xs transition-all border ${
                            isSelected
                              ? "bg-zellij-goldMuted border-zellij-gold text-zellij-ivory shadow-sm ring-1 ring-zellij-gold"
                              : "bg-zellij-navy/80 border-zellij-border text-zellij-mutedText hover:border-zellij-gold/40 hover:text-zellij-ivory"
                          }`}
                        >
                          <div className="font-semibold text-zellij-ivory flex items-center justify-between">
                            <span>{opt.title}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-zellij-gold" />}
                          </div>
                          <div className="text-[11px] text-green-400 mt-1">✓ {opt.pros}</div>
                          <div className="text-[11px] text-zellij-mutedText mt-0.5">• {opt.cons}</div>
                        </button>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>

            {/* Assumptions Callout */}
            <div className="p-4 rounded-lg bg-zellij-navy/80 border border-zellij-border text-xs space-y-2">
              <div className="font-semibold text-zellij-gold flex items-center gap-1.5 font-mono">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Non-blocking Assumptions</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-zellij-mutedText text-[11px]">
                {project.assumptions?.map((assump, i) => (
                  <li key={i}>{assump}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
