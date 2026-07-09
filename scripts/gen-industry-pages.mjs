// Generates static, crawlable SEO landing pages for each industry into
// public/industries/, plus a hub index, sitemap.xml and robots.txt.
//
// Run:  npm run gen:industries   (also runs automatically on `prebuild`)
//
// These are plain static HTML (not part of the React SPA) so search engines
// can crawl them directly. Each page cross-links to every other industry page
// and back to the main site — an internal link graph for SEO.

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT = resolve(ROOT, 'public/industries')

const BASE = 'https://operatorstudio.ai'
const SITE = 'operatorstudio.ai'

/** @typedef {{v:string,l:string}} Stat */
const industries = [
  {
    slug: 'property-management',
    name: 'Property Management',
    metaTitle: 'AI for Property Management | operatorstudio.ai',
    metaDescription:
      'AI experts for property management. Automate maintenance triage, leasing, and resident communication — we recommend the right tools or build custom, integrated with your PMS.',
    tagline:
      'Automate the busywork across leasing, maintenance, and resident communication — without replacing the systems you already run.',
    intro:
      'Property management runs on a flood of inbound requests, renewals, and vendor coordination — most of it handled by hand across email, phone, and your PMS. We put AI on the repetitive parts so your team spends its time on the exceptions that actually need judgment.',
    pains: [
      'Maintenance and leasing requests handled manually across email, phone, and portals.',
      'Slow first responses that frustrate residents and owners.',
      'Institutional knowledge trapped in inboxes and individual staff.',
    ],
    useCases: [
      { t: 'Maintenance triage & routing', d: 'Classify every request, gather missing details, and dispatch to the right vendor or team automatically.' },
      { t: 'Leasing assistant', d: 'Answer prospect questions, qualify leads, and schedule tours around the clock.' },
      { t: 'Resident communications', d: 'Draft and send renewal notices, rent reminders, and updates in your voice.' },
      { t: 'Owner reporting', d: 'Turn portfolio data into clear, on-demand owner updates.' },
      { t: 'Knowledge copilot', d: 'Answer staff questions from your leases, SOPs, and policies.' },
    ],
    tools: 'We integrate with the platforms you already run — AppFolio, Buildium, Yardi — and build custom where the workflow demands it.',
    outcomes: [
      { v: '71%', l: 'Faster first response' },
      { v: '80%+', l: 'Routine requests auto-resolved' },
      { v: '3–6 wks', l: 'To first working system' },
    ],
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    metaTitle: 'AI for Hospitality | operatorstudio.ai',
    metaDescription:
      'AI experts for hospitality. Unified guest profiles, staff copilots, and automated guest messaging — recommended tools or custom builds, integrated with your PMS and POS.',
    tagline:
      "Give front-line staff full guest context and automate the repetitive service work — so every interaction feels personal.",
    intro:
      'Guest data is scattered across booking, POS, and CRM systems, so staff answer questions with only part of the picture. We unify it and put a copilot in front of it — then automate the messaging that eats your team’s day.',
    pains: [
      'Guest data fragmented across booking, POS, and CRM systems.',
      'Repetitive guest messaging handled manually.',
      'New staff take months to ramp on property knowledge.',
    ],
    useCases: [
      { t: 'Unified guest profile', d: 'One view of each guest across booking, POS, and CRM.' },
      { t: 'Concierge copilot', d: 'Instant, in-context answers and next-best actions for staff.' },
      { t: 'Automated guest messaging', d: 'Pre-arrival, upsell, and follow-up messages in your brand voice.' },
      { t: 'Review & sentiment monitoring', d: 'Flag issues before they land in public reviews.' },
      { t: 'Booking & FAQ assistant', d: 'Handle common guest questions 24/7.' },
    ],
    tools: 'We work with your existing stack — Cloudbeds, Opera, Mews — and build custom integrations when needed.',
    outcomes: [
      { v: '+18', l: 'Guest NPS' },
      { v: '22%', l: 'Lift in repeat bookings' },
      { v: '3–6 wks', l: 'To first working system' },
    ],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    metaTitle: 'AI for Healthcare | operatorstudio.ai',
    metaDescription:
      'AI experts for healthcare. Documentation, intake, and scheduling support that gives clinicians time back — built inside your security and compliance controls.',
    tagline:
      "Take documentation, intake, and scheduling off your clinicians' plates — inside your security and compliance controls.",
    intro:
      'Administrative load is the quiet tax on clinical time. We target the documentation and coordination work with AI, built to respect your governance, access policies, and regulatory requirements from day one.',
    pains: [
      'Clinicians spending hours on documentation and inbox work.',
      'Manual intake and scheduling that delays care.',
      'Compliance concerns that stall AI projects before they start.',
    ],
    useCases: [
      { t: 'Ambient documentation support', d: 'Draft notes from encounters for fast clinician review.' },
      { t: 'Patient intake automation', d: 'Structured intake, triage, and pre-visit summaries.' },
      { t: 'Scheduling & reminders', d: 'Cut no-shows with automated coordination and follow-up.' },
      { t: 'Inbox & referral management', d: 'Draft responses and route messages to the right place.' },
      { t: 'Knowledge retrieval', d: 'Answer staff questions from your protocols and policies.' },
    ],
    tools: 'We build inside your existing systems — Epic, Cerner, athenahealth — and inside your HIPAA and security controls, not around them.',
    outcomes: [
      { v: '6+ hrs', l: 'Returned per clinician / wk' },
      { v: '30%+', l: 'Fewer no-shows' },
      { v: '3–6 wks', l: 'To first working system' },
    ],
  },
  {
    slug: 'revenue-cycle-management',
    name: 'Revenue Cycle Management',
    metaTitle: 'AI for Revenue Cycle Management (RCM) | operatorstudio.ai',
    metaDescription:
      'AI experts for revenue cycle management. Denial prediction, coding assistance, and cleaner, faster claim submission — recommended or custom, integrated with your billing platform.',
    tagline: 'Catch denials before they happen and get cleaner claims out the door faster.',
    intro:
      'A high denial rate quietly drains cash flow and forces expensive, repetitive rework. We put AI at the pre-submission stage — predicting risk and showing staff exactly what to fix before a claim ever leaves the building.',
    pains: [
      'High denial rates that delay cash flow.',
      'Expensive, repetitive rework on rejected claims.',
      'Coding and prior-auth work that bottlenecks the team.',
    ],
    useCases: [
      { t: 'Denial-risk prediction', d: 'Flag high-risk claims before submission.' },
      { t: 'Pre-submission review', d: 'Show staff exactly what to fix first, in priority order.' },
      { t: 'Coding assistance', d: 'Suggest and validate codes against the documentation.' },
      { t: 'Prior-authorization automation', d: 'Assemble, submit, and track authorization requests.' },
      { t: 'Denial-response drafting', d: 'Generate appeal letters grounded in the record.' },
    ],
    tools: 'We integrate with your billing and clearinghouse platforms, and build custom models against your own claims history.',
    outcomes: [
      { v: '34%', l: 'Fewer denials' },
      { v: '$2.1M', l: 'Recovered in year one' },
      { v: '3–6 wks', l: 'To first working system' },
    ],
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    metaTitle: 'AI for Professional Services | operatorstudio.ai',
    metaDescription:
      "AI experts for professional services firms. Turn your files into an instant research, drafting, and knowledge engine — grounded in your own documents.",
    tagline: "Turn your firm's files into an instant research, drafting, and knowledge engine.",
    intro:
      'Your best thinking is buried in past projects, proposals, and reports. We ground AI in your own documents so the whole firm can retrieve, draft, and reuse it — consistently and in your voice.',
    pains: [
      'Knowledge trapped in files and individual experts.',
      'Slow research and first-draft production.',
      'Inconsistent work product across the team.',
    ],
    useCases: [
      { t: 'Knowledge retrieval (RAG)', d: 'Answer questions grounded in your own documents, with sources.' },
      { t: 'Drafting assistant', d: 'First drafts of proposals, memos, and reports in your templates.' },
      { t: 'Research copilot', d: 'Synthesize across your project archive in seconds.' },
      { t: 'Intake & scoping', d: 'Structure new requests and surface relevant past work.' },
      { t: 'Meeting-to-action', d: 'Summaries and follow-ups generated from calls.' },
    ],
    tools: 'We recommend the best off-the-shelf assistants where they fit, and build custom retrieval on your document store where they do not.',
    outcomes: [
      { v: '40–60%', l: 'Faster first drafts' },
      { v: '5+ hrs', l: 'Saved per person / wk' },
      { v: '3–6 wks', l: 'To first working system' },
    ],
  },
  {
    slug: 'legal',
    name: 'Legal',
    metaTitle: 'AI for Legal Teams & Firms | operatorstudio.ai',
    metaDescription:
      'AI experts for legal teams and firms. Contract review, discovery, and matter research grounded in your own documents — with citations and an audit trail.',
    tagline:
      'Contract review, discovery, and matter research grounded in your own documents — with citations and an audit trail.',
    intro:
      'Legal work is document-dense and precision-critical. We deploy AI that stays grounded in your sources, cites its work, and keeps a reviewable trail — augmenting your team’s judgment, never replacing it.',
    pains: [
      'Hours lost to first-pass contract review and document search.',
      'Precedent and know-how scattered across matters and drives.',
      'Well-founded caution about accuracy, confidentiality, and hallucination.',
    ],
    useCases: [
      { t: 'Contract review & abstraction', d: 'Surface key terms, risks, and deviations from your playbook.' },
      { t: 'Discovery & document review', d: 'Classify, cluster, and prioritize large document sets.' },
      { t: 'Matter research', d: 'Answer questions grounded in your precedent and filings, with citations.' },
      { t: 'Clause & template drafting', d: 'Generate first drafts from your approved language.' },
      { t: 'Intake & conflict checks', d: 'Structure new matters and flag issues early.' },
    ],
    tools: 'We ground models in your document management system — iManage, NetDocuments — with citations and confidentiality controls, and build custom review workflows for your playbook.',
    outcomes: [
      { v: '50%+', l: 'Faster first-pass review' },
      { v: '4+ hrs', l: 'Saved per matter' },
      { v: '3–6 wks', l: 'To first working system' },
    ],
  },
  {
    slug: 'construction',
    name: 'Construction',
    metaTitle: 'AI for Construction | operatorstudio.ai',
    metaDescription:
      'AI experts for construction. Faster bid analysis, submittal and RFI review, and document workflows that keep projects moving — integrated with tools like Procore.',
    tagline: 'Keep projects moving with faster bid analysis, submittal review, and document workflows.',
    intro:
      'Construction runs on documents — drawings, specs, submittals, contracts — and the review work that surrounds them. We put AI on the document-heavy bottlenecks so your team keeps projects moving.',
    pains: [
      'Document-heavy review that slows every phase.',
      'Bid and submittal review done manually against specs.',
      'Project information scattered across systems and drives.',
    ],
    useCases: [
      { t: 'Bid & proposal analysis', d: 'Compare bids and surface scope gaps and outliers.' },
      { t: 'Submittal & RFI review', d: 'Check submittals against specs and flag issues.' },
      { t: 'Document search', d: 'Answer questions across drawings, specs, and contracts.' },
      { t: 'Daily reporting', d: 'Turn field notes into structured daily reports.' },
      { t: 'Compliance & closeout', d: 'Assemble and check closeout documentation.' },
    ],
    tools: 'We integrate with project platforms like Procore, and build custom document workflows on your own drawings and specs.',
    outcomes: [
      { v: '40–60%', l: 'Faster review cycles' },
      { v: '6+ hrs', l: 'Saved per project / wk' },
      { v: '3–6 wks', l: 'To first working system' },
    ],
  },
  {
    slug: 'financial-services',
    name: 'Financial Services',
    metaTitle: 'AI for Financial Services | operatorstudio.ai',
    metaDescription:
      'AI experts for financial services. Document processing, KYC/AML support, and analyst copilots with a full audit trail — built inside your compliance controls.',
    tagline:
      'Automate document-heavy operations and give analysts a copilot — with a full audit trail and controls.',
    intro:
      'Financial operations are document- and review-heavy, under real regulatory scrutiny. We automate the repetitive processing and give analysts grounded copilots — with the audit trail and controls your compliance team expects.',
    pains: [
      'Manual processing of statements, applications, and forms.',
      'Heavy KYC/AML and review workloads.',
      'Compliance and audit requirements that constrain tooling.',
    ],
    useCases: [
      { t: 'Document processing', d: 'Extract and validate data from statements, applications, and forms.' },
      { t: 'KYC/AML support', d: 'Assemble reviews, flag anomalies, and draft narratives.' },
      { t: 'Analyst copilot', d: 'Synthesize filings, research, and internal data with citations.' },
      { t: 'Client communications', d: 'Draft compliant responses and summaries for review.' },
      { t: 'Reconciliation & exceptions', d: 'Surface and route the exceptions that need a human.' },
    ],
    tools: 'We build inside your security and compliance controls, with a full audit trail — recommending proven tools where they fit and building custom where they do not.',
    outcomes: [
      { v: '60%+', l: 'Faster document processing' },
      { v: '8+ hrs', l: 'Saved per analyst / wk' },
      { v: '3–6 wks', l: 'To first working system' },
    ],
  },
]

