"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Layers, 
  FileText, 
  Layout, 
  GitFork, 
  Database, 
  CheckCircle2, 
  Sparkles, 
  MoreVertical,
  Calendar,
  ExternalLink,
  Trash2,
  Copy
} from "lucide-react";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { getStoredProjects, deleteProject } from "@/lib/storage";
import { ZellijProject } from "@/types/blueprint";
import { formatRelativeTime } from "@/lib/utils";

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<ZellijProject[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("ALL");

  useEffect(() => {
    setProjects(getStoredProjects());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this blueprint?")) {
      deleteProject(id);
      setProjects(getStoredProjects());
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = platformFilter === "ALL" || p.targetPlatform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="min-h-screen bg-zellij-navy text-zellij-ivory flex flex-col">
      <AppNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Top Header & Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zellij-border">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zellij-ivory">
                Project Blueprints
              </h1>
              <Badge variant="gold" className="font-mono">
                {projects.length} Total
              </Badge>
            </div>
            <p className="text-sm text-zellij-mutedText mt-1">
              Select an architecture to inspect, edit workflows, or generate a new digital product.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/app/projects/new">
              <Button className="shadow-lg shadow-zellij-gold/25 font-semibold">
                <PlusCircle className="w-4 h-4 mr-2" />
                <span>Create New Blueprint</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-zellij-mutedText absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blueprints by name or domain..."
              className="w-full h-9 pl-9 pr-3 rounded-md bg-zellij-surface border border-zellij-border text-xs text-zellij-ivory focus:outline-none focus:border-zellij-gold transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {["ALL", "SAAS", "WEB", "MOBILE"].map((plat) => (
              <button
                key={plat}
                onClick={() => setPlatformFilter(plat)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                  platformFilter === plat
                    ? "bg-zellij-surface text-zellij-gold border border-zellij-gold/40 font-semibold"
                    : "text-zellij-mutedText hover:text-zellij-ivory bg-zellij-surface/40 border border-zellij-border"
                }`}
              >
                {plat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              onClick={() => router.push(`/app/projects/${project.id}/workspace`)}
              className="cursor-pointer border-zellij-border bg-zellij-surface/70 hover:bg-zellij-surface hover:border-zellij-gold/40 transition-all duration-200 group flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl"
            >
              <CardHeader className="space-y-3 pb-3">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="gold" className="text-[10px] uppercase font-mono">
                    {project.targetPlatform}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{project.testMatrix?.buildReadinessScore || 92}% Build-Ready</span>
                  </div>
                </div>

                <div>
                  <CardTitle className="text-lg font-bold group-hover:text-zellij-gold transition-colors">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-xs mt-1.5 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                {/* 5-Module Mini Stats */}
                <div className="grid grid-cols-4 gap-2 p-2.5 rounded-md bg-zellij-navy/80 border border-zellij-border text-center">
                  <div>
                    <div className="text-xs font-mono font-bold text-zellij-ivory">
                      {project.requirements?.length || 0}
                    </div>
                    <div className="text-[9px] text-zellij-mutedText uppercase font-mono">Reqs</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-zellij-ivory">
                      {project.screens?.length || 0}
                    </div>
                    <div className="text-[9px] text-zellij-mutedText uppercase font-mono">Screens</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-zellij-ivory">
                      {project.workflows?.length || 0}
                    </div>
                    <div className="text-[9px] text-zellij-mutedText uppercase font-mono">Flows</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-zellij-ivory">
                      {project.techSpec?.databaseEntities?.length || 0}
                    </div>
                    <div className="text-[9px] text-zellij-mutedText uppercase font-mono">Entities</div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-3 border-t border-zellij-border/60 flex items-center justify-between text-xs text-zellij-mutedText">
                <span className="font-mono text-[11px]">
                  Updated {formatRelativeTime(project.updatedAt)}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleDelete(project.id, e)}
                    className="p-1 rounded hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Delete Blueprint"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-zellij-gold px-2">
                    Open Studio →
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center border border-dashed border-zellij-border rounded-xl bg-zellij-surface/30 space-y-4">
            <Layers className="w-10 h-10 text-zellij-gold mx-auto" />
            <h3 className="text-base font-semibold text-zellij-ivory">No Blueprints Found</h3>
            <p className="text-xs text-zellij-mutedText max-w-sm mx-auto">
              No product architectures matched your search. Clear the filters or create a new blueprint.
            </p>
            <Button onClick={() => setSearchQuery("")} variant="outline" size="sm">
              Clear Search
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
