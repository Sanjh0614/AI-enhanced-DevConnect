# DevConnect — AI-Powered Developer Intelligence Platform

**Understand your developer journey. Discover your strengths. Build what comes next.**

DevConnect is an AI-powered developer intelligence platform designed to help developers understand, evaluate, and improve their technical skills through evidence collected from their GitHub repositories.

Instead of simply displaying GitHub statistics, DevConnect aims to analyze actual project information, identify demonstrated technical skills, provide role-readiness insights, and track developer growth over time.

---

## 🎯 Problem Statement

Developers often struggle to understand how their GitHub projects translate into real technical skills and career readiness.

Traditional developer profiles focus on repository counts, stars, and programming languages without providing meaningful insights into demonstrated abilities.

DevConnect aims to bridge this gap by transforming GitHub repository data into structured, evidence-based developer intelligence.

## ✨ Core Features

### 1. AI Developer Agent
- Interact with an AI assistant about your developer profile.
- Retrieve information grounded in GitHub repository evidence.
- Understand technologies, frameworks, and project experience.
- Receive contextual explanations and recommendations.

### 2. Role Readiness Engine
- Evaluate technical evidence against a selected career role.
- Identify demonstrated and partially demonstrated skills.
- Highlight areas where additional evidence or learning is needed.
- Generate actionable improvement recommendations.

### 3. Growth Tracker
- Maintain historical developer analysis snapshots.
- Compare changes in demonstrated technical skills.
- Track newly acquired project experience.
- Monitor progress through evidence-backed insights.

### 4. GitHub Integration
- Connect developer profiles through GitHub usernames.
- Fetch public GitHub repositories.
- Retrieve repository metadata and README content.
- Store repository information for subsequent analysis.

## 🏗️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| Authentication | Supabase Auth |
| Database Platform | Supabase |
| ORM / SQL | SQLAlchemy |
| API Integration | GitHub REST API, HTTPX |
| UI & Animation | Motion, Lenis |
| Version Control | Git, GitHub |

## ⚙️ Project Architecture

```text
DevConnect/
│
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   └── auth.py
│   │   ├── services/
│   │   │   ├── github_service.py
│   │   │   └── repository_service.py
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   └── App.tsx
│   │
│   ├── .env.local
│   └── package.json
│
└── README.md
```

## 🔄 How It Works

1. A developer creates an account and authenticates through Supabase.
2. DevConnect verifies the user's session with its FastAPI backend.
3. The backend retrieves the developer's GitHub username.
4. Public GitHub repositories are fetched through the GitHub REST API.
5. Repository metadata and available README content are stored in PostgreSQL.
6. The stored information forms the foundation for subsequent repository intelligence and AI-powered analysis.

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js and npm
- Git
- A Supabase project
- A GitHub account

### 1. Clone the repository

```bash
git clone https://github.com/Sanjh0614/AI-enhanced-DevConnect.git

cd AI-enhanced-DevConnect
```

### 2. Backend setup

```bash
cd backend

python -m venv .venv
```

Activate the virtual environment.

**Windows:**

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the backend directory and configure the required database and Supabase settings.

Start the backend:

```bash
uvicorn app.main:app --reload
```

Backend URL:

`http://127.0.0.1:8000`

API documentation:

`http://127.0.0.1:8000/docs`

### 3. Frontend setup

Open another terminal:

```bash
cd frontend

npm install
```

Create `frontend/.env.local` and configure:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Start the frontend:

```bash
npm run dev
```

Frontend URL:

`http://localhost:5173`

### 4. Database configuration

Configure your Supabase PostgreSQL database and required application tables before running the application.

Never commit `.env` or `.env.local` files, database credentials, or authentication secrets to GitHub.

## 📡 Current Backend API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Backend root |
| GET | `/health` | Health check |
| GET | `/me` | Verify authenticated user |
| POST | `/github/sync` | Synchronize GitHub repositories and available READMEs |

## 🛣️ Development Roadmap

- [x] Supabase authentication
- [x] FastAPI backend setup
- [x] PostgreSQL database integration
- [x] GitHub public repository synchronization
- [x] Repository metadata storage
- [x] README extraction and storage
- [ ] Repository intelligence and skill extraction
- [ ] Evidence-grounded AI Developer Agent
- [ ] Role Readiness Engine
- [ ] Developer Growth Tracker
- [ ] Historical analysis comparison
- [ ] Deployment and production testing

## 🔒 Security

- Supabase-based user authentication.
- JWT verification in the backend.
- Environment-based configuration for sensitive credentials.
- Parameterized database queries.
- User-scoped repository operations.

## 🎯 Vision

DevConnect aims to evolve from a traditional developer portfolio into an intelligent platform that helps developers understand what they have built, what they can demonstrate, and what they should improve next.

**Analyze → Understand → Improve → Re-analyze**

---

*DevConnect — Turning GitHub activity into meaningful developer intelligence.*
