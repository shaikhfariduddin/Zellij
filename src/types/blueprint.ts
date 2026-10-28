export type TargetPlatform = "WEB" | "MOBILE" | "SAAS" | "INTERNAL_TOOL" | "API_SERVICE";
export type TechnicalDepth = "FOUNDER" | "BALANCED" | "ARCHITECT";
export type ProjectStatus = "DRAFT" | "DISCOVERY" | "GENERATING" | "BUILD_READY" | "ARCHIVED";

export interface UserPersona {
  id: string;
  roleName: string;
  painPoint: string;
  keyNeeds: string[];
  technicalLevel: "NON_TECHNICAL" | "BALANCED" | "DEVELOPER";
}

export interface ClarificationQuestion {
  id: string;
  question: string;
  impactExplanation: string;
  isBlocking: boolean;
  status: "PENDING" | "CONFIRMED" | "DECIDED_LATER";
  options: {
    key: string;
    title: string;
    pros: string;
    cons: string;
  }[];
  selectedOptionKey?: string;
  customAnswer?: string;
}

// Module 1: Requirements & Features
export interface Requirement {
  id: string;
  code: string; // e.g. REQ-001
  title: string;
  category: "AUTH" | "BILLING" | "CORE" | "DATA" | "PERFORMANCE" | "SECURITY";
  description: string;
  priority: "P0" | "P1" | "P2";
  userPersona: string;
  status: "CONFIRMED" | "SUGGESTED" | "DEFERRED";
  acceptanceCriteria: string[]; // Given / When / Then
  linkedArtifacts: {
    screenIds: string[];
    workflowIds: string[];
    apiCodes: string[];
    testCaseIds: string[];
  };
}

export interface Feature {
  id: string;
  code: string; // e.g. FEAT-001
  name: string;
  description: string;
  releasePhase: "MVP" | "PHASE_2" | "FUTURE";
  complexity: "LOW" | "MEDIUM" | "HIGH";
  dependencies: string[]; // Feature codes
}

// Module 2: UI/UX & Screens
export interface UIComponent {
  id: string;
  type: "NAVBAR" | "BUTTON" | "INPUT" | "TABLE" | "CARD" | "MODAL" | "CHART" | "DRAWER" | "TABS" | "STAT_GRID";
  label: string;
  role: string;
  accessibleLabel: string;
  validationRule?: string;
  mappedEntityField?: string;
  actionTrigger?: string;
}

export interface ScreenBlueprint {
  id: string;
  code: string; // e.g. SCR-001
  name: string;
  route: string;
  accessLevel: "PUBLIC" | "AUTHENTICATED" | "ADMIN";
  purpose: string;
  layoutType: "DESKTOP_FIRST" | "MOBILE_FIRST" | "RESPONSIVE_SPLIT";
  components: UIComponent[];
  states: {
    default: string;
    loading: string;
    empty: string;
    error: string;
    success: string;
  };
  linkedWorkflowCodes: string[];
}

// Module 3: Workflows & Interaction Logic
export interface WorkflowNode {
  id: string;
  type: "start" | "screen" | "action" | "decision" | "backend" | "notification" | "end";
  data: {
    label: string;
    description: string;
    actorRole: string;
    preconditions?: string[];
    screenCode?: string;
    apiEndpoint?: string;
  };
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

export interface WorkflowBlueprint {
  id: string;
  code: string; // e.g. WFL-001
  name: string;
  userRole: string;
  goal: string;
  preconditions: string[];
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  edgeCases: string[];
  recoveryPath: string;
}

// Module 4: Technical & System Specifications
export interface EntityField {
  name: string;
  type: "UUID" | "VARCHAR" | "TEXT" | "INTEGER" | "BOOLEAN" | "TIMESTAMPTZ" | "JSONB";
  isPrimaryKey: boolean;
  isNullable: boolean;
  isUnique: boolean;
  foreignKeyRef?: string;
  description: string;
}

export interface DatabaseEntity {
  id: string;
  tableName: string;
  purpose: string;
  fields: EntityField[];
}

export interface APIEndpoint {
  id: string;
  code: string; // e.g. API-001
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  summary: string;
  authenticated: boolean;
  requiredRole: string;
  requestBodySchema?: string;
  responseSchema: string;
  errorResponses: {
    statusCode: number;
    description: string;
  }[];
}

export interface TechnicalSpecification {
  architectureStyle: string;
  frontendStack: {
    framework: string;
    styling: string;
    stateManagement: string;
  };
  backendStack: {
    runtime: string;
    language: string;
    framework: string;
    database: string;
    orm: string;
  };
  databaseEntities: DatabaseEntity[];
  apiEndpoints: APIEndpoint[];
  securityPolicies: string[];
}

// Module 5: Testing & Build Readiness
export interface TestCase {
  id: string;
  code: string; // e.g. TC-AUTH-001
  requirementCode: string;
  title: string;
  category: "HAPPY_PATH" | "NEGATIVE" | "BOUNDARY" | "SECURITY" | "PERFORMANCE";
  preconditions: string;
  steps: string[];
  expectedResult: string;
}

export interface BuildReadinessChecklist {
  category: string;
  isComplete: boolean;
  details: string;
}

export interface TestMatrixAndReadiness {
  testCases: TestCase[];
  buildReadinessScore: number;
  checklist: BuildReadinessChecklist[];
  recommendedImplementationOrder: {
    phase: number;
    name: string;
    deliverables: string[];
    rationale: string;
  }[];
}

// Master Project Model
export interface ZellijProject {
  id: string;
  name: string;
  slug: string;
  description: string;
  targetPlatform: TargetPlatform;
  technicalDepth: TechnicalDepth;
  status: ProjectStatus;
  createdAt: number;
  updatedAt: number;
  
  // Discovery & Clarifications
  problemStatement?: string;
  targetPersonas?: UserPersona[];
  clarifications?: ClarificationQuestion[];
  assumptions?: string[];
  
  // 5 Modules
  requirements: Requirement[];
  features: Feature[];
  screens: ScreenBlueprint[];
  workflows: WorkflowBlueprint[];
  techSpec: TechnicalSpecification;
  testMatrix: TestMatrixAndReadiness;
  
  // Versioning & History
  versionTag: string; // e.g. v1.0
  versionCount: number;
}
