import type { LucideIcon } from 'lucide-react'
import {
  Compass,
  Workflow,
  Rocket,
  Cpu,
  ListChecks,
  GitBranch,
  Building2,
  Hotel,
  Stethoscope,
  ReceiptText,
  Briefcase,
  HardHat,
  Gavel,
  Landmark,
  Users,
  Scale,
  Timer,
  Target,
  Brain,
  Bot,
  Layers,
  Database,
  Braces,
  Cloud,
  ShieldCheck,
  Gauge,
  Webhook,
  Zap,
  SlidersHorizontal,
  Boxes,
  LineChart,
  Server,
  Lock,
  MessageSquare,
} from 'lucide-react'

/* ----------------------------------- Services ---------------------------------- */

export interface Service {
  id: string
  index: string
  title: string
  description: string
  icon: LucideIcon
  image: string
}

const CLD = 'https://res.cloudinary.com/dz6kxumoo/image/upload/f_auto,q_auto,w_800'

export const services: Service[] = [
  {
    id: 'strategy',
    index: '01',
    title: 'AI Strategy',
    description:
      'Turn AI ambition into a prioritized roadmap tied to your P&L — sequenced by impact, cost, and feasibility.',
    icon: Compass,
    image: `${CLD}/v1783528055/SMBs__AI_Tools_Leveling_the_Playing_Field_2025_hogjsu.jpg`,
  },
  {
    id: 'automation',
    index: '02',
    title: 'Workflow Automation',
    description:
      'Remove the manual, repetitive work buried in your operations so your team spends time on judgment, not busywork.',
    icon: Workflow,
    image: `${CLD}/v1783528054/Workflow_Automation_Simplifying_Business_Operations_%EF%B8%8F_q8cjho.jpg`,
  },
  {
    id: 'deployment',
    index: '03',
    title: 'AI Deployment',
    description:
      'Move models and agents from proof-of-concept into production — with monitoring, guardrails, and clear ownership.',
    icon: Rocket,
    image: `${CLD}/v1783528052/How_PwC_Is_Supporting_Agentic_AI_Deployments_gudjum.jpg`,
  },
  {
    id: 'custom',
    index: '04',
    title: 'Custom AI Development',
    description:
      'Build systems shaped around your data and processes when off-the-shelf tools cannot do the job well enough.',
    icon: Cpu,
    image: `${CLD}/v1783528048/AI__Artificial_Intelligence_in_the_shape_of_sphere_grid_wave_in_wireframe_hand._AI_virtual_technology._Machine_Learning_Concept._Big_data_innovation_technology_zkirof.jpg`,
  },
  {
    id: 'selection',
    index: '05',
    title: 'AI Tool Selection',
    description:
      'Choose the right vendors without the sales spin. We evaluate against your requirements, not a leaderboard.',
    icon: ListChecks,
    image: `${CLD}/v1783528048/Ai_tech_stack_da3jy8.jpg`,
  },
  {
    id: 'process',
    index: '06',
    title: 'Process Optimization',
    description:
      'Redesign the workflow before you automate it. Automating a broken process only makes it fail faster.',
    icon: GitBranch,
    image: `${CLD}/v1783528051/What_is_Black_Box_Testing__Types_Tools_Techniques_dvq1vt.jpg`,
  },
]

/* ---------------------------------- Industries --------------------------------- */

export interface Industry {
  id: string
  slug: string
  name: string
  blurb: string
  icon: LucideIcon
}

export const industries: Industry[] = [
  {
    id: 'property',
    slug: 'property-management',
    name: 'Property Management',
    blurb: 'Automated maintenance triage, lease handling, and resident communication.',
    icon: Building2,
  },
  {
    id: 'hospitality',
    slug: 'hospitality',
    name: 'Hospitality',
    blurb: 'Unified guest profiles and staff copilots that lift service and retention.',
    icon: Hotel,
  },
  {
    id: 'healthcare',
    slug: 'healthcare',
    name: 'Healthcare',
    blurb: 'Documentation, intake, and scheduling support that gives clinicians time back.',
    icon: Stethoscope,
  },
  {
    id: 'rcm',
    slug: 'revenue-cycle-management',
    name: 'Revenue Cycle Management',
    blurb: 'Denial prediction, coding assistance, and faster, cleaner claim submission.',
    icon: ReceiptText,
  },
  {
    id: 'professional',
    slug: 'professional-services',
    name: 'Professional Services',
    blurb: 'Research, drafting, and knowledge retrieval built on your own files.',
    icon: Briefcase,
  },
  {
    id: 'legal',
    slug: 'legal',
    name: 'Legal',
    blurb: 'Contract review, discovery, and matter research grounded in your own documents.',
    icon: Gavel,
  },
  {
    id: 'construction',
    slug: 'construction',
    name: 'Construction',
    blurb: 'Bid analysis, submittal review, and document workflows that keep projects moving.',
    icon: HardHat,
  },
  {
    id: 'financial',
    slug: 'financial-services',
    name: 'Financial Services',
    blurb: 'Document processing, KYC/AML checks, and analyst copilots with a full audit trail.',
    icon: Landmark,
  },
]

/* ----------------------------------- Process ----------------------------------- */

