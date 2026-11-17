# Nikhil Singh Subhash — Personal Developer Portfolio & Platform

> **Full Stack Developer | Cloud & DevOps Engineer**  
> Modern, production-ready developer portfolio and cloud telemetry architecture with Dockerized MySQL persistence, multi-stage container builds, and root Docker Compose orchestration.

---

## 🏛️ Architecture Overview

The system is architected as a decoupled, high-performance web platform split into a low-latency edge frontend, a hardened Node.js backend API, and a persistent Dockerized MySQL 8 database:

```text
                                [ User Web Browser ]
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   │                                           │
          Port 5173 / 80 (HTTPS/HTTP)                  Port 5000 (REST API)
                   │                                           │
                   ▼                                           ▼
       ┌───────────────────────┐                   ┌───────────────────────┐
       │   Frontend Container  │                   │   Backend API Container│
       │   (portfolio-frontend)│                   │   (portfolio-api)     │
       │                       │                   │                       │
       │  - React 19 + Vite    │                   │ ┌───────────────────┐ │
       │  - Tailwind CSS       │                   │ │ Node.js 20 Express│ │
       │  - Framer Motion      │                   │ │ - /api/health     │ │
       │  - Multi-Page SPA     │                   │ │ - /api/contact    │ │
       │  - NGINX Alpine       │                   │ │ - Helmet & CORS   │ │
       │  - Gzip Compression   │                   │ │ - IP Rate Limiter │ │
       │                       │                   │ └─────────┬─────────┘ │
       └───────────────────────┘                               │
                                                   ┌───────────┴───────────┐
                                                   │                       │
                                                   ▼                       ▼
                                        ┌─────────────────────┐ ┌─────────────────────┐
                                        │ Docker MySQL 8 DB   │ │ Nodemailer SMTP &   │
                                        │ (portfolio-mysql)   │ │ Local JSONL Audit   │
                                        │ - port 3307:3306    │ │ Fail-safe Backup    │
                                        │ - contacts table    │ └─────────────────────┘
                                        └─────────────────────┘
```

---

## 📁 Repository Structure

```text
protfolio/
├── docker-compose.yml              # MASTER ROOT ORCHESTRATION (MySQL 8 + Backend API + Frontend)
├── .env.example                    # Full-stack environment template
├── README.md                       # Comprehensive system & deployment documentation
│
├── frontend/                       # Client Single Page Application (React 19 + TypeScript)
│   ├── Dockerfile                  # Multi-stage production build (Node 20 builder -> Nginx runner)
│   ├── nginx.conf                  # Nginx SPA fallback routing, reverse proxy & gzip compression
│   ├── public/                     # Static assets (profile.jpg, Resume.pdf, official tool SVGs)
│   ├── src/
│   │   ├── pages/                  # 7 Multi-Page Routed Views
│   │   │   ├── HomePage.tsx        # Split dual-tone hero with paper roll-up & telemetry
│   │   │   ├── ProjectsPage.tsx    # Filterable 9+ engineering projects grid
│   │   │   ├── CloudPage.tsx       # Live Cloud & DevOps architecture dashboard
│   │   │   ├── SkillsPage.tsx      # Categorized technical toolkit & proficiency meters
│   │   │   ├── ExperiencePage.tsx  # Career timeline & academic credentials
│   │   │   ├── AboutPage.tsx       # Deep engineering philosophy & biography
│   │   │   └── ContactPage.tsx     # Contact form with live MySQL submission
│   │   ├── components/
│   │   │   ├── ui/                 # Reusable atomic visual components
│   │   │   │   ├── DevOpsPipelineArtwork.tsx  # 5-stage laser CI/CD pipeline visual
│   │   │   │   ├── Tilt3D.tsx                 # Mouse-reactive 3D perspective wrapper
│   │   │   │   ├── CinematicPreloader.tsx     # Calm luxury preloader sequence
│   │   │   │   ├── HeroParticleCanvas.tsx     # Subtle floating canvas background particles
│   │   │   │   ├── LiveTelemetryTicker.tsx    # Marquee banner with real system specs
│   │   │   │   ├── ProjectCard.tsx            # Project card with tag pills and links
│   │   │   │   └── ProjectModal.tsx           # Deep architectural challenge modal
│   │   │   └── sections/           # Navigation & Footer global chrome
│   │   ├── data/
│   │   │   └── portfolioData.ts    # Single source of truth for all projects and experience
│   │   ├── types/
│   │   │   └── index.ts            # Core TypeScript interfaces
│   │   ├── App.tsx                 # Router wrapper and layout shell
│   │   └── index.css               # Design tokens & aesthetic palette variables
│   ├── package.json
│   ├── tailwind.config.js          # Palette: Cognac, Ochre, Dusty Rose, Mulberry
│   └── vite.config.ts
│
├── backend/                        # Node.js Express REST API
│   ├── Dockerfile                  # Multi-stage container build with unprivileged appuser
│   ├── docker-compose.yml          # Isolated backend + DB compose file
│   ├── database/
│   │   └── init.sql                # MySQL automatic schema initialization script
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # MySQL2 connection pool with automatic table verification
│   │   ├── middleware/
│   │   │   ├── errorHandler.js     # Centralized HTTP error handler
│   │   │   └── rateLimiter.js      # Security: 5 requests / 15 mins per IP
│   │   ├── routes/
│   │   │   ├── contact.js          # POST /api/contact with DB persistence & email trigger
│   │   │   └── health.js           # GET /api/health returning DB latency & memory metrics
│   │   ├── services/
│   │   │   ├── auditService.js     # Persistent JSONL fail-safe audit logger
│   │   │   └── mailService.js      # Nodemailer transactional email dispatcher
│   │   └── index.js                # Express server entrypoint
│   ├── data/                       # Mount directory for JSONL contact audit backups
│   ├── package.json
│   └── .env.example
```