const logoSvg = `<svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect width="32" height="32" rx="7" fill="#0A1424"/><path d="M8 16.5l4.8 4.8L23.5 10.5" stroke="#2E5CFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="24.5" cy="8" r="1.8" fill="#2DD4BF"/></svg>`

const css = `
:root{--ink:#0A1424;--bg:#fff;--bg2:#F5F7FA;--muted:#5b6b82;--brand:#2E5CFF;--brand2:#1F45E6;--teal:#0D9488;--line:rgba(10,20,36,.10)}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:Inter,system-ui,-apple-system,sans-serif;color:var(--ink);background:var(--bg);line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
img{max-width:100%}
.wrap{max-width:1080px;margin:0 auto;padding:0 24px}
header.site{position:sticky;top:0;z-index:10;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);background:rgba(255,255,255,.82);border-bottom:1px solid var(--line)}
header.site .wrap{display:flex;align-items:center;justify-content:space-between;height:64px}
.logo{display:flex;align-items:center;gap:10px;font-weight:600;font-size:18px;letter-spacing:-.01em}
.logo .ai{color:var(--brand)}
.nav{display:flex;align-items:center;gap:22px;font-size:14px;font-weight:500}
.nav a{color:var(--muted)}.nav a:hover{color:var(--ink)}
.btn{display:inline-flex;align-items:center;gap:8px;border-radius:999px;padding:11px 20px;font-weight:600;font-size:14px;transition:.2s}
.btn-dark{background:var(--ink);color:#fff}.btn-dark:hover{background:#16294A}
.btn-primary{background:var(--brand);color:#fff}.btn-primary:hover{background:var(--brand2)}
.btn-ghost{border:1px solid var(--line);color:var(--ink)}.btn-ghost:hover{border-color:rgba(10,20,36,.24)}
.breadcrumb{font-size:13px;color:var(--muted);padding:26px 0 0}
.breadcrumb a:hover{color:var(--ink)}
.eyebrow{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--brand2);font-weight:500}
.hero{padding:26px 0 20px}
h1{font-size:clamp(2rem,4.6vw,3.2rem);line-height:1.05;letter-spacing:-.025em;margin:14px 0 0;font-weight:700}
.lead{font-size:1.16rem;color:var(--muted);max-width:660px;margin:20px 0 0}
.cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
section.block{padding:44px 0;border-top:1px solid var(--line);margin-top:44px}
h2{font-size:1.55rem;letter-spacing:-.02em;margin:0 0 10px;font-weight:600}
.sub{color:var(--muted);max-width:680px;margin:0 0 26px}
.grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(240px,1fr))}
.card{border:1px solid var(--line);border-radius:16px;padding:22px;background:var(--bg);transition:.2s}
.card:hover{border-color:rgba(10,20,36,.16);box-shadow:0 12px 30px -18px rgba(10,20,36,.28)}
.card h3{margin:0 0 6px;font-size:1.05rem}
.card p{margin:0;color:var(--muted);font-size:.95rem}
ul.checks{list-style:none;padding:0;margin:0;display:grid;gap:12px;max-width:680px}
ul.checks li{position:relative;padding-left:26px;color:var(--muted)}
ul.checks li::before{content:'';position:absolute;left:0;top:10px;width:8px;height:8px;border-radius:2px;background:var(--teal)}
.tracks{display:grid;gap:16px;grid-template-columns:1fr 1fr}
.tracks .card h3{display:flex;align-items:center;gap:8px}
.dot{width:9px;height:9px;border-radius:3px;flex:none}
.stats{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
.stat{border:1px solid var(--line);border-radius:16px;padding:22px}
.stat .v{font-size:2.1rem;font-weight:700;letter-spacing:-.02em}
.stat .l{color:var(--muted);font-size:.9rem;margin-top:4px}
.disclaimer{font-size:.8rem;color:var(--muted);margin-top:18px;font-style:italic}
.related{display:flex;flex-wrap:wrap;gap:10px}
.chip{border:1px solid var(--line);border-radius:999px;padding:9px 16px;font-size:.9rem;font-weight:500;color:var(--muted)}
.chip:hover{border-color:var(--brand);color:var(--brand)}
.cta-band{background:var(--ink);color:#fff;border-radius:24px;padding:52px 32px;text-align:center;margin:52px 0 8px}
.cta-band h2{color:#fff}
.cta-band p{color:rgba(255,255,255,.6);max-width:520px;margin:8px auto 24px}
footer.site{border-top:1px solid var(--line);padding:40px 0;color:var(--muted);font-size:.9rem;margin-top:12px}
footer.site .cols{display:flex;flex-wrap:wrap;gap:30px 48px;margin-bottom:24px}
footer.site h4{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:rgba(10,20,36,.4);margin:0 0 12px;font-weight:600}
footer.site ul{list-style:none;padding:0;margin:0;display:grid;gap:8px}
footer.site a:hover{color:var(--ink)}
@media(max-width:640px){.tracks{grid-template-columns:1fr}.nav .hide{display:none}.cta-band{padding:36px 20px}}
`

