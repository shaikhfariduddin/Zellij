import { NextRequest, NextResponse } from "next/server";
import { runGeminiBlueprintGeneration } from "@/lib/gemini";
import { TargetPlatform } from "@/types/blueprint";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectName, platform, clarifications } = body;

    if (!projectName) {
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 }
      );
    }

    const targetPlatform: TargetPlatform = platform || "SAAS";
    const blueprint = await runGeminiBlueprintGeneration(
      projectName,
      targetPlatform,
      clarifications || []
    );

    return NextResponse.json(blueprint);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to generate blueprint modules" },
      { status: 500 }
    );
  }
}