---

## 🚀 Quick Start (Root Docker Compose)

### 1. Launch the Entire Full Stack (One Command)

From the project **root** directory:

```bash
# Copy environment configuration
cp .env.example .env

# Build and start all 3 services in detached mode
docker compose up -d --build
```

This starts:
- **MySQL 8 (`portfolio-mysql`)**: Port `3307` mapped to `3306`, initialized with `init.sql`.
- **Backend API (`portfolio-api`)**: Port `5000`, connected to MySQL over `portfolio-network`.
- **Frontend (`portfolio-frontend`)**: Port `5173` (NGINX), serving the compiled React 19 SPA.

### 2. Verify Services

```bash
# Check container status & healthchecks
docker compose ps

# Check backend health diagnostic
curl http://localhost:5000/api/health

# Open in browser
http://localhost:5173
```

---

## 🌐 Production Deployment Guide

### Strategy A: Single VPS / Cloud Instance (Docker Compose)

Deploying to **AWS EC2 (Ubuntu 24.04)**, **DigitalOcean Droplet**, or **Hetzner**:

1. **Clone repository on the server**:
   ```bash
   git clone https://github.com/nikhil-1-2-3/portfolio.git /var/www/portfolio
   cd /var/www/portfolio
   ```
2. **Configure Environment**:
   ```bash
   cp .env.example .env
   nano .env
   ```
   Set `FRONTEND_PORT=80` and your production domain in `CORS_ORIGIN`.

3. **Start Production Stack**:
   ```bash
   docker compose up -d --build
   ```

4. **SSL / HTTPS (Certbot)**:
   Point your domain DNS (A record) to your server IP and run:
   ```bash
   sudo certbot --nginx -d nikhilsingh.dev
   ```

---

### Strategy B: Hybrid Cloud (Vercel Frontend + Docker Backend)

1. **Frontend on Vercel**:
   - Push repository to GitHub.
   - Import project in Vercel:
     - Root Directory: `frontend`
     - Framework Preset: `Vite`
     - Output Directory: `dist`
   - Set environment variable: `VITE_API_BASE_URL=https://api.yourdomain.com`

2. **Backend & MySQL on AWS EC2 / Render / Railway**:
   - Run root `docker compose up -d mysql backend` or use `backend/docker-compose.yml`.
   - Update `CORS_ORIGIN` in backend `.env` with your Vercel URL.
