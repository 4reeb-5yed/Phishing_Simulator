# PhishSim — AI-Powered Phishing Simulation Platform

> A production-grade cybersecurity awareness training platform built with Google Gemini AI,
> React, Node.js, and Tailwind CSS. Simulates realistic phishing campaigns for security
> awareness, education, and interview-ready portfolio demonstration.
> **Fully deployed and publicly accessible — zero local setup required to try it.**

---

## 🌐 Live Deployment

| Service | URL | Platform |
|---|---|---|
| **Frontend** | https://fish-sail.onrender.com | Render — Static Site (Free Tier) |
| **Backend API** | https://phishsim-backend-wzeo.onrender.com | Render — Web Service (Free Tier) |

> **Note on cold starts:** Render's free tier spins down backend services after 15 minutes
> of inactivity. The first request after idle may take 30–60 seconds to respond while the
> service wakes up. Subsequent requests are fast. This is a Render free-tier behaviour,
> not an application bug.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Deployment Architecture](#3-deployment-architecture)
4. [Complete System Architecture](#4-complete-system-architecture)
5. [Full Folder Structure](#5-full-folder-structure)
6. [Backend Architecture](#6-backend-architecture)
7. [Frontend Architecture](#7-frontend-architecture)
8. [AI Integration Layer](#8-ai-integration-layer)
9. [API Reference](#9-api-reference)
10. [Data Flow & Workflows](#10-data-flow--workflows)
11. [Design System](#11-design-system)
12. [Engineering Principles Applied](#12-engineering-principles-applied)
13. [Local Setup & Installation](#13-local-setup--installation)
14. [Environment Configuration](#14-environment-configuration)
15. [Running Locally](#15-running-locally)
16. [Feature Walkthrough](#16-feature-walkthrough)
17. [Security & Ethical Considerations](#17-security--ethical-considerations)
18. [Known Limitations & Future Scope](#18-known-limitations--future-scope)

---

## 1. Project Overview

PhishSim is a full-stack AI-powered phishing simulation and cybersecurity awareness platform.
It is **live on the internet**, deployed end-to-end on Render's free tier with zero hosting cost.

The platform allows security teams, educators, and developers to:

- **Generate realistic phishing email simulations** using Google Gemini AI across 10 attack
  categories, 8 target scenarios, 9 impersonation types, 4 severity levels, and 6 tone styles
- **Design multi-phase phishing campaigns** with department targeting, attack vectors,
  compliance frameworks, and AI-generated phase plans with estimated click rates
- **Analyse social engineering tactics** with AI-powered educational explanations including
  psychological breakdowns, real-world examples, and protection tips
- **Explore the Education Hub** — a structured reference for understanding attack types,
  detection indicators, attacker profiles, and countermeasures

Every layer of the platform — AI provider, backend, frontend, hosting — runs on completely
free services. There are no paid APIs, no databases with hosting fees, and no infrastructure costs.

### Who This Is For

| Audience | Use Case |
|---|---|
| Security Teams | Run phishing awareness training internally |
| Educators | Demonstrate real phishing tactics in classroom settings |
| Developers / Students | Portfolio project — full-stack + AI integration + cloud deployment |
| Interviewers / Recruiters | Review architecture, SOLID principles, AI abstraction, live demo |

---

## 2. Technology Stack

### Completely Free — Local and Deployed

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **AI Provider** | Google Gemini API | Free Tier | Email & campaign generation |
| **Backend Runtime** | Node.js | v18+ | JavaScript server runtime |
| **Backend Framework** | Express.js | ^4.19 | HTTP server, routing, middleware |
| **AI SDK** | @google/generative-ai | ^0.21 | Gemini API client |
| **Security** | Helmet.js | ^7.1 | HTTP security headers |
| **CORS** | cors | ^2.8 | Cross-origin resource sharing |
| **Rate Limiting** | express-rate-limit | ^7.3 | API abuse prevention |
| **Logging** | Morgan | ^1.10 | HTTP request logging |
| **UUIDs** | uuid | ^10.0 | Unique ID generation |
| **Frontend Build** | Vite | ^5.3 | Fast dev server + bundler |
| **UI Framework** | React | ^18.3 | Component-based UI |
| **Routing** | React Router v6 | ^6.25 | Client-side navigation |
| **Styling** | Tailwind CSS | ^3.4 | Utility-first CSS framework |
| **HTTP Client** | Axios | ^1.7 | API calls from frontend |
| **Toasts** | react-hot-toast | ^2.4 | User feedback notifications |
| **Icons** | Lucide React | ^0.400 | Consistent icon library |
| **CSS Utilities** | clsx | ^2.1 | Conditional class name merging |
| **Frontend Hosting** | Render Static Site | Free | Serves built React files globally |
| **Backend Hosting** | Render Web Service | Free | Runs the Node.js Express server |

---

## 3. Deployment Architecture

### How the Live App Works

```
User Browser
     │
     │  HTTPS request
     ▼
https://fish-sail.onrender.com
     │
     │  Render CDN serves pre-built static files
     │  (HTML + JS + CSS from `frontend/dist/`)
     ▼
React App loads in browser
     │
     │  Axios HTTP requests to absolute URL
     │  https://phishsim-backend-wzeo.onrender.com/api/*
     ▼
https://phishsim-backend-wzeo.onrender.com
     │
     │  Render Web Service running Node.js + Express
     │  PORT set by Render automatically via $PORT env var
     ▼
Express routes → Services → Gemini API
     │
     │  JSON response
     ▼
React renders the result
```

### Render Configuration

**Frontend — Static Site**

| Setting | Value |
|---|---|
| Build Command | `npm run build` |
| Publish Directory | `dist` |
| Root Directory | `frontend/` |
| Auto-Deploy | On every push to main branch |

**Backend — Web Service**

| Setting | Value |
|---|---|
| Build Command | `npm install` |
| Start Command | `node src/app.js` |
| Root Directory | `backend/` |
| Environment | Node.js |
| Auto-Deploy | On every push to main branch |

**Backend Environment Variables (set in Render dashboard)**

| Variable | Value |
|---|---|
| `GOOGLE_API_KEY` | Your Gemini API key |
| `GEMINI_MODEL` | `gemini-2.0-flash-exp` |
| `FRONTEND_URL` | `https://fish-sail.onrender.com` |
| `NODE_ENV` | `production` |

The `PORT` variable is automatically provided by Render — the app reads it via
`process.env.PORT` in the config module.

### Why Vite Proxy Is Not Used in Production

During local development, `vite.config.js` proxies `/api` requests to `http://localhost:5000`.
This is a dev-only convenience. In production:
- The Vite proxy does not exist (only the built static files are served)
- `VITE_API_URL` (or hardcoded base URL in `api.service.js`) points directly to the
  Render backend URL `https://phishsim-backend-wzeo.onrender.com`
- CORS on the backend is configured to allow `https://fish-sail.onrender.com` as the
  only permitted origin

### Free Tier Constraints on Render

| Constraint | Impact | Behaviour |
|---|---|---|
| Backend sleeps after 15 min idle | First request is slow | 30–60s cold start, then fast |
| 750 free instance hours/month | Enough for personal/demo use | Shared across all free services |
| No persistent disk | In-memory state resets on restart | Expected — documented limitation |
| Shared CPU/RAM | Occasional slowness under load | Gemini API call is the real bottleneck anyway |

---

## 4. Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     BROWSER (User)                                   │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  ┌──────────┐  │
│  │  Dashboard   │  │  Generator   │  │ Campaigns  │  │Education │  │
│  │      /       │  │  /generator  │  │ /campaigns │  │/education│  │
│  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘  └────┬─────┘  │
│         └─────────────────┴─────────────────┴───────────────┘        │
│                                    │                                  │
│              React Router v6 + Responsive Layout System              │
│              (Desktop Sidebar / Mobile Drawer + Bottom Nav)          │
│              Light / Dark Theme via CSS Variables + ThemeContext      │
└────────────────────────────────────┬────────────────────────────────┘
                                     │
                    Axios — HTTPS to Render backend
                    https://phishsim-backend-wzeo.onrender.com/api/*
                                     │
                    ┌────────────────▼────────────────┐
                    │      EXPRESS.JS BACKEND           │
                    │      (Render Web Service)         │
                    │                                   │
                    │  Helmet → CORS → Rate Limit       │
                    │  Morgan → Body Parser             │
                    │                                   │
                    │  ┌──────────────────────────┐    │
                    │  │      ROUTE REGISTRY       │    │
                    │  │  GET  /api/health         │    │
                    │  │  GET  /api/meta           │    │
                    │  │  POST /api/phishing/generate   │
                    │  │  POST /api/phishing/explain│    │
                    │  │  GET  /api/phishing/vars  │    │
                    │  │  GET  /api/phishing/history│   │
                    │  │  GET  /api/phishing/stats │    │
                    │  │  POST /api/campaigns      │    │
                    │  │  GET  /api/campaigns      │    │
                    │  │  GET  /api/campaigns/:id  │    │
                    │  │  DEL  /api/campaigns/:id  │    │
                    │  └───────────┬───────────────┘    │
                    │              │                     │
                    │  ┌───────────▼───────────────┐    │
                    │  │      SERVICE LAYER         │    │
                    │  │  PhishingGeneratorService  │    │
                    │  │  CampaignService           │    │
                    │  └───────────┬───────────────┘    │
                    │              │                     │
                    │  ┌───────────▼───────────────┐    │
                    │  │  AI SERVICE (Abstracted)   │    │
                    │  │  PromptManager             │    │
                    │  │      ↓                     │    │
                    │  │  GeminiProvider (Singleton) │   │
                    │  └───────────┬───────────────┘    │
                    └─────────────┬────────────────────┘
                                  │
                                  │ HTTPS
                    ┌─────────────▼────────────────┐
                    │      GOOGLE GEMINI API         │
                    │   gemini-2.0-flash-exp         │
                    │   (Free Tier)                  │
                    └───────────────────────────────┘
```

---

## 5. Full Folder Structure

```
phishing-simulator/
│
├── README.md                          ← This file
├── setup.bat                          ← Windows one-click local setup
├── setup.sh                           ← Mac/Linux one-click local setup
│
├── backend/
│   ├── package.json                   ← Dependencies + npm scripts
│   ├── .env.example                   ← Environment variable template
│   │
│   └── src/
│       ├── app.js                     ← Express server entry point
│       │                                 Assembles middleware, routes, starts server
│       │
│       ├── config/
│       │   └── index.js               ← Reads process.env, exports typed config object
│       │                                 validateConfig() throws on missing required vars
│       │
│       ├── middleware/
│       │   ├── errorHandler.js        ← Global Express error handler + 404 handler
│       │   │                             Handles Gemini quota/auth errors specifically
│       │   └── validator.js           ← validateBody(fields) + validateSeverity()
│       │                                 Reusable middleware factories
│       │
│       ├── routes/
│       │   ├── index.js               ← Central router — mounts sub-routers + health/meta
│       │   ├── phishing.routes.js     ← /api/phishing/* — 5 endpoints
│       │   └── campaign.routes.js     ← /api/campaigns/* — 4 endpoints
│       │
│       ├── services/
│       │   ├── ai/
│       │   │   ├── providers/
│       │   │   │   └── gemini.provider.js     ← Gemini SDK wrapper, singleton
│       │   │   │                                 generate() + generateJSON()
│       │   │   ├── ai.service.js              ← Provider-agnostic interface
│       │   │   │                                 generateText() + generateStructured()
│       │   │   └── prompt.manager.js          ← All AI prompt builder functions
│       │   │                                     One function per use case
│       │   │
│       │   └── phishing/
│       │       ├── phishing.generator.service.js  ← Email gen, history, stats, variations
│       │       └── campaign.service.js             ← Campaign CRUD + AI generation
│       │
│       └── utils/
│           ├── constants.js           ← Enum values shared across backend modules
│           └── response.util.js       ← sendSuccess() + sendError() response helpers
│
└── frontend/
    ├── index.html                     ← Vite HTML entry + Google Fonts imports
    ├── package.json                   ← Dependencies + build scripts
    ├── vite.config.js                 ← Dev proxy /api → localhost:5000
    ├── tailwind.config.js             ← CSS variable tokens, darkMode: 'class'
    ├── postcss.config.js              ← PostCSS pipeline for Tailwind
    │
    └── src/
        ├── main.jsx                   ← ReactDOM.createRoot, mounts <App />
        ├── App.jsx                    ← ThemeProvider → BrowserRouter → Layout → Routes
        ├── index.css                  ← CSS variable definitions (:root + .dark)
        │                                Component utility classes (@layer components)
        │
        ├── context/
        │   └── ThemeContext.jsx       ← createContext, toggleTheme(), localStorage persist
        │
        ├── components/
        │   │
        │   ├── ui/
        │   │   └── index.jsx          ← Badge, Button, Spinner, Card, EmptyState,
        │   │                              SectionHeader, Tabs, SelectWrapper, InfoRow
        │   │
        │   ├── layout/
        │   │   └── Layout.jsx         ← DesktopSidebar, MobileDrawer, TopBar,
        │   │                              MobileBottomNav, ThemeToggle, DevFooter
        │   │
        │   ├── phishing/
        │   │   ├── PhishingForm.jsx   ← 6-parameter form with dropdowns + urgency slider
        │   │   ├── EmailPreview.jsx   ← 3-tab output: EmailBodyTab, RedFlagsTab, AnalysisTab
        │   │   └── SeverityBadge.jsx  ← SeverityBadge pill + SeverityScore progress bar
        │   │
        │   ├── campaign/
        │   │   └── CampaignCard.jsx   ← Expandable card: phases, templates, metrics
        │   │
        │   └── dashboard/
        │       └── StatsCard.jsx      ← Icon + value + label metric card
        │
        ├── pages/
        │   ├── Dashboard.jsx          ← Stats grid, recent feed, quick actions, category chart
        │   ├── Generator.jsx          ← Form + tabbed EmailPreview + explanation panel
        │   ├── Campaigns.jsx          ← Campaign creation form + CampaignCard list
        │   └── Education.jsx          ← Knowledge base accordion + scenario explorer + tips
        │
        ├── services/
        │   ├── api.service.js         ← Axios instance: baseURL, timeout, error interceptor
        │   └── phishing.service.js    ← PhishingService, CampaignService, MetaService
        │
        └── utils/
            ├── constants.js           ← Frontend enum arrays (categories, vectors, tones)
            └── helpers.js             ← getSeverityClass, formatDate, truncate, getRiskColor
```

---

## 6. Backend Architecture

### 6.1 Entry Point — `src/app.js`

The Express application middleware is assembled in a deliberate order:

1. **Config validation** — `validateConfig()` throws immediately if `GOOGLE_API_KEY` is
   absent. The server never silently starts in a broken state.
2. **Helmet** — Sets 11 HTTP security headers in one call (X-Frame-Options,
   Content-Security-Policy, HSTS, etc.)
3. **CORS** — Configured with explicit allowed origin (`FRONTEND_URL`). In production this
   is `https://fish-sail.onrender.com`. Any other origin is rejected.
4. **Rate limiting** — 100 requests per 15-minute window per IP on all `/api/*` routes.
   Prevents Gemini API quota exhaustion from abuse.
5. **Body parser** — JSON limit set to 10KB. Prevents oversized payload attacks.
6. **Morgan** — `dev` format locally, `combined` (Apache) format in production.
7. **Routes** — All API routes mounted under `/api`.
8. **Error handlers** — 404 not-found and global error handler mounted last.

### 6.2 Configuration — `src/config/index.js`

A single configuration object is built from `process.env` at startup. All modules import
from `config` — none read `process.env` directly. This enforces a single source of truth
and makes environment changes trivial to audit or mock in tests.

```
config.server.port         → process.env.PORT (Render injects this automatically)
config.server.nodeEnv      → NODE_ENV
config.ai.googleApiKey     → GOOGLE_API_KEY
config.ai.geminiModel      → GEMINI_MODEL
config.cors.frontendUrl    → FRONTEND_URL
config.rateLimit.windowMs  → RATE_LIMIT_WINDOW_MS
config.rateLimit.max       → RATE_LIMIT_MAX_REQUESTS
```

### 6.3 Routes Layer — `src/routes/`

Routes are intentionally **thin controllers**. They handle:
- HTTP method and path matching
- Middleware composition (validation per route)
- Delegation to the service layer
- Sending the uniform `sendSuccess()` / `sendError()` response

No business logic lives in routes. The route registry also exposes:
- `GET /api/health` — liveness check, returns uptime, AI provider name and model
- `GET /api/meta` — returns all dropdown config values so the frontend stays in sync
  with the backend's data model without duplicating constants

### 6.4 Middleware — `src/middleware/`

**`errorHandler.js`** — Catches errors thrown from async route handlers:
- `SyntaxError` from JSON.parse failures in AI responses → HTTP 422 with clear message
- Google API authentication errors → HTTP 503
- Quota exceeded (rate limit from Gemini) → HTTP 429
- All others → HTTP 500, detailed stack only in development

**`validator.js`** — Two reusable middleware factories:
- `validateBody(fields[])` — returns HTTP 400 listing exactly which fields are missing
- `validateSeverity()` — validates against the allowed severity enum

### 6.5 Service Layer — `src/services/`

Services are **ES6 classes with private fields** (`#field` syntax). Private fields prevent
business state from being mutated externally. All services use a **singleton pattern** —
a `getInstance()` wrapper ensures one instance per process, preventing duplicated state.

**PhishingGeneratorService**
- `generateEmail(params)` — builds prompt → AI → wraps with UUID + createdAt timestamp
- `generateExplanation(params)` — educational breakdown: psychology, tips, sectors
- `generateVariations(category, count)` — N unique scenario angles for a category
- `getHistory()` — last 50 simulations in reverse-chronological order (FIFO in-memory)
- `getStats()` — aggregates totals by category and severity from in-memory history

**CampaignService**
- `createCampaign(params)` — AI-generates a full phased campaign plan
- `getAllCampaigns()` — full list in reverse-chronological order
- `getCampaignById(id)` — single lookup by UUID
- `deleteCampaign(id)` — removes from in-memory array

### 6.6 Utilities — `src/utils/`

**`response.util.js`** — `sendSuccess()` and `sendError()` always produce the same envelope:

```json
{
  "success": true | false,
  "message": "Human readable message",
  "data": { ... },
  "timestamp": "ISO 8601 string"
}
```

The frontend API service can handle every response identically with no per-endpoint
special casing.

**`constants.js`** — All enum values (phishing categories, severity levels, attack vectors,
tone options) live in one exported object. Both routes and services import from here —
changing a value is a single-line edit with no risk of divergence.

---

## 7. Frontend Architecture

### 7.1 Entry Chain

```
index.html
  └── src/main.jsx
        └── src/App.jsx
              ThemeProvider
                └── BrowserRouter
                      └── Layout (Sidebar + TopBar)
                            └── Routes
                                  ├── /            → Dashboard
                                  ├── /generator   → Generator
                                  ├── /campaigns   → Campaigns
                                  └── /education   → Education
```

### 7.2 Theme System — `context/ThemeContext.jsx`

A React Context provides `{ theme, toggleTheme }` to the entire component tree. Toggle:
1. State flips between `'light'` and `'dark'`
2. `useEffect` adds/removes `.dark` on `document.documentElement`
3. Tailwind's `darkMode: 'class'` picks up the change across all components
4. CSS variables on `:root` and `.dark` resolve — all colours update in one paint
5. `localStorage` persists the preference across sessions and page reloads

No prop drilling. No unnecessary re-renders. No flash of wrong theme on load.

### 7.3 CSS Variable Token System — `index.css`

All palette values are CSS custom properties on `:root` (light) and `.dark` (dark).
Tailwind colour tokens reference these variables using `rgb(var(--color-*) / <alpha-value>)`,
which allows Tailwind's opacity modifiers (`/50`, `/10`, `/20`) to work correctly with
dynamic CSS variables.

```css
:root {
  --color-surface:         248 250 252;   /* page background */
  --color-surface-raised:  255 255 255;   /* cards */
  --color-brand:           37 99 235;     /* blue-600 */
  --color-tx-primary:      15 23 42;      /* main text */
  --color-tx-secondary:    71 85 105;     /* supporting text */
  --color-tx-muted:        148 163 184;   /* labels, captions */
}

.dark {
  --color-surface:         10 14 26;
  --color-surface-raised:  15 23 42;
  --color-brand:           59 130 246;    /* slightly lighter on dark bg */
  --color-tx-primary:      241 245 249;
  --color-tx-secondary:    148 163 184;
  --color-tx-muted:        71 85 105;
}
```

### 7.4 Responsive Layout — `components/layout/Layout.jsx`

| Breakpoint | Navigation |
|---|---|
| `< 1024px` mobile/tablet | Fixed bottom tab bar (4 icons) + hamburger slide-in drawer |
| `≥ 1024px` desktop | Fixed 264px left sidebar + sticky topbar with breadcrumb |

**Mobile Drawer** — slides in from left. Backdrop click closes it. Body scroll is locked
via `document.body.style.overflow = 'hidden'` while open, released on close.

**TopBar** — sticky, `backdrop-blur-md` so page content scrolls beneath it cleanly.
Shows breadcrumb icon + route label + description on desktop. Theme toggle always visible.

**Developer Footer** (sidebar bottom) — shows developer name, GitHub and LinkedIn as
labelled pill buttons, and both email addresses as plain clickable links.

### 7.5 Component Library — `components/ui/index.jsx`

| Component | Purpose |
|---|---|
| `Badge` | Status pill — 7 variants including all severity levels |
| `Button` | Action button — primary, secondary, ghost, danger + loading state |
| `Spinner` | Animated SVG — sm / md / lg sizes |
| `Card` | Surface container — standard + card-interactive (hover shadow) |
| `EmptyState` | Centred placeholder with icon, title, description, optional action |
| `SectionHeader` | Page title + subtitle + right-side action slot |
| `Tabs` | Horizontal tab bar built from a config array — supports icon + count badge |
| `SelectWrapper` | Wraps native `<select>` with a custom SVG chevron |
| `InfoRow` | Key/value pair row with bottom border divider |

### 7.6 Service Abstraction — `services/`

**`api.service.js`** — Single Axios instance:
- `baseURL: '/api'` in development (Vite proxies to localhost:5000)
- `baseURL: 'https://phishsim-backend-wzeo.onrender.com/api'` in production
- `timeout: 60000` — 60 seconds for AI generation
- Response interceptor normalises all responses — extracts `.data` on success,
  extracts `.message` from error bodies for clean toast notifications

**`phishing.service.js`** — Three service objects expose named async methods.
No page component calls `axios` directly. All API surface area is in one file.

---

## 8. AI Integration Layer

### 8.1 Provider Abstraction Diagram

```
Route Handler
     │
     ▼
Service (PhishingGeneratorService / CampaignService)
     │
     ▼
AIService.generateStructured(prompt)      ← provider-agnostic
     │
     ▼
GeminiProvider.generateJSON(prompt)       ← Gemini-specific SDK call
     │
     ▼
@google/generative-ai SDK
     │
     ▼
Google Gemini API (free tier)
```

To switch AI provider (e.g. to OpenAI):
1. Create `openai.provider.js` with identical `generate()` + `generateJSON()` methods
2. Change one import in `ai.service.js`
3. Zero changes to routes, services, or prompt templates

### 8.2 GeminiProvider — `services/ai/providers/gemini.provider.js`

Wraps the official `@google/generative-ai` SDK with two public methods:
- `generate(prompt)` — returns raw text string
- `generateJSON(prompt)` — appends JSON-only instruction, strips markdown fences,
  parses and returns the object. Throws if the response is not valid JSON.

Model configuration (temperature, topK, topP, maxOutputTokens) is set on construction.
The provider is a singleton — one SDK client per process lifetime.

### 8.3 Prompt Engineering — `services/ai/prompt.manager.js`

All AI prompts live in one module as named builder functions. Design decisions:

**System context block** — Every prompt opens with the same role-framing context that
establishes the model as a cybersecurity educator. This keeps every response in scope.

**Explicit JSON schema in prompt** — The expected output shape is written out in full
inside every prompt. This dramatically reduces hallucinated field names or missing keys.

**Fail-safe JSON parsing** — `generateJSON()` always strips code fences before parsing,
handles the common model behaviour of wrapping JSON in markdown blocks.

### 8.4 Prompt Templates

| Builder Function | Key Inputs | AI Output Fields |
|---|---|---|
| `buildPhishingEmailPrompt` | category, target, severity, impersonation, urgency, tone | subject, sender, body, redFlags, tacticsSummary, severityScore, manipulationTechniques |
| `buildExplanationPrompt` | emailSubject, category, tactics[] | overview, whyItWorks, realWorldExamples, protectionTips, industryContext, difficultyToDetect, affectedSectors |
| `buildCampaignPrompt` | campaignName, targetDepartment, attackVector, scope, industry, compliance, riskAppetite, duration, objectives, previousIncidents | campaignOverview, objectives, phases[], emailTemplates[], successMetrics[], riskLevel, estimatedClickRate, executiveSummary, kpis, reportingStructure |
| `buildVariationsPrompt` | baseCategory, count | Array of: title, description, impersonation, hook, difficulty, targetAudience |

---

## 9. API Reference

**Base URL (local):** `http://localhost:5000/api`
**Base URL (production):** `https://phishsim-backend-wzeo.onrender.com/api`

### System Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Liveness check — returns uptime, AI provider + model name |
| GET | `/meta` | All dropdown enum options for frontend forms |

### Phishing Simulation Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/phishing/generate` | — | Generate a phishing email simulation |
| POST | `/phishing/explain` | — | Generate educational explanation |
| GET | `/phishing/variations/:category` | — | AI scenario variations for a category |
| GET | `/phishing/history` | — | Last 50 simulations (in-memory) |
| GET | `/phishing/stats` | — | Aggregated counts by category + severity |

**POST /phishing/generate — Request Body**
```json
{
  "category": "Credential Harvesting",
  "target": "Finance Department",
  "severity": "high",
  "impersonation": "Microsoft",
  "urgency": 8,
  "tone": "urgent"
}
```

**POST /phishing/generate — Response (HTTP 201)**
```json
{
  "success": true,
  "message": "Phishing simulation generated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "params": { "category": "Credential Harvesting", "severity": "high" },
    "subject": "URGENT: Unusual sign-in activity detected on your account",
    "sender": {
      "name": "Microsoft Security Team",
      "email": "security-noreply@micros0ft-alerts.com"
    },
    "body": "Full HTML email body with [MALICIOUS_LINK] placeholders",
    "redFlags": [
      "Sender domain uses zero instead of letter O (micros0ft)",
      "Extreme urgency language to bypass critical thinking",
      "Generic greeting — does not use recipient's name",
      "Link destination does not match the display text"
    ],
    "tacticsSummary": "This simulation exploits authority bias by impersonating Microsoft...",
    "severityScore": 8,
    "manipulationTechniques": ["Fear appeal", "Authority impersonation", "Time pressure"]
  },
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

### Campaign Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/campaigns` | Create an AI-generated campaign plan |
| GET | `/campaigns` | Retrieve all campaigns |
| GET | `/campaigns/:id` | Retrieve one campaign by UUID |
| DELETE | `/campaigns/:id` | Delete a campaign |

**All responses follow the uniform envelope:** `{ success, message, data, timestamp }`

---

## 10. Data Flow & Workflows

### Email Generation

```
User configures 6 parameters in PhishingForm
         │
PhishingService.generateEmail(params)    [frontend service]
         │  POST https://phishsim-backend-wzeo.onrender.com/api/phishing/generate
         ▼
validateBody(['category','target','impersonation']) middleware
         │
PhishingGeneratorService.generateEmail() [backend service]
         │  PromptManager.buildPhishingEmailPrompt(params)
         ▼
AIService.generateStructured(prompt)
         │
GeminiProvider.generateJSON(prompt)      [strips fences, parses JSON]
         │
Google Gemini API → structured response
         │
Simulation object assembled (UUID + timestamp + AI fields)
Stored in in-memory history array (max 50, FIFO)
         │
HTTP 201 → axios interceptor strips envelope → simulation object
         │
Generator.jsx: setSimulation(data) → EmailPreview renders
Tabs available: Email Preview | Red Flags | Analysis
```

### Campaign Generation

```
User fills CampaignForm (name, dept, vector, scope, industry, etc.)
         │
CampaignService.createCampaign(params)   [frontend]
         │  POST /api/campaigns
         ▼
PromptManager.buildCampaignPrompt(params)
Rich prompt with industry + compliance context
         │
Gemini generates: overview, objectives, phases[], templates[], metrics, KPIs
         │
Campaign object with UUID stored in-memory
         │
CampaignCard rendered — collapsed by default
User clicks "View Details" → expands phases, templates, metrics
```

### Theme Toggle

```
User clicks sun/moon icon in TopBar
         │
ThemeContext.toggleTheme()
setTheme('light' | 'dark')
         │
useEffect → document.documentElement.classList.toggle('dark')
         │
Tailwind dark: variants recompute
CSS variables on .dark selector activate
All colours transition (0.2s ease on body)
         │
localStorage.setItem('phishsim-theme', theme) — persists across sessions
```

---

## 11. Design System

### Colour Palette

| Token | Light | Dark | Usage |
|---|---|---|---|
| `surface` | slate-50 | `#0a0e1a` | Page background |
| `surface-raised` | white | slate-900 | Cards, sidebar, modals |
| `surface-overlay` | slate-100 | `#162034` | Inputs, hover states |
| `surface-border` | slate-200 | slate-800 | All dividers and borders |
| `brand` | blue-600 | blue-500 | CTAs, active nav, focus rings |
| `tx-primary` | slate-900 | slate-100 | Primary readable text |
| `tx-secondary` | slate-600 | slate-400 | Supporting body text |
| `tx-muted` | slate-400 | slate-600 | Labels, placeholders, captions |
| `severity-low` | green-600 | green-600 | Low risk indicator |
| `severity-medium` | amber-600 | amber-600 | Medium risk indicator |
| `severity-high` | orange-600 | orange-600 | High risk indicator |
| `severity-critical` | red-600 | red-600 | Critical risk indicator |

Severity colours are fixed (same in both themes) — colour-blind safe at these saturation levels.

### Component Class Reference

```
.btn-primary        Blue filled — primary actions
.btn-secondary      Outlined — secondary actions
.btn-ghost          Transparent — low-emphasis actions
.btn-danger         Red-tinted — destructive actions
.input-field        Text input with brand focus ring
.select-field       Native select with custom chevron
.card               Surface-raised, border, shadow
.card-interactive   card + hover shadow + hover border tint
.nav-link           Sidebar navigation item
.nav-link.active    Brand-tinted active state
.tab-btn            Horizontal tab button
.tab-btn.active     Active tab with brand background tint
.label              Form field label (uppercase, tracked, muted)
.section-title      2xl bold page heading
.divider            Border-top separator
```

---

## 12. Engineering Principles Applied

### SOLID

| Principle | Implementation |
|---|---|
| Single Responsibility | Routes delegate, services orchestrate, providers communicate, utils compute |
| Open/Closed | New AI providers extend without modifying `AIService` or consumers |
| Liskov Substitution | `GeminiProvider` is replaceable with any provider exposing the same interface |
| Interface Segregation | `AIService` exposes only `generateText` + `generateStructured` — no provider leakage |
| Dependency Inversion | Services depend on `AIService` abstraction, not `GeminiProvider` directly |

### DRY

- All prompt strings in `PromptManager` — one location, auditable, no duplication in routes
- All API responses via `sendSuccess()` / `sendError()` — uniform shape, no inline `res.json`
- All enum values in one `constants.js` shared across backend modules
- All Tailwind component classes in `index.css` — one definition, used everywhere as class names

### Fail-Fast

`validateConfig()` runs before the HTTP server binds. Missing `GOOGLE_API_KEY` = immediate
crash with a clear message. No silent partial startup.

### Separation of Concerns

```
Routes      → HTTP parsing, validation, delegation only
Services    → Business logic, state, orchestration
Providers   → External API communication
Prompts     → AI prompt construction
Pages       → Layout, state management, user orchestration
Components  → Pure presentation, receive data as props
Services    → Frontend API abstraction (no axios in pages)
Utils       → Pure functions, no side effects
```

---

## 13. Local Setup & Installation

> The app is already deployed at https://fish-sail.onrender.com — local setup is only
> needed if you want to run it yourself or contribute to development.

### Prerequisites

- Node.js v18 or higher
- npm v8+ (bundled with Node 18)
- Google Gemini API Key (free at https://aistudio.google.com)

### One-Click Setup

**Windows:**
```bat
setup.bat
```

**Mac / Linux:**
```bash
chmod +x setup.sh && ./setup.sh
```

### Manual Setup

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env: add your GOOGLE_API_KEY
npm install

# Frontend (new terminal)
cd frontend
npm install
```

---

## 14. Environment Configuration

### Local Development (`backend/.env`)

```env
PORT=5000
NODE_ENV=development
GOOGLE_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.0-flash-exp
FRONTEND_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Render Production (set in Render dashboard — Environment tab)

```env
NODE_ENV=production
GOOGLE_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.0-flash-exp
FRONTEND_URL=https://fish-sail.onrender.com
```

`PORT` is automatically injected by Render — do not set it manually.

### Getting a Gemini API Key

1. Go to https://aistudio.google.com
2. Sign in with a Google account
3. Click **Get API Key** → **Create API key**
4. Copy the key into your `.env` or Render environment

**Supported model values:**
- `gemini-2.0-flash-exp` — fastest, recommended for free tier
- `gemini-1.5-flash` — reliable, good free quota
- `gemini-1.5-pro` — most capable, lower free quota

---

## 15. Running Locally

Two terminals required:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Running: http://localhost:5000
# Logs: Morgan dev-format per request
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# Running: http://localhost:5173
# Vite proxies /api/* → http://localhost:5000
```

Open `http://localhost:5173`.

### Build for Production

```bash
cd frontend && npm run build
# Outputs to frontend/dist/
# Deploy dist/ as a static site
# Point FRONTEND_URL to your deployed domain
```

---

## 16. Feature Walkthrough

### Dashboard (`/`)

- **4-column stats grid** — simulations generated, campaigns created, critical-severity count,
  unique categories used. All loaded in parallel via `Promise.all`.
- **Recent simulations feed** — last 5 results with subject, sender email, severity badge,
  category, and timestamp.
- **Quick action shortcuts** — direct navigation cards to Generator, Campaigns, Education Hub.
- **Category breakdown** — CSS-only bar chart showing simulation distribution by category,
  proportional widths calculated from live stats.

### Email Generator (`/generator`)

**Form parameters:**

| Field | Options |
|---|---|
| Phishing Category | 10 options — credential harvesting, BEC, invoice scam, delivery alert, etc. |
| Target Scenario | 8 options — corporate employee, C-suite, IT admin, HR, new hire, etc. |
| Impersonation Type | 9 options — Microsoft, Google, CEO, bank, courier, government, etc. |
| Severity Level | low / medium / high / critical |
| Communication Tone | professional / urgent / friendly / authoritative / casual / threatening |
| Urgency Level | 1–10 slider |

**Output — 3 tabs:**

*Email Preview* — email client chrome (traffic light dots, address bar, copy button),
sender metadata with spoofed sender warning badge, scrollable body with malicious link
placeholders highlighted in blue.

*Red Flags* — numbered detection indicator cards. Each flag is a specific observable signal
users should be trained to recognise.

*Analysis* — tactics summary paragraph, social engineering technique badges, parameter
recap grid showing exactly what configuration produced this simulation.

**Educational Explanation** — secondary button triggers a second AI call producing:
psychological explanation, protection tips, affected sectors, difficulty rating.

### Campaigns (`/campaigns`)

**Form parameters:**

| Field | Purpose |
|---|---|
| Campaign Name | Identifies the drill |
| Target Department | 8 departments |
| Attack Vector | Email / Spear / Whaling / Smishing / Vishing / Clone |
| Employee Scope | 10–500 slider |
| Industry | Sector for contextual AI generation |
| Compliance Framework | ISO 27001, SOC 2, PCI DSS, HIPAA, GDPR, NIST |
| Risk Appetite | Low / Medium / High |
| Campaign Duration | 1–8 weeks |
| Objectives | Multi-select |
| Previous Incidents | Free text for AI context |

**AI output (expandable card):**
Campaign overview, objectives list, phased timeline with duration and actions per phase,
email template recommendations with difficulty ratings, success metrics, KPIs, estimated
click rate, executive summary.

### Education Hub (`/education`)

**Knowledge Base** — 10 attack type accordion cards:
- Detailed description of how the attack works
- Observable detection indicators
- Real-world example attack patterns
- Attacker profile (nation-state, criminal, insider)
- Industries most targeted
- Recommended countermeasures

**AI Scenario Explorer** — select any category, generate AI-written variations showing
different impersonation angles, hooks, target audiences, and difficulty ratings.

**Protection Framework** — 6 core security rules as a numbered reference card.

---

## 17. Security & Ethical Considerations

### What PhishSim Does

Generates fictional phishing content for:
- Security awareness education and training
- Portfolio demonstration of AI + full-stack engineering
- Controlled internal security drills

### What PhishSim Does Not Do

- Does not send any emails
- Does not host phishing pages
- Does not include working malicious URLs — all links are `[MALICIOUS_LINK]` placeholders
- Does not store data in a database or transmit it to third parties beyond the Gemini API

### Application Security

- **Helmet.js** sets production-grade HTTP security headers on every response
- **CORS** is restricted to the deployed frontend origin only
- **Rate limiting** prevents AI quota exhaustion from repeated requests
- **10KB body limit** prevents payload attacks
- **Input validation middleware** rejects malformed requests before service execution
- **Error handler** never exposes stack traces in production (`NODE_ENV=production`)

### Responsible Use

This platform should only be used with explicit authorisation from all organisations and
individuals involved. Unauthorised phishing simulation against individuals without consent
is unethical and illegal in most jurisdictions.

---

## 18. Known Limitations & Future Scope

### Current Limitations

| Limitation | Reason | Notes |
|---|---|---|
| In-memory storage only | No database, zero cost | Restarting the backend clears history |
| Render cold starts | Free tier spins down after 15 min idle | First request takes 30–60s |
| No authentication | Out of scope for v1 | Rate limiting provides basic protection |
| Single AI provider | Gemini only | Provider abstraction makes swapping trivial |
| No email sending | Intentional — ethical scope | Not a feature gap |

### Roadmap

**Phase 1 — Persistence**
SQLite via `better-sqlite3` — persistent history and campaigns with zero hosting cost.

**Phase 2 — Multi-provider AI**
OpenAI and Anthropic providers with environment-variable-based selection.

**Phase 3 — Analytics**
Time-series simulation charts, department vulnerability scoring, exportable reports.

**Phase 4 — Authentication**
JWT user accounts, team workspaces, campaign sharing by link.

**Phase 5 — Template Library**
Saved simulation templates, community sharing, import/export phishing template packs.

---

## Developer

**Areeb Syed**

| | |
|---|---|
| GitHub | https://github.com/areebsyed |
| LinkedIn | https://linkedin.com/in/areebsyed |
| Email | areeb.syed1@outlook.com |
| Email | 4reeb.5yed@gmail.com |

---

**Live:** https://fish-sail.onrender.com

*All simulations are fictional. No real phishing attacks are facilitated by this platform.*
