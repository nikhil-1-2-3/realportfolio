# Nikhil Singh Subhash — Personal Developer Portfolio & Platform

> **Full Stack Developer | Cloud & DevOps Engineer**  
> Modern, production-ready developer portfolio and cloud telemetry architecture with Dockerized MySQL persistence.

---

## 🏛️ Architecture Overview

The system is architected as a decoupled, high-performance web platform split into a low-latency edge frontend and a hardened backend API with persistent Dockerized MySQL storage:

```text
                                [ User Web Browser ]
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   │                                           │
          HTTPS / Static Delivery                     HTTPS REST API Calls
                   │                                           │
                   ▼                                           ▼
       ┌───────────────────────┐                   ┌───────────────────────┐
       │     Vercel Edge       │                   │    AWS EC2 Instance   │
       │  (Frontend Single     │                   │   (Ubuntu 24.04 LTS)  │
       │   Page Application)   │                   │                       │
       │                       │                   │ ┌───────────────────┐ │
       │  - React 18           │                   │ │   NGINX (SSL/443) │ │
       │  - TypeScript         │                   │ └─────────┬─────────┘ │
       │  - Tailwind CSS       │                               │ Reverse Proxy
       │  - Lucide Icons       │                               ▼
       │  - Responsive Layout  │                   │ ┌───────────────────┐ │
       │  - SEO & Meta Ready   │                   │ │ Node.js Express   │ │
       │                       │                   │ │ - /api/health     │ │
       │                       │                   │ │ - /api/contact    │ │
       │                       │                   │ │ - Helmet & CORS   │ │
       │                       │                   │ │ - Rate Limiter    │ │
       │                       │                   │ │ - PM2 Daemon      │ │
       │                       │                   │ └─────────┬─────────┘ │
       │                       │                               │
       │                       │                   ┌───────────┴───────────┐
       │                       │                   │                       │
       │                       │                   ▼                       ▼
       │                       │        ┌─────────────────────┐ ┌─────────────────────┐
       │                       │        │ Docker MySQL 8 DB   │ │ Nodemailer SMTP &   │
       │                       │        │ (portfolio_db)      │ │ Local Audit Log     │
       │                       │        │ - contacts table    │ │ (Fail-safe Backup)  │
       │                       │        └─────────────────────┘ └─────────────────────┘
       └───────────────────────┘                   └───────────────────────┘
```

---

## 📁 Repository Structure

```text
protfolio/
├── frontend/                       # Client Single Page Application
│   ├── public/                     # Static assets (Resume.pdf, profile.jpg, SVGs, robots.txt, sitemap.xml)
│   ├── src/
│   │   ├── components/
│   │   │   ├── sections/           # 6 Primary Portfolio Sections
│   │   │   │   ├── Navigation.tsx  # Sticky header with active scroll spy & resume link
│   │   │   │   ├── HeroSection.tsx # Section 1: Home / Hero
│   │   │   │   ├── AboutSection.tsx# Section 2: About Me ("The Person Behind the Work")
│   │   │   │   ├── SkillsSection.tsx# Section 3: Skills & Technologies ("My Technical Toolkit")
│   │   │   │   ├── ProjectsSection.tsx# Section 4: Projects ("Things I've Built. Problems I've Solved.")
│   │   │   │   ├── ExperienceSection.tsx# Section 5: Experience & Education Timeline
│   │   │   │   ├── ContactSection.tsx# Section 6: Functional Contact Form
│   │   │   │   └── Footer.tsx      # Footer with local IST time & status
│   │   │   └── ui/                 # Reusable atomic UI components
│   │   │       ├── Button.tsx
│   │   │       ├── SectionHeader.tsx
│   │   │       ├── ProjectCard.tsx
│   │   │       ├── ProjectModal.tsx# Expandable architectural deep-dive dialog
│   │   │       ├── SkillCategoryCard.tsx
│   │   │       └── TimelineItem.tsx
│   │   ├── data/
│   │   │   └── portfolioData.ts    # Single source of truth for projects, skills & journey
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript interfaces
│   │   ├── App.tsx                 # Root layout & scroll manager
│   │   ├── index.css               # Tailwind directives & design tokens
│   │   └── main.tsx                # React DOM entrypoint
│   ├── index.html                  # HTML5 shell with Open Graph tags
│   ├── package.json                # React 18, Vite, Tailwind, Lucide dependencies
│   ├── tailwind.config.js          # Design system theme configuration
│   ├── vercel.json                 # Vercel deployment rewrites & security headers
│   └── vite.config.ts              # Vite bundler config
│
├── backend/                        # REST API Backend for AWS EC2
│   ├── database/
│   │   └── init.sql                # MySQL automatic table schema initialization
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # MySQL2 connection pool & auto-migrations
│   │   ├── middleware/
│   │   │   ├── errorHandler.js     # Centralized error handler
│   │   │   └── rateLimiter.js      # Rate limiting (5 requests/15 mins per IP)
│   │   ├── routes/
│   │   │   ├── contact.js          # POST /api/contact handler with validation & MySQL persistence
│   │   │   └── health.js           # GET /api/health target group diagnostic with DB health
│   │   ├── services/
│   │   │   ├── auditService.js     # Persistent JSONL / SQLite audit logger
│   │   │   └── mailService.js      # Nodemailer transactional email dispatcher
│   │   └── index.js                # Express app entry point
│   ├── Dockerfile                  # Multi-stage container build
│   ├── docker-compose.yml          # Container orchestration (MySQL 8 + Portfolio API)
│   ├── ecosystem.config.cjs        # PM2 process file for AWS EC2 clustering
│   ├── nginx.conf                  # NGINX reverse proxy & SSL template
│   ├── package.json                # Express, MySQL2, Helmet, CORS, Nodemailer
│   └── .env.example                # Environment variables template
│
└── README.md                       # Complete project documentation
```

