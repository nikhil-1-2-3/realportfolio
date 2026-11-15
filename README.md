# Nikhil Singh Subhash — Personal Developer Portfolio & Platform

> **Full Stack Developer | Cloud & DevOps Engineer**  
> Modern, production-ready developer portfolio and cloud telemetry architecture.

---

## 🏛️ Architecture Overview

The system is architected as a decoupled, high-performance web platform split into a low-latency edge frontend and a hardened backend API:

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
       │                       │                               ▼
       │                       │                   │ ┌───────────────────┐ │
       │                       │                   │ │ SQLite/Audit Log  │ │
       │                       │                   │ │ & Nodemailer SMTP │ │
       │                       │                   │ └───────────────────┘ │
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
│   ├── src/
│   │   ├── middleware/
│   │   │   ├── errorHandler.js     # Centralized error handler
│   │   │   └── rateLimiter.js      # Rate limiting (5 requests/15 mins per IP)
│   │   ├── routes/
│   │   │   ├── contact.js          # POST /api/contact handler with validation
│   │   │   └── health.js           # GET /api/health target group diagnostic
│   │   ├── services/
│   │   │   ├── auditService.js     # Persistent JSONL / SQLite audit logger
│   │   │   └── mailService.js      # Nodemailer transactional email dispatcher
│   │   └── index.js                # Express app entry point
│   ├── Dockerfile                  # Multi-stage container build
│   ├── docker-compose.yml          # Container orchestration with health check
│   ├── ecosystem.config.cjs        # PM2 process file for AWS EC2 clustering
│   ├── nginx.conf                  # NGINX reverse proxy & SSL template
│   ├── package.json                # Express, Helmet, CORS, Nodemailer
│   └── .env.example                # Environment variables template
│
└── README.md                       # Complete project documentation
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js**: `v18.x` or `v20.x` or higher
- **npm**: `v9.x` or higher

---

### Step 1: Start the Backend API

```bash
cd backend
npm install
npm run dev
```

The backend server will start on `http://localhost:5000`.  
Verify health:
```bash
curl http://localhost:5000/api/health
```

---

### Step 2: Start the Frontend Client

In a new terminal window:
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

### B. Deploy Backend to AWS EC2

#### 1. EC2 Instance Provisioning
- Launch an EC2 instance (`t3.micro` or `t3.small`) running **Ubuntu 24.04 LTS**.
- Configure Security Group:
  - Inbound **Port 22 (SSH)** from your IP
  - Inbound **Port 80 (HTTP)** from `0.0.0.0/0`
  - Inbound **Port 443 (HTTPS)** from `0.0.0.0/0`

#### 2. Install Node.js, PM2, and NGINX on EC2

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git

# Install PM2 globally
sudo npm install -g pm2
```

#### 3. Clone and Configure the Application

```bash
# Clone repository
git clone https://github.com/nikhil-1-2-3/portfolio.git
cd portfolio/backend

# Install production dependencies
npm ci --only=production

# Configure environment variables
cp .env.example .env
nano .env
```

Configure `.env` with your settings:
```env
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://nikhil-singh-portfolio.vercel.app
RECIPIENT_EMAIL=23amtics402@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=23amtics402@gmail.com
SMTP_PASS=your-gmail-app-password
```

#### 4. Start the Application with PM2

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

#### 5. Configure NGINX Reverse Proxy & SSL

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

- **Rate Limiting:** IP-level throttling limits contact submissions to a maximum of 5 requests per 15 minutes, neutralizing spam floods.
- **Bot Defense:** Hidden honeypot field automatically catches automated web scrapers without inconveniencing legitimate human visitors.
- **Fail-Safe Persistence:** Every validated message is appended to a local audit log before email dispatch; even if SMTP credentials expire or external email networks have an outage, no message is ever lost.
- **Strict CORS & Helmet:** HTTP security headers enforce content security, while CORS restricts API consumption exclusively to your verified frontend domain.
