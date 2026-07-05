# 🚀 Bluprnt

**Bluprnt** is an AI-powered project planning platform that transforms project descriptions into interactive, visual roadmaps. Using the Gemini API and React Flow, it generates structured JSON roadmaps to help developers visualize their path from idea to execution.

Visit the live app: [🔹BluPrnt🔹](bluprnt.tabishcodes.site/)

---

## 🏗️ System Architecture

A high-level overview of how the components interact across the stack.

```mermaid
graph TD
    subgraph Client [Frontend - React/Vite]
        UI[User Interface]
        RF[React Flow Renderer]
    end

    subgraph Server [Backend - Node.js/Express]
        API[Express API]v
        RMQ[RabbitMQ Queue]
        Worker[Roadmap Worker]
    end

    subgraph External [External Services & Storage]
        G[Gemini AI API]
        DB[(PostgreSQL / Supabase)]
    end

    %% Logical Flow
    UI -- "1. Submit Project" --> API
    API -- "2. Create Pending" --> DB
    API -- "3. Push Task" --> RMQ
    RMQ -- "4. Pull Task" --> Worker
    Worker -- "5. Gen Roadmap" --> G
    G -- "6. JSON Result" --> Worker
    Worker -- "7. Update DB" --> DB
    UI -- "8. Poll/Fetch" --> API
    API -- "9. Fetch Result" --> DB
    API -- "10. Deliver JSON" --> UI
    UI -- "11. Render" --> RF
```

---

## 🔄 Process Flow

Detailed step-by-step logic of the roadmap generation lifecycle.

```mermaid
sequenceDiagram
    autonumber
    participant UI as Frontend (UI)
    participant API as Express API
    participant DB as PostgreSQL
    participant MQ as RabbitMQ
    participant W as Roadmap Worker
    participant G as Gemini AI

    Note over UI, G: Phase 1: Submission
    UI->>API: Submit Project Description
    API->>DB: Save Project as 'PENDING'
    API->>MQ: Add Generation Task to Queue
    API-->>UI: Acknowledge (Return Project ID)

    Note over UI, G: Phase 2: Background Generation
    MQ->>W: Pull Task from Queue
    W->>G: Request AI Roadmap Generation
    G-->>W: Return Structured JSON
    W->>DB: Save Roadmap & Mark as 'COMPLETED'

    Note over UI, G: Phase 3: Retrieval & Rendering
    UI->>API: Poll Project Status (by ID)
    API->>DB: Fetch Project Data
    DB-->>API: Return Result
    API-->>UI: Deliver Roadmap JSON
    UI->>UI: Render via React Flow
```

---

## ✨ Features

- ⚙️ **AI Roadmap Generation**: Converts text descriptions into structured roadmaps.
- 🧩 **Interactive Flowcharts**: Visualized using React Flow for easy navigation.
- 📚 **Learning Resources**: Curated materials and code snippets for every node.
- 🚀 **Scalable Worker Architecture**: Uses RabbitMQ for efficient background processing.

---

## 🛠️ Technical Stack

- **Frontend**: React.js, Tailwind CSS, React Flow, Vite.
- **Backend**: Node.js, Express.js, RabbitMQ.
- **Database**: PostgreSQL (Supabase & Drizzle ORM).
- **AI Engine**: Google Gemini API.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL (Supabase)
- RabbitMQ

### 2. Installation
```bash
git clone git@github.com:m-tabish/Heckers_AMUHACKS4.0.git
cd bluprnt

# Backend Setup
cd backend && npm install

# Frontend Setup
cd ../client && npm install
```

### 3. Environment Setup

#### Backend Setup
Create a `.env` file in `backend/` (see `backend/.env.example` for reference):
```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
GEMINI_API_KEY=your_gemini_api_key
RABBITMQ_URL=your_rabbitmq_url
JWT_SECRET=your_jwt_secret
GITHUB_API_TOKEN=your_github_personal_access_token
```

#### Client Setup
Create a `.env` file in `client/` (see `client/.env.example` for reference):
```env
VITE_SERVER_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### 4. Running the App

Start a RabbitMQ instance (e.g., using Docker):
```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

Start the application services:
```bash
# Terminal 1: Start Backend (in backend/)
npm run dev

# Terminal 2: Start Worker (in backend/)
node workers/roadmap.worker.js

# Terminal 3: Start Frontend (in client/)
npm run dev
```

---

## 📧 Contact
Mohd Tabish Khan - [mohdtabishkhan001@gmail.com](mailto:mohdtabishkhan001@gmail.com)
