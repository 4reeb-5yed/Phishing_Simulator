# PhishSim — AI-Powered Phishing Simulation Platform

> A production-style cybersecurity awareness training platform powered by Google Gemini AI.


---

## Architecture Overview

```
phishing-simulator/
├── backend/                    # Node.js + Express API
│   └── src/
│       ├── config/             # Centralized env + config management
│       ├── services/
│       │   ├── ai/             # AI abstraction layer
│       │   │   ├── providers/  # Gemini provider (swappable)
│       │   │   ├── ai.service.js        # Provider-agnostic AI interface
│       │   │   └── prompt.manager.js    # All prompt templates
│       │   └── phishing/       # Domain services
│       │       ├── phishing.generator.service.js
│       │       └── campaign.service.js
│       ├── routes/             # Express route handlers (thin controllers)
│       ├── middleware/         # Error handling, validation
│       └── utils/              # Shared utilities + constants
│
├── frontend/                   # React + Vite + Tailwind
│   └── src/
│       ├── components/
│       │   ├── ui/             # Reusable design system components
│       │   ├── layout/         # Sidebar, Layout wrapper
│       │   ├── phishing/       # Email preview, severity, form
│       │   ├── campaign/       # Campaign cards
│       │   └── dashboard/      # Stats cards
│       ├── pages/              # Dashboard, Generator, Campaigns, Education
│       ├── services/           # Axios API abstraction layer
│       └── utils/              # Constants, helpers
│
├── setup.bat                   # Windows setup script
└── setup.sh                    # Unix/Mac setup script
```

---

## Tech Stack (100% Free)

| Layer        | Technology               |
|-------------|--------------------------|
| AI Provider  | Google Gemini (free tier)|
| Backend      | Node.js + Express.js     |
| Frontend     | React + Vite             |
| Styling      | Tailwind CSS             |
| HTTP Client  | Axios                    |
| Routing      | React Router v6          |
| Toasts       | react-hot-toast          |
| Icons        | Lucide React             |

---

## Setup

### Prerequisites
- Node.js v18+
- Google Gemini API key (free at https://aistudio.google.com/)

### Quick Start

**Windows:**
```bat
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh && ./setup.sh
```

### Manual Setup
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env: add GOOGLE_API_KEY and GEMINI_MODEL
npm install
npm run dev   # Starts on port 5000

# Frontend (new terminal)
cd frontend
npm install
npm run dev   # Starts on port 5173
```

### Environment Variables (backend/.env)
```env
GOOGLE_API_KEY=your_google_api_key_here
GEMINI_MODEL=gemini-2.0-flash-exp
PORT=5000
FRONTEND_URL=http://localhost:5173
```

---

## Key Engineering Decisions

### AI Provider Abstraction
The `GeminiProvider` class is injected into `AIService`, making it trivial to swap for OpenAI, Anthropic, or any other LLM. Zero changes needed in routes or services.

### Prompt Engineering as a Module
All prompts live in `PromptManager` — a single source of truth. Editing a prompt doesn't require touching route logic.

### Service Layer Pattern
Routes are thin controllers. All business logic lives in service classes with private fields (`#`) for encapsulation.

### In-Memory Storage
No database required for zero-cost deployment. The services maintain state in private arrays. Easily extendable to SQLite, MongoDB, or PostgreSQL.

---

## Features

- **AI Email Generator** — Generate realistic phishing simulations by category, severity, impersonation type, tone, and urgency
- **Educational Explanation** — AI-powered analysis of tactics, psychology, and protection tips
- **Campaign Simulator** — Design multi-phase phishing campaigns for departments
- **Education Hub** — Attack type knowledge base + scenario variation explorer
- **Dashboard** — Stats, history, category breakdown

---

## Disclaimer

> This platform is built **exclusively for authorized cybersecurity awareness training**.
> All generated emails are fictional simulations for educational purposes only.
> Never use for actual phishing attacks. Always obtain proper authorization before conducting security awareness training.