export interface ProcessStep {
  index: string
  title: string
  description: string
  detail: string
}

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Discover',
    description: 'We audit your workflows, data, and systems to find where AI creates real leverage.',
    detail: 'Operational interviews · Data & tooling review · Opportunity map',
  },
  {
    index: '02',
    title: 'Recommend',
    description:
      'We score each opportunity and make the honest call: adopt the right off-the-shelf tool, or build custom only where it genuinely wins.',
    detail: 'Impact / effort scoring · Build-vs-buy call · Tool shortlist',
  },
  {
    index: '03',
    title: 'Build or configure',
    description:
      'We stand up and configure the chosen tools against your real data — or build a custom prototype when nothing off-the-shelf fits.',
    detail: 'Tool setup or prototype · Live data test · Go / no-go',
  },
  {
    index: '04',
    title: 'Integrate & deploy',
    description:
      'Bought or built, we wire it into the systems you already run — CRMs, ERPs, billing — with guardrails and clear ownership.',
    detail: 'Integration · Guardrails & monitoring · Team enablement',
  },
  {
    index: '05',
    title: 'Optimize',
    description: 'We measure results, tune performance, and expand what proves its value.',
    detail: 'Outcome tracking · Tuning · Roadmap for the next win',
  },
]

/* -------------------------------- Why hire us ---------------------------------- */

export interface Reason {
  title: string
  description: string
  icon: LucideIcon
}

export const reasons: Reason[] = [
  {
    title: 'Real operators',
    description:
      'We have run operations and shipped software — not just produced slide decks. We know what survives contact with a real team.',
    icon: Users,
  },
  {
    title: 'Vendor agnostic',
    description:
      'We hold no reseller deals and take no vendor kickbacks. Our recommendations reflect what fits you, nothing else.',
    icon: Scale,
  },
  {
    title: 'Rapid implementation',
    description:
      'You see working systems in weeks. We favor small, verifiable wins over long roadmaps that never ship.',
    icon: Timer,
  },
  {
    title: 'Business-first approach',
    description:
      'We start with the outcome and work backward to the model. If it does not move a number that matters, we do not build it.',
    icon: Target,
  },
]

/* ------------------------------------- FAQ ------------------------------------- */

export interface FAQItem {
  question: string
  answer: string
}

export const faqs: FAQItem[] = [
  {
    question: 'Do you build the AI, or only advise on it?',
    answer:
      'Both. Some clients want a clear strategy and vendor shortlist; others want us to design, build, and ship the system end to end. We are equally comfortable handing off or owning delivery.',
  },
  {
    question: 'How quickly will we see results?',
    answer:
      'Our first working prototype typically lands within a few weeks, tested against your real data. We deliberately structure engagements around early, verifiable wins rather than long roadmaps.',
  },
  {
    question: 'Are you tied to specific vendors or platforms?',
    answer:
      'No. We hold no reseller agreements and take no vendor commissions. We recommend the tools and models that fit your requirements, budget, and constraints — including the option to build nothing at all.',
  },
  {
    question: 'Will this work with our existing tools?',
    answer:
      'Yes. Most of our work is integration into systems you already run — CRMs, ERPs, property and billing platforms, data warehouses, and internal tools. We meet your stack where it is.',
  },
  {
    question: 'How do you handle data security and compliance?',
    answer:
      'We work inside your security and compliance controls, not around them. That means your data governance, access policies, and regulatory requirements shape the architecture from day one.',
  },
  {
    question: 'What size of company do you work with?',
    answer:
      'We focus on mid-market and enterprise organizations with real operational complexity — the environments where thoughtful AI implementation produces the largest, most durable returns.',
  },
]

/* ------------------------------- Trust / logos --------------------------------- */

export const trustStats = [
  { value: '40+', label: 'Systems deployed' },
  { value: '8', label: 'Industries served' },
  { value: '3–6 wks', label: 'To first prototype' },
  { value: '100%', label: 'Vendor agnostic' },
]

/* ------------------------------- Outcomes -------------------------------------- */

export interface Outcome {
  value: string
  label: string
  detail: string
}

// Illustrative targets to point to until real client results exist.
// Safe to edit — replace with measured numbers as engagements complete.
export const outcomes: Outcome[] = [
  {
    value: '40–70%',
    label: 'Less manual work',
    detail: 'Repetitive, rules-based tasks handled by automation instead of your team.',
  },
  {
    value: '80%+',
    label: 'Routine requests auto-resolved',
    detail: 'Common cases closed end to end, without a human in the loop.',
  },
  {
    value: '3–6 wks',
    label: 'To first production prototype',
    detail: 'A working system tested against your real data — not a slide deck.',
  },
  {
    value: '< 6 mo',
    label: 'Typical payback window',
    detail: 'Where a shipped automation earns back the cost of building it.',
  },
]

/* ------------------------------- Tech stack ------------------------------------ */

export interface TechItem {
  name: string
  icon: LucideIcon
}

// The "stack we build on" — flown through the tunnel in the TechStack section.
export const stack: TechItem[] = [
  { name: 'LLMs & Reasoning', icon: Brain },
  { name: 'AI Agents', icon: Bot },
  { name: 'RAG Pipelines', icon: Layers },
  { name: 'Vector Stores', icon: Database },
  { name: 'Embeddings', icon: Boxes },
  { name: 'Conversational AI', icon: MessageSquare },
  { name: 'Python', icon: Braces },
  { name: 'Orchestration', icon: Workflow },
  { name: 'MLOps', icon: GitBranch },
  { name: 'Fine-tuning', icon: SlidersHorizontal },
  { name: 'Integrations & APIs', icon: Webhook },
  { name: 'Automation', icon: Zap },
  { name: 'Cloud Infrastructure', icon: Cloud },
  { name: 'Serverless', icon: Server },
  { name: 'Evaluation & Observability', icon: Gauge },
  { name: 'Guardrails', icon: ShieldCheck },
  { name: 'Security & Compliance', icon: Lock },
  { name: 'Analytics', icon: LineChart },
]