const head = ({ title, desc, canonical, jsonld }) => `  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
  <meta name="description" content="${esc(desc)}"/>
  <link rel="canonical" href="${canonical}"/>
  <meta name="robots" content="index,follow"/>
  <meta property="og:type" content="website"/>
  <meta property="og:site_name" content="${SITE}"/>
  <meta property="og:title" content="${esc(title)}"/>
  <meta property="og:description" content="${esc(desc)}"/>
  <meta property="og:url" content="${canonical}"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${esc(title)}"/>
  <meta name="twitter:description" content="${esc(desc)}"/>
  <meta name="theme-color" content="#060B14"/>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet"/>
  <style>${css}</style>
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>`

const siteHeader = `<header class="site"><div class="wrap">
  <a class="logo" href="/">${logoSvg}<span>operatorstudio<span class="ai">.ai</span></span></a>
  <nav class="nav"><a class="hide" href="/">Home</a><a href="/industries/">Industries</a><a class="hide" href="/#process">Process</a><a class="btn btn-dark" href="/#book">Book a call</a></nav>
</div></header>`

const siteFooter = `<footer class="site"><div class="wrap">
  <div class="cols">
    <div><h4>Company</h4><ul><li><a href="/">Home</a></li><li><a href="/#services">Services</a></li><li><a href="/#process">Process</a></li><li><a href="/#faq">FAQ</a></li><li><a href="/#book">Book a call</a></li></ul></div>
    <div><h4>Industries</h4><ul>${industries.slice(0, 4).map((i) => `<li><a href="/industries/${i.slug}.html">${i.name}</a></li>`).join('')}<li><a href="/industries/">All industries</a></li></ul></div>
    <div><h4>More industries</h4><ul>${industries.slice(4).map((i) => `<li><a href="/industries/${i.slug}.html">${i.name}</a></li>`).join('')}</ul></div>
  </div>
  <p>© ${new Date().getFullYear()} operatorstudio.ai — AI experts who drive business outcomes. All rights reserved.</p>
</div></footer>`

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function page(ind) {
  const canonical = `${BASE}/industries/${ind.slug}.html`
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: `AI for ${ind.name}`,
        serviceType: 'AI implementation and automation',
        description: ind.metaDescription,
        provider: { '@type': 'Organization', name: SITE, url: BASE },
        areaServed: ind.name,
        url: canonical,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
          { '@type': 'ListItem', position: 2, name: 'Industries', item: `${BASE}/industries/` },
          { '@type': 'ListItem', position: 3, name: ind.name, item: canonical },
        ],
      },
    ],
  }

  const related = industries
    .filter((i) => i.slug !== ind.slug)
    .map((i) => `<a class="chip" href="/industries/${i.slug}.html">${i.name}</a>`)
    .join('')

  return `<!doctype html>
<html lang="en">
<head>
${head({ title: ind.metaTitle, desc: ind.metaDescription, canonical, jsonld })}
</head>
<body>
${siteHeader}
<main class="wrap">
  <nav class="breadcrumb"><a href="/">Home</a> / <a href="/industries/">Industries</a> / ${ind.name}</nav>

  <section class="hero">
    <span class="eyebrow">Industry · AI implementation</span>
    <h1>AI for ${ind.name}</h1>
    <p class="lead">${esc(ind.tagline)}</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="/#book">Book a strategy call</a>
      <a class="btn btn-ghost" href="/#process">See how we work</a>
    </div>
    <p class="lead" style="margin-top:24px">${esc(ind.intro)}</p>
  </section>

  <section class="block">
    <h2>The problem</h2>
    <p class="sub">What the day looks like before AI does the repetitive work.</p>
    <ul class="checks">${ind.pains.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
  </section>

  <section class="block">
    <h2>Where AI helps in ${ind.name.toLowerCase()}</h2>
    <p class="sub">High-leverage use cases we deploy — recommended off-the-shelf where a great tool exists, custom where it doesn't.</p>
    <div class="grid">${ind.useCases.map((u) => `<div class="card"><h3>${esc(u.t)}</h3><p>${esc(u.d)}</p></div>`).join('')}</div>
  </section>

  <section class="block">
    <h2>How we deliver</h2>
    <p class="sub">${esc(ind.tools)}</p>
    <div class="tracks">
      <div class="card"><h3><span class="dot" style="background:#0D9488"></span>Recommend &amp; implement</h3><p>When the right off-the-shelf tool already exists, we select it without the sales spin, configure it to your workflow, and integrate it into your stack.</p></div>
      <div class="card"><h3><span class="dot" style="background:#2E5CFF"></span>Design &amp; build custom</h3><p>When nothing off-the-shelf fits, we design and build a system around your data and processes — then ship it to production and own the result.</p></div>
    </div>
  </section>

  <section class="block">
    <h2>Outcomes to aim for</h2>
    <p class="sub">Illustrative targets for a well-scoped ${ind.name.toLowerCase()} engagement.</p>
    <div class="stats">${ind.outcomes.map((o) => `<div class="stat"><div class="v">${esc(o.v)}</div><div class="l">${esc(o.l)}</div></div>`).join('')}</div>
    <p class="disclaimer">Illustrative targets, not guarantees. We replace these with measured results as engagements complete.</p>
  </section>

  <section class="block">
    <h2>Related industries</h2>
    <p class="sub">We bring the same playbook to adjacent operators.</p>
    <div class="related">${related}</div>
  </section>

  <div class="cta-band">
    <h2>Bring AI to your ${ind.name.toLowerCase()} operation</h2>
    <p>A 30-minute call to pressure-test where AI moves a real number — and where it doesn't. No pitch, no obligation.</p>
    <a class="btn btn-primary" href="/#book">Book a strategy call</a>
  </div>
</main>
${siteFooter}
</body>
</html>
`
}

