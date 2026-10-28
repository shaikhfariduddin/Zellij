import {
  ZellijProject,
  TargetPlatform,
  UserPersona,
  ClarificationQuestion,
  Requirement,
  Feature,
  ScreenBlueprint,
  WorkflowBlueprint,
  TechnicalSpecification,
  TestMatrixAndReadiness,
} from "@/types/blueprint";

export async function analyzeIdeaToDiscovery(
  idea: string,
  platform: TargetPlatform
): Promise<{
  problemStatement: string;
  targetPersonas: UserPersona[];
  clarifications: ClarificationQuestion[];
  assumptions: string[];
}> {
  // Simulate AI extraction and synthesis based on domain keywords
  const isFinance = idea.toLowerCase().includes("expense") || idea.toLowerCase().includes("pay") || idea.toLowerCase().includes("invoice");
  const isHealth = idea.toLowerCase().includes("health") || idea.toLowerCase().includes("clinic") || idea.toLowerCase().includes("patient");
  const isCommerce = idea.toLowerCase().includes("commerce") || idea.toLowerCase().includes("shop") || idea.toLowerCase().includes("store");

  let domainName = "Digital Product";
  if (isFinance) domainName = "Financial & Expense Management";
  else if (isHealth) domainName = "Clinical Healthcare Operations";
  else if (isCommerce) domainName = "Digital Commerce Marketplace";

  return {
    problemStatement: `Users struggle with fragmented workflows, lack of automated structure, and manual coordination in ${domainName}. The proposed ${platform.toLowerCase()} solution streamlines operational bottlenecks into an automated, connected system.`,
    targetPersonas: [
      {
        id: "per-primary",
        roleName: "Primary Operator / Administrator",
        painPoint: "High overhead managing manual processes, fragmented reports, and coordination delays.",
        keyNeeds: ["Unified real-time dashboard", "Role-based access", "Automated notifications"],
        technicalLevel: "NON_TECHNICAL",
      },
      {
        id: "per-enduser",
        roleName: "End Consumer / Client",
        painPoint: "Complex onboarding, slow turnaround times, and lack of mobile accessibility.",
        keyNeeds: ["Clean self-service portal", "Mobile responsive interface", "Instant status feedback"],
        technicalLevel: "NON_TECHNICAL",
      },
      {
        id: "per-auditor",
        roleName: "System Integrator / Auditor",
        painPoint: "Difficult data export, untracked modifications, and compliance verification risks.",
        keyNeeds: ["Audit trails", "Secure API endpoints", "Automated backup retention"],
        technicalLevel: "DEVELOPER",
      },
    ],
    clarifications: [
      {
        id: "clar-auth",
        question: "What authentication and identity model should be configured for user accounts?",
        impactExplanation: "Governs credential storage, session security, and OAuth integrations.",
        isBlocking: true,
        status: "PENDING",
        options: [
          { key: "OPT_HYBRID_AUTH", title: "Email/Password + OAuth (GitHub/Google)", pros: "Broadest accessibility, fast signup", cons: "Requires managing multiple provider secrets" },
          { key: "OPT_MAGIC_LINK", title: "Passwordless Magic Link Only", pros: "Zero password fatigue, high security", cons: "Relies strictly on email inbox access" },
          { key: "OPT_ENTERPRISE_SSO", title: "Enterprise SAML / OIDC SSO", pros: "Ideal for B2B corporate compliance", cons: "Higher complexity to configure" },
        ],
      },
      {
        id: "clar-billing",
        question: "How should monetization or transactional payments be structured?",
        impactExplanation: "Determines database billing models, webhook handlers, and checkout UI.",
        isBlocking: false,
        status: "PENDING",
        options: [
          { key: "OPT_SUBSCRIPTION", title: "Tiered Monthly / Annual SaaS Subscription", pros: "Predictable recurring revenue, standard Stripe portal", cons: "Requires subscription tier management" },
          { key: "OPT_USAGE", title: "Pay-as-you-go Usage Metering", pros: "Frictionless adoption for light users", cons: "More complex meter aggregation backend" },
          { key: "OPT_FREE_TIER", title: "Free Community Version with Pro Add-ons", pros: "Maximum user acquisition", cons: "Lower initial monetization" },
        ],
      },
      {
        id: "clar-data",
        question: "What data isolation and residency standard is expected?",
        impactExplanation: "Affects multi-tenant database partitioning and compliance certification.",
        isBlocking: false,
        status: "PENDING",
        options: [
          { key: "OPT_LOGICAL_TENANT", title: "Shared Multi-Tenant Database with Row-Level Security", pros: "Cost efficient, straightforward maintenance", cons: "Requires strict tenant foreign keys" },
          { key: "OPT_PHYSICAL_ISOLATION", title: "Isolated Tenant Schemas / Databases", pros: "Strict regulatory separation", cons: "Higher infrastructure cost" },
        ],
      },
    ],
    assumptions: [
      "Standard transactional emails will be dispatched via Resend or AWS SES.",
      "Primary relational database will be PostgreSQL 16 with connection pooling.",
      "Frontend will be responsive for Desktop (1440px), Tablet (768px), and Mobile (375px).",
    ],
  };
}

