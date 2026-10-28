"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  FileText, 
  Layout, 
  GitFork, 
  Database, 
  CheckCircle2, 
  ShieldCheck, 
  Code2, 
  Compass, 
  Cpu,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const [activeModulePreview, setActiveModulePreview] = useState<number>(1);

  return (
    <div className="min-h-screen bg-zellij-navy text-zellij-ivory bg-zellij-grid flex flex-col">
      {/* Sticky Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-zellij-border bg-zellij-navy/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-zellij-gold to-[#B89655] flex items-center justify-center shadow-md shadow-zellij-gold/20">
              <div className="w-4 h-4 border-2 border-zellij-navy rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-zellij-navy" />
              </div>
            </div>
            <span className="font-bold text-lg text-zellij-ivory tracking-wide">
              ZELLIJ
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-zellij-mutedText">
            <a href="#how-it-works" className="hover:text-zellij-ivory transition-colors">How It Works</a>
            <a href="#modules" className="hover:text-zellij-ivory transition-colors">The 5 Modules</a>
            <a href="#audiences" className="hover:text-zellij-ivory transition-colors">For Founders & Devs</a>
            <a href="#faq" className="hover:text-zellij-ivory transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/app/dashboard">
              <Button size="sm" className="shadow-lg shadow-zellij-gold/25">
                <span>Enter Studio</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden bg-zellij-radial">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zellij-gold/30 bg-zellij-goldMuted text-zellij-gold text-xs font-mono font-medium animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FROM IDEA TO ARCHITECTURE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zellij-ivory max-w-4xl mx-auto leading-tight sm:leading-none">
            Turn your idea into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-zellij-gold via-[#E5C98E] to-amber-200">complete, connected</span> product blueprint.
          </h1>

          <p className="text-base sm:text-xl text-zellij-mutedText max-w-2xl mx-auto font-normal leading-relaxed">
            Zellij bridges non-technical vision and developer-grade execution. Say what you want to build; our platform clarifies requirements, draws wireframes, models databases, maps workflows, and writes your test plan.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link href="/app/projects/new">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base shadow-xl shadow-zellij-gold/20">
                <Sparkles className="w-4 h-4 mr-2" />
                <span>Create Your Blueprint Free</span>
              </Button>
            </Link>
            <Link href="/app/dashboard">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto h-12 px-6 text-base">
                <Layers className="w-4 h-4 mr-2 text-zellij-gold" />
                <span>Explore Live Sample</span>
              </Button>
            </Link>
          </div>

          {/* Metric Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono text-zellij-mutedText">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>5 Connected Modules</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-zellij-gold" />
              <span>Traceability Graph</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span>OpenAPI & Prisma Scaffolding</span>
            </div>
          </div>
        </div>

        {/* Interactive Master Preview Showcase */}
        <div className="max-w-5xl mx-auto mt-12 px-4 sm:px-6">
          <Card className="border-zellij-gold/30 bg-zellij-surface/90 shadow-2xl backdrop-blur-md overflow-hidden">
            {/* Window Header */}
            <div className="h-11 border-b border-zellij-border bg-[#101827] px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-zellij-mutedText font-mono ml-2">
                  zellij-studio / Zenith Clinic OS (v1.2)
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[
                  { id: 1, label: "1. Requirements", icon: FileText },
                  { id: 2, label: "2. Wireframe", icon: Layout },
                  { id: 3, label: "3. Workflow", icon: GitFork },
                  { id: 4, label: "4. Data Schema", icon: Database },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveModulePreview(tab.id)}
                    className={`px-3 py-1 text-xs rounded transition-colors flex items-center gap-1.5 ${
                      activeModulePreview === tab.id
                        ? "bg-zellij-surface text-zellij-gold border border-zellij-gold/40"
                        : "text-zellij-mutedText hover:text-zellij-ivory"
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Showcase Viewport */}
            <div className="p-6 min-h-[340px] flex items-center justify-center">
              {activeModulePreview === 1 && (
                <div className="w-full space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zellij-gold">REQ-001 • P0 MUST HAVE</span>
                    <Badge variant="gold">HIPAA Mandated</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-zellij-ivory">Practitioner Multi-Factor Authentication & Audit Logging</h3>
                  <p className="text-sm text-zellij-mutedText">
                    Enforce TOTP multi-factor verification with 15-minute idle session timeouts. Automatically append immutable audit logs for every clinical record access.
                  </p>
                  <div className="p-3 rounded bg-zellij-navy/60 border border-zellij-border text-xs font-mono text-zellij-mutedText space-y-1">
                    <p className="text-zellij-gold">✓ Given an active practitioner session</p>
                    <p className="text-zellij-gold">✓ When 15 minutes of inactivity elapse</p>
                    <p className="text-zellij-gold">✓ Then lock screen and require password re-entry</p>
                  </div>
                </div>
              )}

              {activeModulePreview === 2 && (
                <div className="w-full max-w-md mx-auto p-4 rounded-lg bg-zellij-navy border border-zellij-border space-y-3 text-left">
                  <div className="flex items-center justify-between text-xs text-zellij-mutedText pb-2 border-b border-zellij-border">
                    <span className="font-mono">SCR-001 • /portal/login</span>
                    <Badge variant="success">Desktop & Mobile</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-zellij-mutedText">Staff Work Email</div>
                    <div className="h-8 rounded bg-zellij-surface border border-zellij-border px-3 text-xs flex items-center text-zellij-ivory">
                      dr.sarah@zenithclinic.com
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-zellij-mutedText">Master Password</div>
                    <div className="h-8 rounded bg-zellij-surface border border-zellij-border px-3 text-xs flex items-center text-zellij-mutedText">
                      ••••••••••••••••
                    </div>
                  </div>
                  <Button className="w-full h-8 text-xs font-semibold">
                    Verify Staff Identity (TOTP)
                  </Button>
                </div>
              )}

              {activeModulePreview === 3 && (
                <div className="w-full flex items-center justify-center gap-4 text-xs font-mono py-6">
                  <div className="p-3 rounded border border-green-500/40 bg-green-500/10 text-green-300 text-center">
                    <p className="font-bold">Start</p>
                    <p className="text-[10px] text-zellij-mutedText">Open Login</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zellij-gold" />
                  <div className="p-3 rounded border border-zellij-gold/40 bg-zellij-goldMuted text-zellij-gold text-center">
                    <p className="font-bold">Check Credentials</p>
                    <p className="text-[10px] text-zellij-mutedText">Argon2id Hash</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zellij-gold" />
                  <div className="p-3 rounded border border-blue-500/40 bg-blue-500/10 text-blue-300 text-center">
                    <p className="font-bold">Write Audit Log</p>
                    <p className="text-[10px] text-zellij-mutedText">Issue Session JWT</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zellij-gold" />
                  <div className="p-3 rounded border border-green-500/40 bg-green-500/10 text-green-300 text-center">
                    <p className="font-bold">Dashboard</p>
                    <p className="text-[10px] text-zellij-mutedText">Granted</p>
                  </div>
                </div>
              )}

              {activeModulePreview === 4 && (
                <div className="w-full text-left font-mono text-xs space-y-2 bg-zellij-navy/80 p-4 rounded-lg border border-zellij-border">
                  <div className="text-zellij-gold">// PostgreSQL Schema • Prisma Model</div>
                  <pre className="text-zellij-ivory text-xs overflow-x-auto leading-relaxed">
{`model Appointment {
  id              String   @id @default(uuid())
  clinicId        String   // Tenant isolation
  practitionerId  String   @references([User.id])
  patientId       String   @references([User.id])
  startTime       DateTime
  status          AppointmentStatus @default(SCHEDULED)
  createdAt       DateTime @default(now())

  @@index([clinicId, startTime])
}`}
                  </pre>
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* The 5 Modules Section */}
      <section id="modules" className="py-20 border-t border-zellij-border bg-[#0d1422]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-zellij-ivory">
              The Five Connected Blueprint Modules
            </h2>
            <p className="text-zellij-mutedText max-w-2xl mx-auto text-sm sm:text-base">
              Unlike chatbots that dump unstructured text, Zellij generates 5 strictly typed, bidirectionally linked artifacts for every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                no: "01",
                title: "Requirements & Features",
                desc: "User personas, P0-P2 priorities, Given/When/Then acceptance criteria.",
                icon: FileText,
              },
              {
                no: "02",
                title: "UI/UX & Screens",
                desc: "Sitemap hierarchy, responsive layout blueprints, component inspection.",
                icon: Layout,
              },
              {
                no: "03",
                title: "Workflows & Logic",
                desc: "Interactive visual flowcharts, decision branches, error recovery paths.",
                icon: GitFork,
              },
              {
                no: "04",
                title: "Tech Spec & DB",
                desc: "System topology, PostgreSQL ERD schema, OpenAPI 3.1 contracts.",
                icon: Database,
              },
              {
                no: "05",
                title: "Test Matrix & Readiness",
                desc: "Automated test cases, edge cases, and build readiness scoring.",
                icon: CheckCircle2,
              },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.no} className="p-5 rounded-lg border border-zellij-border bg-zellij-surface/50 space-y-3 hover:border-zellij-gold/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zellij-gold">{m.no}</span>
                    <Icon className="w-4 h-4 text-zellij-gold" />
                  </div>
                  <h3 className="font-semibold text-sm text-zellij-ivory">{m.title}</h3>
                  <p className="text-xs text-zellij-mutedText leading-relaxed">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Audiences: Progressive Disclosure */}
      <section id="audiences" className="py-20 border-t border-zellij-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-zellij-ivory">Designed for Founders & Engineers Alike</h2>
            <p className="text-zellij-mutedText text-sm sm:text-base max-w-xl mx-auto">
              Progressive disclosure adapts the interface to your background without compromising technical depth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 border-zellij-border bg-zellij-surface/60 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-zellij-goldMuted border border-zellij-gold/30 flex items-center justify-center text-zellij-gold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-zellij-ivory">For Founders & Non-Technical Creators</h3>
              <ul className="space-y-2 text-sm text-zellij-mutedText">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zellij-gold flex-shrink-0" />
                  <span>Start from plain English or guided step-by-step questions.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zellij-gold flex-shrink-0" />
                  <span>AI surfaces blind spots, missing requirements, and edge cases.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zellij-gold flex-shrink-0" />
                  <span>Hand developers an exact specification instead of vague descriptions.</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-zellij-border bg-zellij-surface/60 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-zellij-ivory">For Developers & Software Architects</h3>
              <ul className="space-y-2 text-sm text-zellij-mutedText">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Export ready-to-run Prisma schemas and OpenAPI 3.1 specs.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Interactive React Flow diagram canvas with custom nodes and handles.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Traceability graph detects orphans and models change impact.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-zellij-border bg-[#0a0f19] py-12 text-xs text-zellij-mutedText">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-zellij-gold flex items-center justify-center">
              <div className="w-2.5 h-2.5 border border-zellij-navy rotate-45" />
            </div>
            <span className="font-bold text-zellij-ivory">ZELLIJ</span>
            <span>— From idea to architecture.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/app/dashboard" className="hover:text-zellij-ivory">Dashboard</Link>
            <Link href="/app/projects/new" className="hover:text-zellij-ivory">Create Blueprint</Link>
            <Link href="/auth/signin" className="hover:text-zellij-ivory">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
