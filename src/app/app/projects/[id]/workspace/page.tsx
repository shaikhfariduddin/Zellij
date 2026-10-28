"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Layers, 
  FileText, 
  Layout, 
  GitFork, 
  Database, 
  CheckSquare, 
  Download, 
  Share2, 
  History, 
  Settings, 
  Network, 
  Activity, 
  CheckCircle2, 
  Sparkles, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Code2, 
  PlusCircle, 
  Trash2,
  Copy,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { getProjectById, saveProject } from "@/lib/storage";
import { ZellijProject, ScreenBlueprint, WorkflowBlueprint } from "@/types/blueprint";

export default function MasterWorkspaceStudio() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project, setProject] = useState<ZellijProject | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);
  const [screenState, setScreenState] = useState<"default" | "loading" | "empty" | "error" | "success">("default");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "idle">("saved");

  useEffect(() => {
    const p = getProjectById(projectId);
    if (p) {
      setProject(p);
    }
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-zellij-navy text-zellij-ivory flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-zellij-gold border-t-transparent animate-spin mx-auto" />
          <p className="text-xs text-zellij-mutedText">Loading Blueprint Studio...</p>
        </div>
      </div>
    );
  }

  const currentScreen: ScreenBlueprint | undefined = project.screens?.[selectedScreenIndex];
  const currentWorkflow: WorkflowBlueprint | undefined = project.workflows?.[0];

  return (
    <div className="min-h-screen bg-zellij-navy text-zellij-ivory flex flex-col">
      <AppNavbar 
        projectName={project.name} 
        projectId={project.id} 
        saveStatus={saveStatus}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Studio Sidebar */}
        <AppSidebar
          projectId={project.id}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Main Studio Viewport */}
        <main className="flex-1 bg-[#0c121e] overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zellij-border">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="gold" className="font-mono text-[10px]">{project.versionTag}</Badge>
                    <Badge variant="secondary" className="font-mono text-[10px]">{project.targetPlatform}</Badge>
                    <span className="text-xs text-green-400 flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Build Ready ({project.testMatrix?.buildReadinessScore || 94}%)
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zellij-ivory mt-1">
                    {project.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-zellij-mutedText mt-1 max-w-2xl">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab("wireframes")}
                    className="text-xs"
                  >
                    <Layout className="w-3.5 h-3.5 mr-1.5 text-zellij-gold" />
                    Open Wireframes
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => setActiveTab("export")}
                    className="text-xs font-semibold"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    Export Package
                  </Button>
                </div>
              </div>

              {/* 5-Module Overview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { id: "requirements", name: "1. Requirements", count: `${project.requirements?.length || 0} Stories`, desc: "P0/P1 Specs & Criteria", icon: FileText },
                  { id: "wireframes", name: "2. Screens", count: `${project.screens?.length || 0} Layouts`, desc: "Responsive Wireframes", icon: Layout },
                  { id: "workflows", name: "3. Workflows", count: `${project.workflows?.length || 0} Journeys`, desc: "Decision Graphs", icon: GitFork },
                  { id: "techspec", name: "4. Tech Spec", count: `${project.techSpec?.databaseEntities?.length || 0} Tables`, desc: "PostgreSQL & APIs", icon: Database },
                  { id: "testing", name: "5. Test Suite", count: `${project.testMatrix?.testCases?.length || 0} Test Cases`, desc: "Acceptance Matrix", icon: CheckSquare },
                ].map((mod) => {
                  const Icon = mod.icon;
                  return (
                    <Card
                      key={mod.id}
                      onClick={() => setActiveTab(mod.id)}
                      className="cursor-pointer border-zellij-border bg-zellij-surface/60 hover:bg-zellij-surface hover:border-zellij-gold/40 transition-all p-4 space-y-2 group"
                    >
                      <div className="flex items-center justify-between text-zellij-gold">
                        <Icon className="w-4 h-4" />
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-zellij-ivory group-hover:text-zellij-gold transition-colors">{mod.name}</h4>
                        <div className="text-base font-bold font-mono text-zellij-ivory mt-0.5">{mod.count}</div>
                        <div className="text-[11px] text-zellij-mutedText">{mod.desc}</div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Traceability Health Radar */}
              <Card className="border-zellij-border bg-zellij-surface/60 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                    <div>
                      <h3 className="text-sm font-bold text-zellij-ivory">Connected Architecture Health</h3>
                      <p className="text-xs text-zellij-mutedText">Bidirectional traceability across all 5 blueprint modules</p>
                    </div>
                  </div>
                  <Badge variant="success" className="font-mono text-xs">0 Broken Links</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3 rounded bg-zellij-navy/80 border border-zellij-border text-xs">
                    <span className="text-zellij-mutedText">Requirements to Screens</span>
                    <div className="text-sm font-bold text-zellij-ivory mt-1">100% Mapped</div>
                  </div>
                  <div className="p-3 rounded bg-zellij-navy/80 border border-zellij-border text-xs">
                    <span className="text-zellij-mutedText">Workflows to Endpoints</span>
                    <div className="text-sm font-bold text-zellij-ivory mt-1">100% Contracted</div>
                  </div>
                  <div className="p-3 rounded bg-zellij-navy/80 border border-zellij-border text-xs">
                    <span className="text-zellij-mutedText">Test Case Coverage</span>
                    <div className="text-sm font-bold text-zellij-ivory mt-1">100% Verified</div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 2: REQUIREMENTS (MODULE 1) */}
          {activeTab === "requirements" && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zellij-border">
                <div>
                  <Badge variant="gold" className="text-[10px] font-mono">MODULE 1</Badge>
                  <h2 className="text-xl font-bold text-zellij-ivory mt-1">
                    Requirements & Feature Specifications
                  </h2>
                </div>
                <Button size="sm" className="text-xs">
                  <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
                  Add Requirement
                </Button>
              </div>

              <div className="space-y-4">
                {project.requirements?.map((req) => (
                  <Card key={req.id} className="border-zellij-border bg-zellij-surface/70 p-5 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-zellij-gold">{req.code}</span>
                          <Badge variant={req.priority === "P0" ? "destructive" : "gold"} className="text-[10px] font-mono">
                            {req.priority}
                          </Badge>
                          <Badge variant="outline" className="text-[10px] font-mono">{req.category}</Badge>
                        </div>
                        <h3 className="text-base font-semibold text-zellij-ivory">{req.title}</h3>
                      </div>
                      <span className="text-xs font-mono text-zellij-mutedText bg-zellij-navy px-2 py-1 rounded border border-zellij-border">
                        {req.userPersona}
                      </span>
                    </div>

                    <p className="text-xs text-zellij-mutedText leading-relaxed">
                      {req.description}
                    </p>

                    {/* Acceptance Criteria */}
                    <div className="p-3 rounded bg-zellij-navy/90 border border-zellij-border text-xs space-y-1.5 font-mono">
                      <div className="text-[10px] uppercase text-zellij-gold font-bold">Acceptance Criteria (Given / When / Then)</div>
                      {req.acceptanceCriteria?.map((crit, idx) => (
                        <div key={idx} className="text-zellij-ivory text-[11px] flex items-start gap-2">
                          <span className="text-green-400">✓</span>
                          <span>{crit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Traceability Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-zellij-mutedText">
                      <span className="font-mono text-[10px] text-zellij-mutedText/70">LINKED ARTIFACTS:</span>
                      {req.linkedArtifacts?.screenIds?.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 font-mono text-[10px]">
                          Screen: {s}
                        </span>
                      ))}
                      {req.linkedArtifacts?.workflowIds?.map((w) => (
                        <span key={w} className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono text-[10px]">
                          Flow: {w}
                        </span>
                      ))}
                      {req.linkedArtifacts?.testCaseIds?.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-green-500/10 text-green-300 border border-green-500/20 font-mono text-[10px]">
                          Test: {t}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: WIREFRAMES & SCREENS (MODULE 2) */}
          {activeTab === "wireframes" && (
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Controls Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zellij-border">
                <div className="flex items-center gap-3">
                  <Badge variant="gold" className="text-[10px] font-mono">MODULE 2</Badge>
                  <h2 className="text-xl font-bold text-zellij-ivory">Interactive Wireframe Studio</h2>
                </div>

                <div className="flex items-center gap-3">
                  {/* Viewport Toggles */}
                  <div className="flex items-center bg-zellij-surface rounded-md border border-zellij-border p-0.5">
                    <button
                      onClick={() => setViewport("desktop")}
                      className={`p-1.5 rounded text-xs transition-colors ${viewport === "desktop" ? "bg-zellij-gold text-zellij-navy font-bold" : "text-zellij-mutedText hover:text-zellij-ivory"}`}
                      title="Desktop (1440px)"
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewport("tablet")}
                      className={`p-1.5 rounded text-xs transition-colors ${viewport === "tablet" ? "bg-zellij-gold text-zellij-navy font-bold" : "text-zellij-mutedText hover:text-zellij-ivory"}`}
                      title="Tablet (768px)"
                    >
                      <Tablet className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewport("mobile")}
                      className={`p-1.5 rounded text-xs transition-colors ${viewport === "mobile" ? "bg-zellij-gold text-zellij-navy font-bold" : "text-zellij-mutedText hover:text-zellij-ivory"}`}
                      title="Mobile (375px)"
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>

                  {/* State Switcher */}
                  <div className="flex items-center bg-zellij-surface rounded-md border border-zellij-border p-0.5 text-xs">
                    {(["default", "loading", "empty", "error", "success"] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setScreenState(st)}
                        className={`px-2 py-1 rounded capitalize transition-colors ${screenState === st ? "bg-zellij-navy text-zellij-gold border border-zellij-gold/40 font-semibold" : "text-zellij-mutedText hover:text-zellij-ivory"}`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Screen Selector Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {project.screens?.map((scr, idx) => (
                  <button
                    key={scr.id}
                    onClick={() => setSelectedScreenIndex(idx)}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors flex items-center gap-1.5 flex-shrink-0 ${
                      selectedScreenIndex === idx
                        ? "bg-zellij-gold text-zellij-navy font-bold shadow-sm"
                        : "bg-zellij-surface border border-zellij-border text-zellij-mutedText hover:text-zellij-ivory"
                    }`}
                  >
                    <span>{scr.code}</span>
                    <span className="font-sans font-normal opacity-90">{scr.name}</span>
                  </button>
                ))}
              </div>

              {/* Wireframe Canvas */}
              {currentScreen && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Visual Canvas Area */}
                  <div className="lg:col-span-3 flex justify-center bg-[#090d16] p-8 rounded-xl border border-zellij-border/80 min-h-[500px]">
                    <div
                      className={`bg-zellij-surface border border-zellij-border rounded-lg shadow-2xl transition-all duration-300 flex flex-col overflow-hidden ${
                        viewport === "desktop"
                          ? "w-full max-w-3xl"
                          : viewport === "tablet"
                          ? "w-[480px]"
                          : "w-[340px]"
                      }`}
                    >
                      {/* Mockup Titlebar */}
                      <div className="h-8 border-b border-zellij-border bg-zellij-navy px-3 flex items-center justify-between text-[11px] font-mono text-zellij-mutedText">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <span>{currentScreen.route}</span>
                        <span className="text-[10px] text-zellij-gold uppercase">{screenState}</span>
                      </div>

                      {/* Mockup Body Content */}
                      <div className="p-6 space-y-5">
                        <div className="space-y-1">
                          <h3 className="text-lg font-bold text-zellij-ivory">{currentScreen.name}</h3>
                          <p className="text-xs text-zellij-mutedText">{currentScreen.purpose}</p>
                        </div>

                        {/* State Explanation Banner */}
                        <div className="p-2.5 rounded bg-zellij-navy/90 border border-zellij-gold/30 text-xs text-zellij-gold flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{currentScreen.states[screenState]}</span>
                        </div>

                        {/* Interactive Wireframe Components */}
                        <div className="space-y-3 pt-2">
                          {currentScreen.components?.map((comp) => (
                            <div key={comp.id} className="space-y-1">
                              {comp.type === "INPUT" && (
                                <div className="space-y-1">
                                  <label className="text-xs text-zellij-mutedText font-medium">{comp.label}</label>
                                  <div className="h-9 rounded bg-zellij-navy border border-zellij-border px-3 text-xs flex items-center text-zellij-mutedText">
                                    {comp.accessibleLabel}
                                  </div>
                                </div>
                              )}
                              {comp.type === "BUTTON" && (
                                <Button className="w-full h-9 text-xs font-semibold">
                                  {comp.label}
                                </Button>
                              )}
                              {comp.type === "TABLE" && (
                                <div className="rounded border border-zellij-border overflow-hidden">
                                  <div className="bg-zellij-navy p-2 text-xs font-medium text-zellij-ivory border-b border-zellij-border">
                                    {comp.label}
                                  </div>
                                  <div className="p-4 text-center text-xs text-zellij-mutedText bg-zellij-surface">
                                    [Data Table Component • Bound to Database Entity]
                                  </div>
                                </div>
                              )}
                              {comp.type === "STAT_GRID" && (
                                <div className="grid grid-cols-3 gap-2">
                                  {[1, 2, 3].map((i) => (
                                    <div key={i} className="p-2.5 rounded bg-zellij-navy border border-zellij-border text-center">
                                      <div className="text-[10px] text-zellij-mutedText">KPI {i}</div>
                                      <div className="text-sm font-bold text-zellij-ivory font-mono">--</div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Component Inspector Panel */}
                  <Card className="border-zellij-border bg-zellij-surface/70 p-4 space-y-4 text-xs">
                    <div className="border-b border-zellij-border pb-2 font-bold text-zellij-ivory flex items-center justify-between">
                      <span>Screen Specs</span>
                      <Badge variant="outline" className="font-mono text-[10px]">{currentScreen.code}</Badge>
                    </div>

                    <div className="space-y-2">
                      <span className="text-zellij-mutedText font-semibold">Access Level:</span>
                      <div className="font-mono text-zellij-gold">{currentScreen.accessLevel}</div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-zellij-mutedText font-semibold">Layout Type:</span>
                      <div className="font-mono text-zellij-ivory">{currentScreen.layoutType}</div>
                    </div>

                    <div className="space-y-2 border-t border-zellij-border pt-3">
                      <span className="text-zellij-mutedText font-semibold">Components ({currentScreen.components?.length}):</span>
                      <div className="space-y-1.5">
                        {currentScreen.components?.map((c) => (
                          <div key={c.id} className="p-2 rounded bg-zellij-navy border border-zellij-border space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-zellij-ivory">{c.label}</span>
                              <span className="font-mono text-[9px] text-zellij-gold">{c.type}</span>
                            </div>
                            {c.validationRule && (
                              <div className="text-[10px] text-zellij-mutedText">Rule: {c.validationRule}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: WORKFLOWS (MODULE 3) */}
          {activeTab === "workflows" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zellij-border">
                <div>
                  <Badge variant="gold" className="text-[10px] font-mono">MODULE 3</Badge>
                  <h2 className="text-xl font-bold text-zellij-ivory mt-1">
                    Visual Interaction Workflows & Decision Logic
                  </h2>
                </div>
                <Button size="sm" className="text-xs">
                  <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
                  Add Flow
                </Button>
              </div>

              {currentWorkflow && (
                <div className="space-y-4">
                  <Card className="border-zellij-border bg-zellij-surface p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-zellij-gold">{currentWorkflow.code}</span>
                        <h3 className="font-bold text-sm text-zellij-ivory">{currentWorkflow.name}</h3>
                      </div>
                      <Badge variant="secondary" className="font-mono text-[10px]">Actor: {currentWorkflow.userRole}</Badge>
                    </div>
                    <p className="text-xs text-zellij-mutedText">Goal: {currentWorkflow.goal}</p>
                  </Card>

                  {/* Visual Node Diagram Canvas */}
                  <div className="p-8 rounded-xl bg-[#090d16] border border-zellij-border overflow-x-auto min-h-[380px] flex items-center justify-center">
                    <div className="flex items-center gap-4">
                      {currentWorkflow.nodes?.map((node, i) => (
                        <div key={node.id} className="flex items-center gap-4">
                          <div className={`p-4 rounded-lg border text-xs space-y-1 w-44 shadow-lg ${
                            node.type === "start"
                              ? "border-green-500/40 bg-green-500/10 text-green-300"
                              : node.type === "decision"
                              ? "border-zellij-gold/40 bg-zellij-goldMuted text-zellij-gold"
                              : node.type === "backend"
                              ? "border-blue-500/40 bg-blue-500/10 text-blue-300"
                              : "border-zellij-border bg-zellij-surface text-zellij-ivory"
                          }`}>
                            <div className="flex items-center justify-between text-[10px] font-mono uppercase font-bold opacity-80">
                              <span>{node.type}</span>
                              <span>{node.data.actorRole}</span>
                            </div>
                            <div className="font-bold text-sm">{node.data.label}</div>
                            <div className="text-[11px] text-zellij-mutedText leading-tight">{node.data.description}</div>
                          </div>
                          {i < (currentWorkflow.nodes?.length || 0) - 1 && (
                            <ArrowRight className="w-5 h-5 text-zellij-gold flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Edge Cases & Recovery Box */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4 border-zellij-border bg-zellij-surface/60 text-xs space-y-1.5">
                      <div className="font-bold text-red-400 flex items-center gap-1.5 font-mono">
                        <AlertTriangle className="w-3.5 h-3.5" /> Edge Cases & Failure Modes
                      </div>
                      <ul className="list-disc list-inside text-zellij-mutedText space-y-1 text-[11px]">
                        {currentWorkflow.edgeCases?.map((ec, idx) => (
                          <li key={idx}>{ec}</li>
                        ))}
                      </ul>
                    </Card>

                    <Card className="p-4 border-zellij-border bg-zellij-surface/60 text-xs space-y-1.5">
                      <div className="font-bold text-green-400 flex items-center gap-1.5 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Recovery Path
                      </div>
                      <p className="text-zellij-mutedText text-[11px] leading-relaxed">
                        {currentWorkflow.recoveryPath}
                      </p>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: TECH SPEC & DATA MODEL (MODULE 4) */}
          {activeTab === "techspec" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zellij-border">
                <div>
                  <Badge variant="gold" className="text-[10px] font-mono">MODULE 4</Badge>
                  <h2 className="text-xl font-bold text-zellij-ivory mt-1">
                    System Architecture, PostgreSQL Schema & APIs
                  </h2>
                </div>
                <Badge variant="outline" className="font-mono text-xs">
                  {project.techSpec?.architectureStyle}
                </Badge>
              </div>

              {/* Database Entities (ERD Tables) */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-zellij-ivory uppercase font-mono flex items-center gap-2">
                  <Database className="w-4 h-4 text-zellij-gold" />
                  Relational Data Entities (PostgreSQL)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.techSpec?.databaseEntities?.map((entity) => (
                    <Card key={entity.id} className="border-zellij-border bg-zellij-surface/70 overflow-hidden text-xs">
                      <div className="p-3 bg-zellij-navy border-b border-zellij-border flex items-center justify-between font-mono">
                        <span className="font-bold text-zellij-gold">{entity.tableName}</span>
                        <span className="text-[10px] text-zellij-mutedText">TABLE</span>
                      </div>
                      <div className="p-3 divide-y divide-zellij-border/50 font-mono text-[11px]">
                        {entity.fields.map((f) => (
                          <div key={f.name} className="py-1.5 flex items-center justify-between">
                            <span className={f.isPrimaryKey ? "text-amber-400 font-bold" : "text-zellij-ivory"}>
                              {f.isPrimaryKey && "PK "}
                              {f.name}
                            </span>
                            <span className="text-zellij-mutedText text-[10px]">{f.type}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* API Endpoints Catalog */}
              <div className="space-y-4 pt-4 border-t border-zellij-border">
                <h3 className="text-sm font-bold text-zellij-ivory uppercase font-mono flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  REST API Route Contracts (OpenAPI 3.1)
                </h3>

                <div className="space-y-2.5">
                  {project.techSpec?.apiEndpoints?.map((api) => (
                    <div key={api.id} className="p-3.5 rounded-lg bg-zellij-surface border border-zellij-border text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-mono">
                          <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            api.method === "POST" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                          }`}>
                            {api.method}
                          </span>
                          <span className="font-semibold text-zellij-ivory">{api.endpoint}</span>
                        </div>
                        <Badge variant="outline" className="text-[10px] font-mono">{api.requiredRole}</Badge>
                      </div>
                      <p className="text-zellij-mutedText text-[11px]">{api.summary}</p>
                      <div className="text-[10px] font-mono text-zellij-gold bg-zellij-navy p-2 rounded">
                        Response: {api.responseSchema}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: TESTING MATRIX (MODULE 5) */}
          {activeTab === "testing" && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zellij-border">
                <div>
                  <Badge variant="gold" className="text-[10px] font-mono">MODULE 5</Badge>
                  <h2 className="text-xl font-bold text-zellij-ivory mt-1">
                    Testing, Quality Assurance & Build Readiness
                  </h2>
                </div>
                <div className="text-sm font-mono text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded-md border border-green-500/20">
                  {project.testMatrix?.buildReadinessScore || 92}% Build Ready
                </div>
              </div>

              {/* Test Cases Table */}
              <div className="space-y-3">
                {project.testMatrix?.testCases?.map((tc) => (
                  <Card key={tc.id} className="p-4 border-zellij-border bg-zellij-surface/70 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono">
                        <span className="font-bold text-zellij-gold">{tc.code}</span>
                        <Badge variant="outline" className="text-[10px]">{tc.category}</Badge>
                      </div>
                      <span className="font-mono text-[10px] text-zellij-mutedText">Mapped: {tc.requirementCode}</span>
                    </div>

                    <h4 className="font-bold text-sm text-zellij-ivory">{tc.title}</h4>
                    <p className="text-zellij-mutedText text-[11px]">Preconditions: {tc.preconditions}</p>

                    <div className="p-2.5 rounded bg-zellij-navy/80 border border-zellij-border space-y-1 font-mono text-[11px]">
                      <div className="text-zellij-mutedText font-semibold">Test Steps:</div>
                      {tc.steps?.map((step, idx) => (
                        <div key={idx} className="text-zellij-ivory">{step}</div>
                      ))}
                      <div className="text-green-400 pt-1">Expected Result: {tc.expectedResult}</div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Recommended Implementation Order */}
              <div className="pt-4 border-t border-zellij-border space-y-3">
                <h3 className="text-sm font-bold text-zellij-ivory uppercase font-mono">
                  Recommended Engineering Implementation Order
                </h3>
                <div className="space-y-2.5">
                  {project.testMatrix?.recommendedImplementationOrder?.map((phase) => (
                    <div key={phase.phase} className="p-3.5 rounded-lg bg-zellij-surface border border-zellij-border text-xs flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-zellij-goldMuted border border-zellij-gold/30 flex items-center justify-center font-bold font-mono text-zellij-gold flex-shrink-0">
                        {phase.phase}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-zellij-ivory">{phase.name}</h4>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {phase.deliverables?.map((del, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-zellij-navy text-zellij-mutedText border border-zellij-border font-mono text-[10px]">
                              {del}
                            </span>
                          ))}
                        </div>
                        <p className="text-[11px] text-zellij-mutedText pt-1">{phase.rationale}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: EXPORT BUNDLE */}
          {activeTab === "export" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="pb-4 border-b border-zellij-border">
                <Badge variant="gold" className="text-[10px] font-mono">DELIVERABLES</Badge>
                <h2 className="text-xl font-bold text-zellij-ivory mt-1">
                  Export Complete Product Blueprint
                </h2>
                <p className="text-xs text-zellij-mutedText mt-1">
                  Download developer-ready specifications and diagrams in industry-standard formats.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Executive PDF Document",
                    desc: "Formatted whitepaper with cover page, PRD, wireframe screenshots, and workflow diagrams.",
                    badge: "STAKEHOLDER READY",
                    action: "Download PDF",
                  },
                  {
                    title: "Markdown PRD Folder (Zip)",
                    desc: "Full modular directory of GitHub-ready Markdown documents and diagrams.",
                    badge: "DEVELOPER PRD",
                    action: "Download Markdown Zip",
                  },
                  {
                    title: "PostgreSQL & Prisma Schema",
                    desc: "schema.prisma model file with foreign keys, indexes, and relations ready for migrations.",
                    badge: "BACKEND SCAFFOLD",
                    action: "Download schema.prisma",
                  },
                  {
                    title: "OpenAPI 3.1 JSON Contract",
                    desc: "Standard machine-readable API specification for mock servers and frontend codegen.",
                    badge: "API CONTRACT",
                    action: "Download openapi.json",
                  },
                ].map((pkg, idx) => (
                  <Card key={idx} className="p-5 border-zellij-border bg-zellij-surface/70 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <Badge variant="gold" className="text-[9px] font-mono">{pkg.badge}</Badge>
                      <h3 className="font-bold text-base text-zellij-ivory">{pkg.title}</h3>
                      <p className="text-xs text-zellij-mutedText leading-relaxed">{pkg.desc}</p>
                    </div>
                    <Button 
                      variant="secondary" 
                      className="w-full text-xs font-semibold hover:border-zellij-gold"
                      onClick={() => alert(`Generated ${pkg.title} for ${project.name}!`)}
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      {pkg.action}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: TRACEABILITY GRAPH */}
          {activeTab === "dependencies" && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="pb-4 border-b border-zellij-border">
                <Badge variant="gold" className="text-[10px] font-mono">TRACEABILITY GRAPH</Badge>
                <h2 className="text-xl font-bold text-zellij-ivory mt-1">
                  Full Artifact Dependency Explorer
                </h2>
                <p className="text-xs text-zellij-mutedText mt-1">
                  Explore bidirectional linkages from high-level business requirements down to database tables and test cases.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-[#090d16] border border-zellij-border space-y-6 font-mono text-xs">
                <div className="flex items-center justify-between text-zellij-gold pb-3 border-b border-zellij-border text-[11px]">
                  <span>REQUIREMENT</span>
                  <span>FEATURE</span>
                  <span>SCREEN</span>
                  <span>WORKFLOW</span>
                  <span>DATA ENTITY</span>
                  <span>TEST CASE</span>
                </div>

                {project.requirements?.map((req) => (
                  <div key={req.id} className="p-3 rounded bg-zellij-surface border border-zellij-border flex items-center justify-between text-[11px] hover:border-zellij-gold/40 transition-colors">
                    <span className="font-bold text-zellij-gold">{req.code}</span>
                    <span className="text-zellij-mutedText">→ FEAT-001</span>
                    <span className="text-blue-400">→ {req.linkedArtifacts?.screenIds?.[0] || "SCR-001"}</span>
                    <span className="text-purple-400">→ {req.linkedArtifacts?.workflowIds?.[0] || "WFL-001"}</span>
                    <span className="text-zellij-ivory">→ users</span>
                    <span className="text-green-400">→ {req.linkedArtifacts?.testCaseIds?.[0] || "TC-001"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: CHANGE IMPACT */}
          {activeTab === "changeimpact" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="pb-4 border-b border-zellij-border">
                <Badge variant="gold" className="text-[10px] font-mono">CHANGE IMPACT ENGINE</Badge>
                <h2 className="text-xl font-bold text-zellij-ivory mt-1">
                  Pre-Commit Ripple Effect Simulator
                </h2>
                <p className="text-xs text-zellij-mutedText mt-1">
                  Analyze what screens, API endpoints, and database models would be affected before modifying or deleting an artifact.
                </p>
              </div>

              <Card className="p-6 border-zellij-border bg-zellij-surface space-y-4">
                <div className="text-xs font-semibold text-zellij-ivory">Simulate Mutation on Target Artifact:</div>
                <div className="p-3 rounded bg-zellij-navy border border-zellij-border text-xs flex items-center justify-between">
                  <span className="font-mono text-zellij-gold font-bold">REQ-001: Practitioner Authentication</span>
                  <Badge variant="destructive" className="text-[10px] font-mono">PROPOSED CHANGE</Badge>
                </div>

                <div className="space-y-2 pt-2 text-xs">
                  <div className="text-amber-400 font-semibold font-mono flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Cascading Impact Detected (4 Connected Artifacts):
                  </div>

                  <div className="space-y-1.5 pl-5">
                    <div className="text-zellij-ivory">• Screen SCR-001 (/portal/login): Form fields will require TOTP challenge update.</div>
                    <div className="text-zellij-ivory">• Workflow WFL-001 (Staff Auth): Step 4 decision branch will require review.</div>
                    <div className="text-zellij-ivory">• API POST /api/v1/auth/totp/verify: Request schema payload altered.</div>
                    <div className="text-zellij-ivory">• Test Case TC-AUTH-001: Preconditions and assertions will require re-baseline.</div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-zellij-border">
                  <Button variant="outline" size="sm">Discard Proposal</Button>
                  <Button size="sm" className="font-semibold">Review & Apply Safe Cascade</Button>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 10: VERSIONS */}
          {activeTab === "versions" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="pb-4 border-b border-zellij-border">
                <Badge variant="gold" className="text-[10px] font-mono">AUDIT TRAIL</Badge>
                <h2 className="text-xl font-bold text-zellij-ivory mt-1">
                  Version Snapshots & Milestones
                </h2>
              </div>

              <div className="space-y-3">
                {[
                  { tag: "v1.2", label: "Added HIPAA Audit Logging & Meal Plan Builder", date: "2 hours ago", active: true },
                  { tag: "v1.1", label: "Initial 5-Module Synthesis from AI Discovery", date: "3 days ago", active: false },
                  { tag: "v1.0", label: "Project Created & Scope Confirmed", date: "3 days ago", active: false },
                ].map((ver) => (
                  <div key={ver.tag} className="p-4 rounded-lg bg-zellij-surface border border-zellij-border flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-bold font-mono text-zellij-gold text-sm">{ver.tag}</span>
                      <div>
                        <div className="font-semibold text-zellij-ivory">{ver.label}</div>
                        <div className="text-zellij-mutedText text-[11px]">{ver.date}</div>
                      </div>
                    </div>
                    {ver.active ? (
                      <Badge variant="gold" className="font-mono text-[10px]">CURRENT HEAD</Badge>
                    ) : (
                      <Button variant="outline" size="sm" className="text-xs">
                        Rollback to {ver.tag}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: SETTINGS & SHARE */}
          {(activeTab === "settings" || activeTab === "share") && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="pb-4 border-b border-zellij-border">
                <h2 className="text-xl font-bold text-zellij-ivory">Project Settings & Access</h2>
              </div>

              <Card className="p-5 border-zellij-border bg-zellij-surface space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zellij-ivory">Blueprint Title</label>
                  <input
                    type="text"
                    defaultValue={project.name}
                    className="w-full h-9 px-3 rounded bg-zellij-navy border border-zellij-border text-zellij-ivory text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zellij-ivory">Target Platform</label>
                  <div className="font-mono text-zellij-gold">{project.targetPlatform}</div>
                </div>

                <div className="pt-4 border-t border-zellij-border flex justify-end">
                  <Button size="sm" className="font-semibold">Save Changes</Button>
                </div>
              </Card>

              {/* Danger Zone */}
              <Card className="p-5 border-red-500/30 bg-red-500/5 space-y-3 text-xs">
                <h3 className="font-bold text-red-400">Danger Zone</h3>
                <p className="text-zellij-mutedText">
                  Permanently delete this product blueprint, wireframes, and test cases. This action cannot be undone.
                </p>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    if (confirm("Are you sure you want to permanently delete this blueprint?")) {
                      router.push("/app/dashboard");
                    }
                  }}
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                  Delete Blueprint
                </Button>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
