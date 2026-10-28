import { ZellijProject } from "@/types/blueprint";

const STORAGE_KEY = "zellij_projects_store";

export const SEED_PROJECTS: ZellijProject[] = [
  {
    id: "proj-zenith-health",
    name: "Zenith Clinic OS",
    slug: "zenith-clinic-os",
    description: "AI-assisted clinical operations, appointment triage, and HIPAA-compliant patient communication portal for multi-specialty practices.",
    targetPlatform: "SAAS",
    technicalDepth: "ARCHITECT",
    status: "BUILD_READY",
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 3600000 * 2,
    versionTag: "v1.2",
    versionCount: 3,
    problemStatement: "Specialty nutrition and medical clinics suffer from 32% appointment churn and fragmented communications between intake forms, EHR records, and prescription follow-ups.",
    targetPersonas: [
      {
        id: "per-1",
        roleName: "Clinical Director",
        painPoint: "Lacks unified view of patient intake pipelines and practitioner calendar utilization.",
        keyNeeds: ["Multi-provider scheduling", "Automated HIPAA audit logs", "Intake completion analytics"],
        technicalLevel: "NON_TECHNICAL",
      },
      {
        id: "per-2",
        roleName: "Attending Nutritionist",
        painPoint: "Spends 40% of consultation time transcribing meal plans into PDF emails.",
        keyNeeds: ["1-click meal plan generator", "In-app secure chat", "Biometric progress charts"],
        technicalLevel: "BALANCED",
      },
      {
        id: "per-3",
        roleName: "Patient",
        painPoint: "Frustrated by paper forms, lack of mobile appointment rescheduling, and lost lab results.",
        keyNeeds: ["Self-service booking", "Mobile intake forms", "Automated SMS reminders"],
        technicalLevel: "NON_TECHNICAL",
      },
    ],
    clarifications: [
      {
        id: "clar-1",
        question: "How will patient identity and HIPAA authentication be enforced?",
        impactExplanation: "Governs database column encryption, session idle timeouts, and 2FA policies.",
        isBlocking: true,
        status: "CONFIRMED",
        options: [
          { key: "OPT_TOTP", title: "Mandatory TOTP Authenticator + Magic Link", pros: "Highest security, HIPAA compliant", cons: "Slight friction for elderly patients" },
          { key: "OPT_SMS", title: "SMS OTP Verification", pros: "Easy for patients", cons: "Vulnerable to SIM swapping" },
        ],
        selectedOptionKey: "OPT_TOTP",
      },
      {
        id: "clar-2",
        question: "What billing and insurance clearinghouse model is required for MVP?",
        impactExplanation: "Determines webhook integration depth with Stripe vs clearinghouses like Change Healthcare.",
        isBlocking: false,
        status: "CONFIRMED",
        options: [
          { key: "OPT_STRIPE", title: "Direct Self-Pay via Stripe Billing", pros: "Fast MVP launch, simple webhooks", cons: "No direct insurance claims" },
          { key: "OPT_HYBRID", title: "Stripe + Manual Superbill Export", pros: "Covers 90% of private clinics", cons: "Requires PDF receipt generator" },
        ],
        selectedOptionKey: "OPT_HYBRID",
      },
    ],
    assumptions: [
      "Clinics use their own Twilio credentials for transactional SMS notifications.",
      "All medical document attachments stored in AWS S3 with SSE-KMS encryption.",
    ],
    // Module 1: Requirements & Features
    requirements: [
      {
        id: "req-1",
        code: "REQ-001",
        title: "HIPAA-Compliant Patient Multi-Factor Authentication",
        category: "AUTH",
        description: "Enforce multi-factor authentication with 15-minute idle session timeouts and automated audit logging for all practitioner accounts.",
        priority: "P0",
        userPersona: "Clinical Director",
        status: "CONFIRMED",
        acceptanceCriteria: [
          "Given an active practitioner session, when 15 minutes of inactivity elapse, then automatically lock the screen and require password re-entry.",
          "Given a new login from an unrecognized device, then require 6-digit TOTP before issuing JWT tokens.",
        ],
        linkedArtifacts: {
          screenIds: ["SCR-001", "SCR-002"],
          workflowIds: ["WFL-001"],
          apiCodes: ["API-001", "API-002"],
          testCaseIds: ["TC-001", "TC-002"],
        },
      },
      {
        id: "req-2",
        code: "REQ-002",
        title: "Intelligent Consultation Scheduling & Calendar Synchronization",
        category: "CORE",
        description: "Patients can book available provider slots with automated timezone conversion and Google Calendar/Outlook bidirectional sync.",
        priority: "P0",
        userPersona: "Patient",
        status: "CONFIRMED",
        acceptanceCriteria: [
          "Given a patient selecting an appointment slot, when confirming booking, then prevent double-booking via optimistic locking and dispatch confirmation email.",
        ],
        linkedArtifacts: {
          screenIds: ["SCR-003", "SCR-004"],
          workflowIds: ["WFL-002"],
          apiCodes: ["API-003", "API-004"],
          testCaseIds: ["TC-003"],
        },
      },
      {
        id: "req-3",
        code: "REQ-003",
        title: "Interactive Nutritional Meal Plan Builder",
        category: "CORE",
        description: "Nutritionists can assemble macro-balanced meal templates, calculate caloric targets, and dispatch digital meal plans to patient mobile portals.",
        priority: "P1",
        userPersona: "Attending Nutritionist",
        status: "CONFIRMED",
        acceptanceCriteria: [
          "Given a nutritionist adding food items, when total calories exceed target by >10%, then display warning badge in gold.",
        ],
        linkedArtifacts: {
          screenIds: ["SCR-005"],
          workflowIds: ["WFL-003"],
          apiCodes: ["API-005"],
          testCaseIds: ["TC-004"],
        },
      },
      {
        id: "req-4",
        code: "REQ-004",
        title: "Encrypted In-App Clinical Messaging",
        category: "SECURITY",
        description: "Direct end-to-end encrypted messaging channel between registered patient and assigned practitioner.",
        priority: "P1",
        userPersona: "Patient",
        status: "CONFIRMED",
        acceptanceCriteria: [
          "Given an incoming message, when practitioner is offline, then send masked push notification without exposing Protected Health Information (PHI).",
        ],
        linkedArtifacts: {
          screenIds: ["SCR-006"],
          workflowIds: ["WFL-004"],
          apiCodes: ["API-006"],
          testCaseIds: ["TC-005"],
        },
      },
    ],
    features: [
      {
        id: "feat-1",
        code: "FEAT-001",
        name: "Practitioner Portal & Triage Dashboard",
        description: "Real-time clinic dashboard showing daily patient queue, pending lab results, and intake completion rates.",
        releasePhase: "MVP",
        complexity: "MEDIUM",
        dependencies: [],
      },
      {
        id: "feat-2",
        code: "FEAT-002",
        name: "Patient Self-Service Booking Widget",
        description: "Embeddable web component allowing prospective patients to schedule consultations and submit intake forms.",
        releasePhase: "MVP",
        complexity: "MEDIUM",
        dependencies: ["FEAT-001"],
      },
      {
        id: "feat-3",
        code: "FEAT-003",
        name: "Automated Superbill & PDF Receipt Generator",
        description: "Generate itemized medical receipts with ICD-10 diagnostic codes for patient insurance claims.",
        releasePhase: "PHASE_2",
        complexity: "HIGH",
        dependencies: ["FEAT-001"],
      },
    ],
    // Module 2: UI/UX Screen Inventory
    screens: [
      {
        id: "scr-1",
        code: "SCR-001",
        name: "Practitioner Sign-In & TOTP Challenge",
        route: "/portal/login",
        accessLevel: "PUBLIC",
        purpose: "Authenticate clinic staff with HIPAA-compliant 2FA.",
        layoutType: "DESKTOP_FIRST",
        components: [
          { id: "c-1", type: "INPUT", label: "Email Address", role: "input", accessibleLabel: "Staff Email", validationRule: "RFC5322 Email Format" },
          { id: "c-2", type: "INPUT", label: "Password", role: "password", accessibleLabel: "Staff Password", validationRule: "Min 12 chars" },
          { id: "c-3", type: "BUTTON", label: "Authenticate Staff", role: "button", accessibleLabel: "Submit Login", actionTrigger: "WFL-001:STEP-1" },
        ],
        states: {
          default: "Clean midnight navy login box with geometric gold border.",
          loading: "Gold spinner replaces button text; input fields disabled.",
          empty: "Standard empty inputs with auto-focus on email.",
          error: "Red alert box: 'Invalid credentials. 3 attempts remaining.'",
          success: "Transitions to TOTP modal with 6-digit input.",
        },
        linkedWorkflowCodes: ["WFL-001"],
      },
      {
        id: "scr-2",
        code: "SCR-002",
        name: "Clinic Master Operations Dashboard",
        route: "/portal/dashboard",
        accessLevel: "AUTHENTICATED",
        purpose: "Comprehensive clinic overview: Appointments today, pending intakes, and active patient alerts.",
        layoutType: "RESPONSIVE_SPLIT",
        components: [
          { id: "c-4", type: "NAVBAR", label: "Clinic Header", role: "navigation", accessibleLabel: "Top Navigation" },
          { id: "c-5", type: "STAT_GRID", label: "KPI Cards", role: "region", accessibleLabel: "Appointments and Revenue" },
          { id: "c-6", type: "TABLE", label: "Today's Patient Queue", role: "grid", accessibleLabel: "Patient Appointments Table" },
        ],
        states: {
          default: "Live list of appointments with color-coded status badges (Checked In, In Progress, Completed).",
          loading: "Skeleton shimmer cards across KPI grid and table rows.",
          empty: "Illustrated card: 'No scheduled appointments for today.'",
          error: "Retry banner: 'Unable to sync live calendar.'",
          success: "Green pulse dot indicates real-time WebSocket connection.",
        },
        linkedWorkflowCodes: ["WFL-001", "WFL-002"],
      },
      {
        id: "scr-3",
        code: "SCR-003",
        name: "Patient Self-Service Booking",
        route: "/book/:practitionerSlug",
        accessLevel: "PUBLIC",
        purpose: "Allow patients to select consultation type, choose time slot, and submit details.",
        layoutType: "MOBILE_FIRST",
        components: [
          { id: "c-7", type: "CARD", label: "Practitioner Profile", role: "region", accessibleLabel: "Doctor Bio" },
          { id: "c-8", type: "TABS", label: "Consultation Type", role: "tablist", accessibleLabel: "Initial vs Follow-up" },
          { id: "c-9", type: "BUTTON", label: "Confirm Appointment", role: "button", accessibleLabel: "Confirm", actionTrigger: "WFL-002:STEP-3" },
        ],
        states: {
          default: "Calendar grid with selectable green time badges.",
          loading: "Pulsing slot placeholders.",
          empty: "Notice: 'No available slots for selected week.'",
          error: "Alert: 'Slot was just taken by another patient.'",
          success: "Confirmation checkmark screen with Add to Calendar links.",
        },
        linkedWorkflowCodes: ["WFL-002"],
      },
    ],
    // Module 3: Workflows
    workflows: [
      {
        id: "wfl-1",
        code: "WFL-001",
        name: "Staff Authentication & HIPAA Session Gate",
        userRole: "Practitioner",
        goal: "Safely verify staff identity and log session initialization in audit trail.",
        preconditions: ["Staff has registered account", "MFA device paired"],
        nodes: [
          { id: "n1", type: "start", data: { label: "Open Portal", description: "Navigates to /portal/login", actorRole: "Staff" }, position: { x: 100, y: 100 } },
          { id: "n2", type: "action", data: { label: "Submit Credentials", description: "Enter email & password", actorRole: "Staff" }, position: { x: 300, y: 100 } },
          { id: "n3", type: "decision", data: { label: "Credentials Valid?", description: "Check Argon2id hash", actorRole: "Backend" }, position: { x: 500, y: 100 } },
          { id: "n4", type: "action", data: { label: "Enter TOTP Code", description: "6-digit authenticator code", actorRole: "Staff" }, position: { x: 700, y: 50 } },
          { id: "n5", type: "backend", data: { label: "Write Audit Log & Issue JWT", description: "Log IP, UA, timestamp", actorRole: "Security Engine" }, position: { x: 900, y: 50 } },
          { id: "n6", type: "screen", data: { label: "Enter Dashboard", description: "Redirect to /portal/dashboard", actorRole: "Staff" }, position: { x: 1100, y: 50 } },
          { id: "n7", type: "notification", data: { label: "Show Error & Increment Counter", description: "Warn user, throttle on 5 fails", actorRole: "System" }, position: { x: 500, y: 250 } },
        ],
        edges: [
          { id: "e1-2", source: "n1", target: "n2" },
          { id: "e2-3", source: "n2", target: "n3" },
          { id: "e3-4", source: "n3", target: "n4", label: "Valid" },
          { id: "e3-7", source: "n3", target: "n7", label: "Invalid" },
          { id: "e4-5", source: "n4", target: "n5" },
          { id: "e5-6", source: "n5", target: "n6" },
        ],
        edgeCases: ["Network drop during TOTP submission", "Account locked after 5 failed attempts"],
        recoveryPath: "Display lockout modal with 15-minute unlock timer or admin unlock request.",
      },
      {
        id: "wfl-2",
        code: "WFL-002",
        name: "Patient Appointment Booking & Intake Pipeline",
        userRole: "Patient",
        goal: "Reserve clinic consultation slot and queue digital intake form.",
        preconditions: ["Practitioner has open calendar availability"],
        nodes: [
          { id: "nb1", type: "start", data: { label: "Select Service & Slot", description: "Patient picks 45-min consultation", actorRole: "Patient" }, position: { x: 100, y: 100 } },
          { id: "nb2", type: "action", data: { label: "Enter Contact Info", description: "Name, phone, email, insurance status", actorRole: "Patient" }, position: { x: 300, y: 100 } },
          { id: "nb3", type: "backend", data: { label: "Acquire Slot Lock", description: "Hold slot for 5 mins via Redis", actorRole: "API" }, position: { x: 500, y: 100 } },
          { id: "nb4", type: "end", data: { label: "Booking Confirmed", description: "Send SMS confirmation & intake link", actorRole: "System" }, position: { x: 700, y: 100 } },
        ],
        edges: [
          { id: "eb1-2", source: "nb1", target: "nb2" },
          { id: "eb2-3", source: "nb2", target: "nb3" },
          { id: "eb3-4", source: "nb3", target: "nb4" },
        ],
        edgeCases: ["Slot taken simultaneously by another user", "SMS delivery fails"],
        recoveryPath: "Gracefully prompt patient to pick adjacent time slot; retry SMS via fallback gateway.",
      },
    ],
    // Module 4: Technical & System Specifications
    techSpec: {
      architectureStyle: "MODULAR_MONOLITH",
      frontendStack: {
        framework: "Next.js 15 (App Router)",
        styling: "Tailwind CSS + Zellij Geometric Design Tokens",
        stateManagement: "TanStack Query + Zustand",
      },
      backendStack: {
        runtime: "Node.js 22 LTS",
        language: "TypeScript 5.8",
        framework: "Next.js Server Actions / API Routes",
        database: "PostgreSQL 16 (AWS RDS Multi-AZ)",
        orm: "Prisma ORM",
      },
      databaseEntities: [
        {
          id: "ent-1",
          tableName: "clinics",
          purpose: "Multi-tenant practice organization record.",
          fields: [
            { name: "id", type: "UUID", isPrimaryKey: true, isNullable: false, isUnique: true, description: "Clinic ID" },
            { name: "name", type: "VARCHAR", isPrimaryKey: false, isNullable: false, isUnique: false, description: "Practice Legal Name" },
            { name: "hipaa_baa_signed", type: "BOOLEAN", isPrimaryKey: false, isNullable: false, isUnique: false, description: "Business Associate Agreement status" },
            { name: "created_at", type: "TIMESTAMPTZ", isPrimaryKey: false, isNullable: false, isUnique: false, description: "Creation date" },
          ],
        },
        {
          id: "ent-2",
          tableName: "users",
          purpose: "Practitioners, staff, and patient accounts.",
          fields: [
            { name: "id", type: "UUID", isPrimaryKey: true, isNullable: false, isUnique: true, description: "User ID" },
            { name: "clinic_id", type: "UUID", isPrimaryKey: false, isNullable: false, isUnique: false, foreignKeyRef: "clinics.id", description: "Tenant clinic reference" },
            { name: "email", type: "VARCHAR", isPrimaryKey: false, isNullable: false, isUnique: true, description: "Work email" },
            { name: "password_hash", type: "VARCHAR", isPrimaryKey: false, isNullable: true, isUnique: false, description: "Argon2id hash" },
            { name: "role", type: "VARCHAR", isPrimaryKey: false, isNullable: false, isUnique: false, description: "CLINICAL_DIRECTOR, PRACTITIONER, PATIENT" },
          ],
        },
        {
          id: "ent-3",
          tableName: "appointments",
          purpose: "Scheduled consultation sessions.",
          fields: [
            { name: "id", type: "UUID", isPrimaryKey: true, isNullable: false, isUnique: true, description: "Appointment ID" },
            { name: "clinic_id", type: "UUID", isPrimaryKey: false, isNullable: false, isUnique: false, foreignKeyRef: "clinics.id", description: "Tenant reference" },
            { name: "practitioner_id", type: "UUID", isPrimaryKey: false, isNullable: false, isUnique: false, foreignKeyRef: "users.id", description: "Assigned doctor" },
            { name: "patient_id", type: "UUID", isPrimaryKey: false, isNullable: false, isUnique: false, foreignKeyRef: "users.id", description: "Consulting patient" },
            { name: "start_time", type: "TIMESTAMPTZ", isPrimaryKey: false, isNullable: false, isUnique: false, description: "Session start" },
            { name: "status", type: "VARCHAR", isPrimaryKey: false, isNullable: false, isUnique: false, description: "SCHEDULED, COMPLETED, CANCELLED" },
          ],
        },
      ],
      apiEndpoints: [
        {
          id: "api-1",
          code: "API-001",
          endpoint: "/api/v1/auth/login",
          method: "POST",
          summary: "Authenticate practitioner credentials and initiate TOTP challenge.",
          authenticated: false,
          requiredRole: "ANONYMOUS",
          responseSchema: "{ status: 'MFA_CHALLENGE_REQUIRED', challengeToken: string }",
          errorResponses: [{ statusCode: 401, description: "Invalid credentials" }, { statusCode: 429, description: "Too many attempts" }],
        },
        {
          id: "api-2",
          code: "API-002",
          endpoint: "/api/v1/auth/totp/verify",
          method: "POST",
          summary: "Verify TOTP code and issue encrypted session cookies.",
          authenticated: false,
          requiredRole: "ANONYMOUS",
          responseSchema: "{ user: { id: string, email: string, role: string } }",
          errorResponses: [{ statusCode: 400, description: "Invalid TOTP code" }],
        },
        {
          id: "api-3",
          code: "API-003",
          endpoint: "/api/v1/appointments",
          method: "GET",
          summary: "List practice appointments with date range filter.",
          authenticated: true,
          requiredRole: "PRACTITIONER",
          responseSchema: "{ appointments: Appointment[] }",
          errorResponses: [{ statusCode: 403, description: "Forbidden" }],
        },
      ],
      securityPolicies: [
        "Enforce TLS 1.3 for all endpoints in transit.",
        "Store all PHI fields with AES-GCM-256 at rest.",
        "Maintain immutable append-only audit trail in audit_logs table.",
      ],
    },
    // Module 5: Testing Matrix
    testMatrix: {
      buildReadinessScore: 96,
      checklist: [
        { category: "Requirements Completeness", isComplete: true, details: "All 4 P0/P1 requirements have acceptance criteria." },
        { category: "Screen & Component Coverage", isComplete: true, details: "Every requirement maps to at least one interactive screen." },
        { category: "Traceability Adjacency", isComplete: true, details: "0 orphan entities or dangling edges detected." },
        { category: "Database Normalization", isComplete: true, details: "All foreign keys have indexes and ON DELETE cascades." },
      ],
      testCases: [
        {
          id: "tc-1",
          code: "TC-AUTH-001",
          requirementCode: "REQ-001",
          title: "Practitioner 2FA Happy Path",
          category: "HAPPY_PATH",
          preconditions: "Staff has active account with configured TOTP.",
          steps: [
            "1. Navigate to /portal/login.",
            "2. Enter valid credentials and submit.",
            "3. Enter current 6-digit TOTP code.",
            "4. Verify HTTP 200 and redirect to /portal/dashboard.",
          ],
          expectedResult: "User lands on dashboard; audit_logs records 'LOGIN_SUCCESS'.",
        },
        {
          id: "tc-2",
          code: "TC-AUTH-002",
          requirementCode: "REQ-001",
          title: "Brute Force Lockout Prevention",
          category: "SECURITY",
          preconditions: "Staff account exists.",
          steps: [
            "1. Submit 5 consecutive incorrect passwords.",
            "2. Check HTTP status code.",
            "3. Attempt 6th login with correct password.",
          ],
          expectedResult: "HTTP 429 received; account locked for 15 minutes.",
        },
        {
          id: "tc-3",
          code: "TC-SCHED-001",
          requirementCode: "REQ-002",
          title: "Concurrent Slot Double-Booking Prevention",
          category: "BOUNDARY",
          preconditions: "Practitioner has 1 open slot at 14:00.",
          steps: [
            "1. Two simulated patients simultaneously click 'Confirm Booking' for the 14:00 slot.",
            "2. Evaluate response codes for both requests.",
          ],
          expectedResult: "First request returns 201 Created; second returns 409 Conflict with alternative slots.",
        },
      ],
      recommendedImplementationOrder: [
        { phase: 1, name: "Core Authentication & Tenant Isolation", deliverables: ["users table", "clinics table", "Argon2id + TOTP", "SCR-001"], rationale: "Foundation for HIPAA compliance." },
        { phase: 2, name: "Scheduling Engine & Calendar Sync", deliverables: ["appointments table", "WFL-002", "SCR-003", "SCR-002"], rationale: "Enables core business value proposition." },
        { phase: 3, name: "Clinical Meal Builder & Patient Portal", deliverables: ["meal_plans table", "SCR-005", "SCR-006"], rationale: "Secondary engagement features." },
      ],
    },
  },
];

export function getStoredProjects(): ZellijProject[] {
  if (typeof window === "undefined") return SEED_PROJECTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PROJECTS));
      return SEED_PROJECTS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_PROJECTS;
  }
}

export function saveProject(project: ZellijProject): void {
  if (typeof window === "undefined") return;
  const current = getStoredProjects();
  const index = current.findIndex((p) => p.id === project.id);
  let updated: ZellijProject[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...project, updatedAt: Date.now() };
  } else {
    updated = [project, ...current];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getProjectById(id: string): ZellijProject | undefined {
  const projects = getStoredProjects();
  return projects.find((p) => p.id === id);
}

export function deleteProject(id: string): void {
  if (typeof window === "undefined") return;
  const current = getStoredProjects();
  const filtered = current.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
