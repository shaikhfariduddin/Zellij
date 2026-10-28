import { GoogleGenAI } from "@google/genai";
import { 
  TargetPlatform, 
  ClarificationQuestion, 
  UserPersona,
  Requirement,
  Feature,
  ScreenBlueprint,
  WorkflowBlueprint,
  TechnicalSpecification,
  TestMatrixAndReadiness
} from "@/types/blueprint";
import { analyzeIdeaToDiscovery, generateFiveModules } from "./ai-engine";

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

export async function runGeminiDiscovery(
  idea: string,
  platform: TargetPlatform
): Promise<{
  problemStatement: string;
  targetPersonas: UserPersona[];
  clarifications: ClarificationQuestion[];
  assumptions: string[];
}> {
  const client = getGeminiClient();

  if (!client) {
    // Graceful fallback to deterministic domain-aware discovery engine
    return analyzeIdeaToDiscovery(idea, platform);
  }

  try {
    const prompt = `
You are Zellij, an AI-powered product blueprint and architecture platform.
Analyze this product idea for a ${platform}:
"${idea}"

Generate a structured JSON response conforming strictly to:
{
  "problemStatement": "Clear 2-sentence explanation of the core pain point",
  "targetPersonas": [
    {
      "id": "per-1",
      "roleName": "Role Title",
      "painPoint": "Specific operational pain point",
      "keyNeeds": ["need 1", "need 2", "need 3"],
      "technicalLevel": "NON_TECHNICAL" | "BALANCED" | "DEVELOPER"
    }
  ],
  "clarifications": [
    {
      "id": "clar-1",
      "question": "Architectural or business decision question",
      "impactExplanation": "Why this decision matters for data or architecture",
      "isBlocking": true or false,
      "status": "PENDING",
      "options": [
        {
          "key": "OPT_1",
          "title": "Option Title",
          "pros": "Main advantage",
          "cons": "Main trade-off"
        },
        {
          "key": "OPT_2",
          "title": "Alternative Option Title",
          "pros": "Main advantage",
          "cons": "Main trade-off"
        }
      ]
    }
  ],
  "assumptions": [
    "Non-blocking technical or infrastructure assumption 1",
    "Non-blocking assumption 2"
  ]
}

Return ONLY valid JSON.
`;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      if (parsed.problemStatement && parsed.clarifications) {
        return parsed;
      }
    }

    return analyzeIdeaToDiscovery(idea, platform);
  } catch (error) {
    console.warn("Gemini discovery fallback triggered:", error);
    return analyzeIdeaToDiscovery(idea, platform);
  }
}

export async function runGeminiBlueprintGeneration(
  projectName: string,
  platform: TargetPlatform,
  clarifications: ClarificationQuestion[]
): Promise<{
  requirements: Requirement[];
  features: Feature[];
  screens: ScreenBlueprint[];
  workflows: WorkflowBlueprint[];
  techSpec: TechnicalSpecification;
  testMatrix: TestMatrixAndReadiness;
}> {
  const client = getGeminiClient();

  if (!client) {
    return generateFiveModules(projectName, platform, clarifications);
  }

  try {
    const prompt = `
You are Zellij, an AI product architect.
Synthesize the 5-module digital product blueprint for:
Project Name: ${projectName}
Target Platform: ${platform}
Confirmed Architectural Decisions:
${JSON.stringify(clarifications.filter((c) => c.status === "CONFIRMED"))}

Generate a complete connected blueprint adhering to:
1. Requirements (REQ-001, REQ-002, etc.) with user persona, P0/P1/P2, and Given/When/Then acceptance criteria.
2. Screen blueprints (SCR-001, SCR-002) with component inventories and UI states (default, loading, empty, error, success).
3. Visual workflows (WFL-001) with start, action, decision, backend, and end nodes.
4. Technical specifications with PostgreSQL database entities, table fields, foreign keys, and OpenAPI 3.1 REST endpoints.
5. Test matrix with test cases (TC-001) linked to requirements and build readiness score (0-100).

Return ONLY valid JSON with keys: requirements, features, screens, workflows, techSpec, testMatrix.
`;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      if (parsed.requirements && parsed.screens && parsed.workflows) {
        return parsed;
      }
    }

    return generateFiveModules(projectName, platform, clarifications);
  } catch (error) {
    console.warn("Gemini blueprint generation fallback triggered:", error);
    return generateFiveModules(projectName, platform, clarifications);
  }
}
