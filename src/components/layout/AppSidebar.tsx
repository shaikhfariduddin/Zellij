"use client";

import Link from "next/link";
import { 
  FileText, 
  Layout, 
  GitFork, 
  Database, 
  CheckSquare, 
  Share2, 
  Download, 
  History, 
  Settings, 
  Layers, 
  Activity,
  Network
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

interface AppSidebarProps {
  projectId: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppSidebar({ projectId, activeTab, onTabChange }: AppSidebarProps) {
  const navItems: NavGroup[] = [
    {
      group: "Core Blueprint",
      items: [
        { id: "overview", label: "Overview", icon: Layers, badge: "Master" },
        { id: "requirements", label: "Requirements", icon: FileText, badge: "Mod 1" },
        { id: "wireframes", label: "Screens & Wireframes", icon: Layout, badge: "Mod 2" },
        { id: "workflows", label: "Interaction Workflows", icon: GitFork, badge: "Mod 3" },
        { id: "techspec", label: "Tech Spec & DB", icon: Database, badge: "Mod 4" },
        { id: "testing", label: "Test Matrix", icon: CheckSquare, badge: "Mod 5" },
      ],
    },
    {
      group: "Traceability & Governance",
      items: [
        { id: "dependencies", label: "Traceability Graph", icon: Network },
        { id: "changeimpact", label: "Change Impact Preview", icon: Activity },
        { id: "versions", label: "Version Snapshots", icon: History },
      ],
    },
    {
      group: "Deliverables",
      items: [
        { id: "export", label: "Export Package", icon: Download },
        { id: "share", label: "Share & Access", icon: Share2 },
        { id: "settings", label: "Project Settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-zellij-border bg-zellij-navy/80 flex flex-col justify-between p-3 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <div className="space-y-6">
        {navItems.map((group) => (
          <div key={group.group}>
            <div className="px-2 mb-2 text-[11px] font-semibold text-zellij-mutedText/70 uppercase tracking-wider font-mono">
              {group.group}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all text-left group",
                      isActive
                        ? "bg-zellij-surface text-zellij-gold border border-zellij-gold/30 shadow-sm"
                        : "text-zellij-mutedText hover:bg-zellij-surface/60 hover:text-zellij-ivory"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={cn(
                          "w-4 h-4 transition-colors",
                          isActive ? "text-zellij-gold" : "text-zellij-mutedText group-hover:text-zellij-ivory"
                        )}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={cn(
                          "text-[10px] px-1.5 py-0.2 rounded font-mono",
                          isActive
                            ? "bg-zellij-gold/20 text-zellij-gold"
                            : "bg-zellij-border/50 text-zellij-mutedText"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-zellij-border px-2">
        <div className="p-3 rounded-lg bg-zellij-surface/60 border border-zellij-border text-xs space-y-1.5">
          <div className="flex items-center justify-between text-zellij-ivory font-medium">
            <span>Build Readiness</span>
            <span className="text-zellij-gold font-mono">96%</span>
          </div>
          <div className="w-full bg-[#101827] h-1.5 rounded-full overflow-hidden">
            <div className="bg-zellij-gold h-full rounded-full transition-all duration-500" style={{ width: "96%" }} />
          </div>
          <p className="text-[11px] text-zellij-mutedText">0 broken linkages detected</p>
        </div>
      </div>
    </aside>
  );
}
