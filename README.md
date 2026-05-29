# UPSC Preparation Platform

A comprehensive all-in-one platform for UPSC exam preparation with study materials, current affairs, videos, question banks, and mock tests.

## 🎯 Features

### Phase 1 (MVP - Current Focus)
- ✅ Study Materials Library (PDFs upload & storage)
- ✅ Current Affairs Hub (Manual upload + RSS feed aggregation from newspapers)
- ✅ Video Repository (Upload & organize videos)
- ✅ Question Banks (Past papers & mock tests)
- ✅ Topic-wise Organization (UPSC syllabus structure)
- ✅ User Authentication (Login/Signup)
- ✅ Progress Tracking (Question history, accuracy, time spent)
- ✅ Search & Filter System
- ✅ Bookmarks/Favorites

### Phase 2 (Future Enhancements)
- [ ] Study Schedule/Planner
- [ ] Mock Test Engine with Timer
- [ ] Doubt Forum/Discussion
- [ ] Analytics Dashboard
- [ ] Performance Comparison

## 📚 Project Structure

```
upsc-prep-platform/
├── backend/                    # Node.js + Express backend
│   ├── src/
│   │   ├── config/            # Database & environment config
│   │   ├── models/            # Database schemas
│   │   ├── routes/            # API endpoints
│   │   ├── controllers/        # Business logic
│   │   ├── middleware/         # Auth, validation
│   │   ├── utils/             # Helper functions
│   │   └── server.js          # Main server setup
│   ├── .env.example           # Environment variables template
│   ├── package.json
│   └── README.md
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API calls
│   │   ├── context/           # Context API for state
│   │   ├── styles/            # CSS/Tailwind styles
│   │   ├── utils/             # Helper functions
│   │   └── App.jsx            # Main app component
│   ├── package.json
│   └── README.md
│
├── database/                  # Database schemas & migrations
│   ├── schema.sql
│   └── seed_data.sql
│
├── docs/                      # Documentation
│   ├── API_DOCS.md
│   ├── DATABASE_SCHEMA.md
│   ├── SETUP_GUIDE.md
│   └── FEATURES.md
│
└── .gitignore
```

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL
- **File Storage:** Local storage (upgradable to AWS S3)
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** Tailwind CSS
- **Validation:** Zod for schema validation
- **Hosting:** Vercel (frontend) + Railway/Render (backend)

## 📊 Database Schema Overview

### Core Tables
1. **users** - User accounts & authentication
2. **subjects** - UPSC subjects (History, Geography, Polity, etc.)
3. **topics** - Sub-topics under each subject
4. **study_materials** - PDFs and study documents
5. **current_affairs** - News articles
6. **videos** - Video resources
7. **questions** - Question bank (past papers & mock tests)
8. **user_progress** - Track questions solved & performance
9. **bookmarks** - User favorites

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/MySelfRC7/upsc-prep-platform.git
cd upsc-prep-platform

# Backend setup
cd backend
npm install
cp .env.example .env
# Update .env with your database credentials
npm run dev

# Frontend setup (in new terminal)
cd frontend
npm install
npm run dev
```

**Frontend:** http://localhost:5173  
**Backend:** http://localhost:5000

## 📖 Documentation

- [Setup Guide](./docs/SETUP_GUIDE.md) - Complete installation
- [Database Schema](./docs/DATABASE_SCHEMA.md) - Detailed structure
- [API Documentation](./docs/API_DOCS.md) - All endpoints
- [Features Guide](./docs/FEATURES.md) - How to use features

## 🔄 Current Affairs Sources

Auto-aggregation from:
- The Hindu
- Indian Express
- Deccan Chronicle
- Plus manual uploads

## 💾 File Storage Structure

```
uploads/
├── study_materials/
│   ├── polity/
│   ├── history/
│   ├── geography/
│   └── ...
├── videos/
│   ├── polity/
│   ├── history/
│   └── ...
└── current_affairs/
    └── articles/
```

## 🎓 UPSC Subjects Covered

- Indian Polity & Governance
- History of India & World History
- Geography (Physical & Human)
- Economy & Finance
- Science & Technology
- Environment & Ecology
- International Relations
- Current Affairs
- Ethics & Integrity

## 📝 API Overview

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/materials` - Get study materials
- `POST /api/materials/upload` - Upload PDF
- `GET /api/current-affairs` - Get news articles
- `GET /api/questions` - Get question bank
- `POST /api/questions/attempt` - Submit question answer
- `GET /api/progress` - Get user progress
- `GET /api/bookmarks` - Get bookmarks

## 🤝 Development Workflow

1. Create feature branches: `git checkout -b feature/feature-name`
2. Commit with convention: `feat:`, `fix:`, `docs:`, etc.
3. Push and create PR
4. Merge after testing

## 📄 License

Personal Use - UPSC Preparation Platform

---

**Last Updated:** 2026-05-29  
**Status:** 🟢 Project Setup Phase - Starting Development