export function generateFiveModules(
  projectName: string,
  platform: TargetPlatform,
  clarifications: ClarificationQuestion[]
): {
  requirements: Requirement[];
  features: Feature[];
  screens: ScreenBlueprint[];
  workflows: WorkflowBlueprint[];
  techSpec: TechnicalSpecification;
  testMatrix: TestMatrixAndReadiness;
} {
  const authChoice = clarifications.find((c) => c.id === "clar-auth")?.selectedOptionKey || "OPT_HYBRID_AUTH";

  const requirements: Requirement[] = [
    {
      id: "req-gen-1",
      code: "REQ-001",
      title: "Secure User Onboarding & Authentication",
      category: "AUTH",
      description: `Provide a streamlined authentication flow supporting ${authChoice === "OPT_MAGIC_LINK" ? "passwordless magic links" : "credential signup with OAuth"} and session tokens.`,
      priority: "P0",
      userPersona: "All Users",
      status: "CONFIRMED",
      acceptanceCriteria: [
        "Given a new user on the signup screen, when valid details are submitted, then issue an encrypted session token and route to onboarding.",
        "Given invalid credentials, then return descriptive feedback without leaking user existence.",
      ],
      linkedArtifacts: {
        screenIds: ["SCR-001", "SCR-002"],
        workflowIds: ["WFL-001"],
        apiCodes: ["API-001"],
        testCaseIds: ["TC-001"],
      },
    },
    {
      id: "req-gen-2",
      code: "REQ-002",
      title: "Core Operational Workspace & Activity Dashboard",
      category: "CORE",
      description: `Provide a high-density, real-time command dashboard for ${projectName} showing active items, status badges, and action triggers.`,
      priority: "P0",
      userPersona: "Primary Operator",
      status: "CONFIRMED",
      acceptanceCriteria: [
        "Given an authenticated user, when opening the dashboard, then load key operational metrics and recent activities within 500ms.",
      ],
      linkedArtifacts: {
        screenIds: ["SCR-003"],
        workflowIds: ["WFL-002"],
        apiCodes: ["API-002"],
        testCaseIds: ["TC-002"],
      },
    },
    {
      id: "req-gen-3",
      code: "REQ-003",
      title: "Item Creation, Editing & Validation Engine",
      category: "CORE",
      description: "Allow operators to create, update, and manage core domain entities with live client and server-side validation.",
      priority: "P1",
      userPersona: "Primary Operator",
      status: "CONFIRMED",
      acceptanceCriteria: [
        "Given an entity form with missing required fields, when submitting, then display accessible error outlines and prevent submission.",
      ],
      linkedArtifacts: {
        screenIds: ["SCR-004"],
        workflowIds: ["WFL-002"],
        apiCodes: ["API-003"],
        testCaseIds: ["TC-003"],
      },
    },
    {
      id: "req-gen-4",
      code: "REQ-004",
      title: "Automated Reporting & Multi-Format Data Export",
      category: "DATA",
      description: "Enable users to generate summary reports and download data in JSON and CSV formats.",
      priority: "P1",
      userPersona: "System Integrator / Auditor",
      status: "CONFIRMED",
      acceptanceCriteria: [
        "Given a request to export data, when triggered, then stream valid RFC-compliant CSV/JSON files within 2 seconds.",
      ],
      linkedArtifacts: {
        screenIds: ["SCR-005"],
        workflowIds: ["WFL-003"],
        apiCodes: ["API-004"],
        testCaseIds: ["TC-004"],
      },
    },
  ];

  const features: Feature[] = [
    {
      id: "feat-gen-1",
      code: "FEAT-001",
      name: "Authentication & Role Governance",
      description: "Complete sign-up, sign-in, password reset, and role verification system.",
      releasePhase: "MVP",
      complexity: "MEDIUM",
      dependencies: [],
    },
    {
      id: "feat-gen-2",
      code: "FEAT-002",
      name: "Master Operations Command Center",
      description: "Dynamic responsive dashboard with KPI metrics, status filters, and quick creation modals.",
      releasePhase: "MVP",
      complexity: "MEDIUM",
      dependencies: ["FEAT-001"],
    },
    {
      id: "feat-gen-3",
      code: "FEAT-003",
      name: "Automated Data Export Engine",
      description: "Background report generator producing CSV, JSON, and PDF packages.",
      releasePhase: "PHASE_2",
      complexity: "LOW",
      dependencies: ["FEAT-002"],
    },
  ];

  const screens: ScreenBlueprint[] = [
    {
      id: "scr-gen-1",
      code: "SCR-001",
      name: "Authentication Portal",
      route: "/auth/signin",
      accessLevel: "PUBLIC",
      purpose: "Entry point for users to log in or create a new workspace.",
      layoutType: "DESKTOP_FIRST",
      components: [
        { id: "c-1", type: "INPUT", label: "Email Address", role: "input", accessibleLabel: "Email input", validationRule: "RFC5322 Email" },
        { id: "c-2", type: "INPUT", label: "Password", role: "password", accessibleLabel: "Password input", validationRule: "Min 8 chars" },
        { id: "c-3", type: "BUTTON", label: "Sign In", role: "button", accessibleLabel: "Submit Sign In", actionTrigger: "WFL-001:STEP-1" },
      ],
      states: {
        default: "Centered card with Midnight Navy background and Geometric Gold accents.",
        loading: "Button displays spinning indicator; form inputs disabled.",
        empty: "Fields cleared with focus on email.",
        error: "Alert banner indicating invalid credentials.",
        success: "Transitions to dashboard.",
      },
      linkedWorkflowCodes: ["WFL-001"],
    },
    {
      id: "scr-gen-2",
      code: "SCR-002",
      name: "Onboarding Configuration",
      route: "/app/onboarding",
      accessLevel: "AUTHENTICATED",
      purpose: "Initialize workspace preferences and team settings.",
      layoutType: "RESPONSIVE_SPLIT",
      components: [
        { id: "c-4", type: "INPUT", label: "Workspace Name", role: "input", accessibleLabel: "Workspace Name", validationRule: "Required, max 50 chars" },
        { id: "c-5", type: "BUTTON", label: "Complete Setup", role: "button", accessibleLabel: "Finish Setup", actionTrigger: "WFL-001:STEP-4" },
      ],
      states: {
        default: "Step progress indicator showing Step 1 of 2.",
        loading: "Saving indicator.",
        empty: "Blank form with suggested placeholder.",
        error: "Validation tooltip under invalid field.",
        success: "Toast alert: 'Workspace created.'",
      },
      linkedWorkflowCodes: ["WFL-001"],
    },
    {
      id: "scr-gen-3",
      code: "SCR-003",
      name: "Master Dashboard",
      route: "/app/dashboard",
      accessLevel: "AUTHENTICATED",
      purpose: "Main operational command screen.",
      layoutType: "RESPONSIVE_SPLIT",
      components: [
        { id: "c-6", type: "NAVBAR", label: "Global Navigation", role: "navigation", accessibleLabel: "Main Header" },
        { id: "c-7", type: "STAT_GRID", label: "Summary Metrics", role: "region", accessibleLabel: "Stats Grid" },
        { id: "c-8", type: "TABLE", label: "Active Items", role: "grid", accessibleLabel: "Entity Data Grid" },
      ],
      states: {
        default: "Data table loaded with pagination and quick search bar.",
        loading: "Skeleton rows shimmering across table.",
        empty: "Empty state card with 'Create your first item' button.",
        error: "Error banner with 'Retry Connection' button.",
        success: "Table updated in real time.",
      },
      linkedWorkflowCodes: ["WFL-002"],
    },
  ];

  const workflows: WorkflowBlueprint[] = [
    {
      id: "wfl-gen-1",
      code: "WFL-001",
      name: "User Authentication & Onboarding",
      userRole: "New & Returning Users",
      goal: "Authenticate identity and provision user session.",
      preconditions: ["Network available", "Valid browser cookies enabled"],
      nodes: [
        { id: "n1", type: "start", data: { label: "Visit App", description: "Navigates to /auth/signin", actorRole: "User" }, position: { x: 100, y: 100 } },
        { id: "n2", type: "action", data: { label: "Enter Credentials", description: "Submit email & password", actorRole: "User" }, position: { x: 300, y: 100 } },
        { id: "n3", type: "decision", data: { label: "Credentials Valid?", description: "Verify hash in DB", actorRole: "Backend" }, position: { x: 500, y: 100 } },
        { id: "n4", type: "backend", data: { label: "Issue Session Cookie", description: "Set HttpOnly JWT", actorRole: "API" }, position: { x: 700, y: 50 } },
        { id: "n5", type: "screen", data: { label: "Navigate to Dashboard", description: "Load /app/dashboard", actorRole: "Frontend" }, position: { x: 900, y: 50 } },
        { id: "n6", type: "notification", data: { label: "Show Login Error", description: "Display 401 toast", actorRole: "Frontend" }, position: { x: 500, y: 250 } },
      ],
      edges: [
        { id: "e1-2", source: "n1", target: "n2" },
        { id: "e2-3", source: "n2", target: "n3" },
        { id: "e3-4", source: "n3", target: "n4", label: "Valid" },
        { id: "e3-6", source: "n3", target: "n6", label: "Invalid" },
        { id: "e4-5", source: "n4", target: "n5" },
      ],
      edgeCases: ["Network timeout during submit", "Account rate limited"],
      recoveryPath: "Display inline retry button with remaining countdown seconds.",
    },
    {
      id: "wfl-gen-2",
      code: "WFL-002",
      name: "Item Creation & Publishing",
      userRole: "Operator",
      goal: "Create a new record with validation and instant UI update.",
      preconditions: ["User authenticated", "Required permissions granted"],
      nodes: [
        { id: "n2-1", type: "start", data: { label: "Click '+ New Item'", description: "Opens creation dialog", actorRole: "Operator" }, position: { x: 100, y: 100 } },
        { id: "n2-2", type: "action", data: { label: "Fill Form Fields", description: "Inputs title and details", actorRole: "Operator" }, position: { x: 300, y: 100 } },
        { id: "n2-3", type: "backend", data: { label: "Validate & Write DB", description: "Execute insert transaction", actorRole: "API" }, position: { x: 500, y: 100 } },
        { id: "n2-4", type: "end", data: { label: "Toast & Update Grid", description: "Optimistic update", actorRole: "UI" }, position: { x: 700, y: 100 } },
      ],
      edges: [
        { id: "e2-12", source: "n2-1", target: "n2-2" },
        { id: "e2-23", source: "n2-2", target: "n2-3" },
        { id: "e2-34", source: "n2-3", target: "n2-4" },
      ],
      edgeCases: ["Duplicate unique name conflict", "Validation failure on required fields"],
      recoveryPath: "Highlight erroneous field inline with corrective instructions.",
    },
  ];

  const techSpec: TechnicalSpecification = {
    architectureStyle: "MODULAR_MONOLITH",
    frontendStack: {
      framework: "Next.js 15 (App Router)",
      styling: "Tailwind CSS + Zellij Geometric Design System",
      stateManagement: "Zustand + TanStack Query",
    },
    backendStack: {
      runtime: "Node.js 22 LTS",
      language: "TypeScript 5.8",
      framework: "Next.js API Routes / Server Actions",
      database: "PostgreSQL 16",
      orm: "Prisma ORM",
    },
    databaseEntities: [
      {
        id: "ent-users",
        tableName: "users",
        purpose: "Authenticated platform users and credentials.",
        fields: [
          { name: "id", type: "UUID", isPrimaryKey: true, isNullable: false, isUnique: true, description: "Primary Key" },
          { name: "email", type: "VARCHAR", isPrimaryKey: false, isNullable: false, isUnique: true, description: "User Email" },
          { name: "password_hash", type: "VARCHAR", isPrimaryKey: false, isNullable: true, isUnique: false, description: "Argon2id Hash" },
          { name: "created_at", type: "TIMESTAMPTZ", isPrimaryKey: false, isNullable: false, isUnique: false, description: "Creation date" },
        ],
      },
      {
        id: "ent-records",
        tableName: "records",
        purpose: "Primary domain business entity.",
        fields: [
          { name: "id", type: "UUID", isPrimaryKey: true, isNullable: false, isUnique: true, description: "Record ID" },
          { name: "user_id", type: "UUID", isPrimaryKey: false, isNullable: false, isUnique: false, foreignKeyRef: "users.id", description: "Owner reference" },
          { name: "title", type: "VARCHAR", isPrimaryKey: false, isNullable: false, isUnique: false, description: "Record Title" },
          { name: "status", type: "VARCHAR", isPrimaryKey: false, isNullable: false, isUnique: false, description: "Record Status" },
          { name: "updated_at", type: "TIMESTAMPTZ", isPrimaryKey: false, isNullable: false, isUnique: false, description: "Last modified" },
        ],
      },
    ],
    apiEndpoints: [
      {
        id: "api-gen-1",
        code: "API-001",
        endpoint: "/api/v1/auth/login",
        method: "POST",
        summary: "Authenticate user and issue session token.",
        authenticated: false,
        requiredRole: "ANONYMOUS",
        responseSchema: "{ user: { id: string, email: string }, token: string }",
        errorResponses: [{ statusCode: 401, description: "Invalid credentials" }],
      },
      {
        id: "api-gen-2",
        code: "API-002",
        endpoint: "/api/v1/records",
        method: "GET",
        summary: "Retrieve list of records for the authenticated user.",
        authenticated: true,
        requiredRole: "AUTHENTICATED",
        responseSchema: "{ records: Record[] }",
        errorResponses: [{ statusCode: 401, description: "Unauthorized" }],
      },
    ],
    securityPolicies: [
      "Enforce parameterized SQL queries via Prisma to eliminate SQL injection.",
      "Apply strict Content Security Policy and anti-CSRF headers.",
      "Store encrypted session tokens in Secure, HttpOnly, SameSite cookies.",
    ],
  };

  const testMatrix: TestMatrixAndReadiness = {
    buildReadinessScore: 92,
    checklist: [
      { category: "Requirements Completeness", isComplete: true, details: "All functional requirements have verified acceptance criteria." },
      { category: "Screen & Component Coverage", isComplete: true, details: "All wireframes have component lists and state definitions." },
      { category: "Workflow Consistency", isComplete: true, details: "Zero broken edges or circular transitions in diagram logic." },
      { category: "Database Normalization", isComplete: true, details: "Foreign keys configured with appropriate cascade constraints." },
    ],
    testCases: [
      {
        id: "tc-gen-1",
        code: "TC-AUTH-001",
        requirementCode: "REQ-001",
        title: "Standard User Login Happy Path",
        category: "HAPPY_PATH",
        preconditions: "User registered with verified email.",
        steps: ["1. Open /auth/signin.", "2. Enter valid email and password.", "3. Click 'Sign In'."],
        expectedResult: "Receive 200 OK and navigate to /app/dashboard.",
      },
      {
        id: "tc-gen-2",
        code: "TC-REC-001",
        requirementCode: "REQ-002",
        title: "Record Creation Validation Error",
        category: "NEGATIVE",
        preconditions: "User logged in.",
        steps: ["1. Open create modal.", "2. Leave title empty.", "3. Click Submit."],
        expectedResult: "Display 'Title is required' error banner; request aborted.",
      },
    ],
    recommendedImplementationOrder: [
      { phase: 1, name: "Authentication & User Management", deliverables: ["users table", "auth API", "SCR-001"], rationale: "Ensures tenant isolation and security from day 1." },
      { phase: 2, name: "Core Record Operations", deliverables: ["records table", "SCR-003", "WFL-002"], rationale: "Delivers the primary business utility." },
      { phase: 3, name: "Reporting & Export Pipelines", deliverables: ["export API", "SCR-005"], rationale: "Value-add analytics after core workflows operate reliably." },
    ],
  };

  return {
    requirements,
    features,
    screens,
    workflows,
    techSpec,
    testMatrix,
  };
}
