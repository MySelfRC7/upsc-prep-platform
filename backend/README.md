# UPSC Prep Platform - Backend

Node.js + Express backend for UPSC preparation platform.

## Setup

```bash
npm install
cp .env.example .env
# Update .env with your database credentials
npm run dev
```

Server runs on `http://localhost:5000`

## Project Structure

```
src/
├── config/          # Database & environment config
├── models/          # Database queries
├── routes/          # API routes
├── controllers/      # Business logic
├── middleware/       # Auth, validation
├── utils/           # Helpers
└── server.js        # Main server
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Study Materials
- `GET /api/materials` - Get all materials
- `GET /api/materials/:id` - Get material by ID
- `POST /api/materials/upload` - Upload PDF
- `DELETE /api/materials/:id` - Delete material

### Current Affairs
- `GET /api/current-affairs` - Get all articles
- `POST /api/current-affairs/scrape` - Scrape latest news
- `POST /api/current-affairs/manual` - Add manual article

### Videos
- `GET /api/videos` - Get all videos
- `POST /api/videos/upload` - Upload video
- `DELETE /api/videos/:id` - Delete video

### Questions
- `GET /api/questions` - Get question bank
- `GET /api/questions/:id` - Get question
- `POST /api/questions/attempt` - Submit answer
- `GET /api/questions/stats` - Get performance stats

### Progress
- `GET /api/progress` - Get user progress
- `GET /api/progress/stats` - Get stats

### Bookmarks
- `GET /api/bookmarks` - Get bookmarked items
- `POST /api/bookmarks/:itemId` - Add bookmark
- `DELETE /api/bookmarks/:itemId` - Remove bookmark

## Database

See `../database/schema.sql` for complete schema.

## Environment Variables

Copy `.env.example` to `.env` and update:
- Database credentials
- JWT secret
- File upload settings
- Current affairs RSS feeds
