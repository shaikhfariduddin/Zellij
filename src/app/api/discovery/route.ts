import { NextRequest, NextResponse } from "next/server";
import { runGeminiDiscovery } from "@/lib/gemini";
import { TargetPlatform } from "@/types/blueprint";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { idea, platform } = body;

    if (!idea || typeof idea !== "string" || idea.trim().length < 10) {
      return NextResponse.json(
        { error: "Idea description must be at least 10 characters long" },
        { status: 400 }
      );
    }

    const targetPlatform: TargetPlatform = platform || "SAAS";
    const discovery = await runGeminiDiscovery(idea, targetPlatform);

    return NextResponse.json(discovery);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to analyze requirements" },
      { status: 500 }
    );
  }
}