function hub() {
  const canonical = `${BASE}/industries/`
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Industries — operatorstudio.ai',
    description: 'AI implementation and automation across property management, hospitality, healthcare, RCM, professional services, legal, construction, and financial services.',
    url: canonical,
  }
  return `<!doctype html>
<html lang="en">
<head>
${head({
    title: 'Industries We Serve | operatorstudio.ai',
    desc: 'AI experts across property management, hospitality, healthcare, revenue cycle management, professional services, legal, construction, and financial services.',
    canonical,
    jsonld,
  })}
</head>
<body>
${siteHeader}
<main class="wrap">
  <nav class="breadcrumb"><a href="/">Home</a> / Industries</nav>
  <section class="hero">
    <span class="eyebrow">Industries</span>
    <h1>AI, built for how your industry actually runs</h1>
    <p class="lead">We go deep in sectors where operational detail matters — the places where generic AI tools break and thoughtful implementation wins. Explore how we work in each.</p>
  </section>
  <section class="block" style="border-top:none;margin-top:8px">
    <div class="grid">${industries.map((i) => `<a class="card" href="/industries/${i.slug}.html"><h3>${i.name}</h3><p>${esc(i.tagline)}</p></a>`).join('')}</div>
  </section>
  <div class="cta-band">
    <h2>Not sure where AI fits?</h2>
    <p>Book a 30-minute call and we'll map the highest-leverage opportunities in your operation.</p>
    <a class="btn btn-primary" href="/#book">Book a strategy call</a>
  </div>
</main>
${siteFooter}
</body>
</html>
`
}

function sitemap() {
  const urls = [
    { loc: `${BASE}/`, pri: '1.0' },
    { loc: `${BASE}/industries/`, pri: '0.8' },
    ...industries.map((i) => ({ loc: `${BASE}/industries/${i.slug}.html`, pri: '0.7' })),
  ]
  const today = new Date().toISOString().slice(0, 10)
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.pri}</priority></url>`).join('\n')}
</urlset>
`
}

const robots = `User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml
`

// ---- write everything ----
mkdirSync(OUT, { recursive: true })
let count = 0
for (const ind of industries) {
  writeFileSync(resolve(OUT, `${ind.slug}.html`), page(ind))
  count++
}
writeFileSync(resolve(OUT, 'index.html'), hub())
writeFileSync(resolve(ROOT, 'public/sitemap.xml'), sitemap())
writeFileSync(resolve(ROOT, 'public/robots.txt'), robots)

console.log(`Generated ${count} industry pages + hub + sitemap.xml + robots.txt into public/`)