---

## 🚀 Quick Start (Local Development)

### Option A: Running with Docker Compose (Recommended)

Starts both **MySQL 8** and the **Portfolio REST API** in isolated containers:

```bash
cd backend
docker compose up -d --build
```

- MySQL will be accessible at port `3307` on the host (`portfolio_db`).
- Backend REST API will be accessible at `http://localhost:5000`.

Check health:
```bash
curl http://localhost:5000/api/health
```

---

### Option B: Running Locally with Host MySQL

1. Ensure MySQL is running on `localhost:3306`.
2. Configure `backend/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=portfolio_db
   DB_USER=root
   DB_PASSWORD=Singh5322f
   ```
3. Start backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

---

### Step 2: Start the Frontend Client

In a separate terminal window:
```bash
cd frontend
npm install
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🌐 Production Deployment Guide

### A. Deploy Frontend to Vercel

1. Push your repository to GitHub (`nikhil-1-2-3/portfolio`).
2. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import the repository and set:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. In **Environment Variables**, add:
   ```env
   VITE_API_URL=https://api.yourdomain.com/api
   ```
   *(or your EC2 public IP / domain with HTTPS)*
5. Click **Deploy**.

---

### B. Deploy Backend & MySQL to AWS EC2

#### 1. EC2 Instance Provisioning
- Launch an EC2 instance (`t3.micro` or `t3.small`) running **Ubuntu 24.04 LTS**.
- Configure Security Group:
  - Inbound **Port 22 (SSH)** from your IP
  - Inbound **Port 80 (HTTP)** from `0.0.0.0/0`
  - Inbound **Port 443 (HTTPS)** from `0.0.0.0/0`

#### 2. Install Docker & Docker Compose on EC2

```bash
# Update packages
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose-v2 git nginx

# Enable Docker service
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```

#### 3. Clone and Run Backend with Docker Compose

```bash
# Clone repository
git clone https://github.com/nikhil-1-2-3/portfolio.git
cd portfolio/backend

# Configure production environment variables
cp .env.example .env
nano .env

# Start MySQL and API
docker compose up -d
```

#### 4. Configure NGINX Reverse Proxy & SSL

```bash
sudo cp nginx.conf /etc/nginx/sites-available/portfolio-api
sudo ln -s /etc/nginx/sites-available/portfolio-api /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

Obtain a free SSL Certificate with Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.yourdomain.com
```

---

## 🔒 Security & Reliability Guarantees

- **Relational Persistence in MySQL:** Every contact submission is written to the ACID-compliant `contacts` table in MySQL (`id`, `name`, `email`, `subject`, `message`, `ip_address`, `mail_status`, `created_at`).
- **Fail-Safe Fallback:** If the database undergoes maintenance, submissions automatically fall back to an append-only JSON audit log so zero messages are lost.
- **Rate Limiting:** IP-level throttling limits contact submissions to a maximum of 5 requests per 15 minutes, neutralizing spam floods.
- **Bot Defense:** Hidden honeypot field automatically catches automated web scrapers without inconveniencing legitimate human visitors.
- **Strict CORS & Helmet:** HTTP security headers enforce content security, while CORS restricts API consumption exclusively to your verified frontend domain.
