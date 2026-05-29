# UPSC Preparation Platform - Setup Guide

## Prerequisites

- Node.js 16 or higher
- PostgreSQL 12 or higher
- Git
- npm or yarn

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/MySelfRC7/upsc-prep-platform.git
cd upsc-prep-platform
```

### 2. Setup Database

#### Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE upsc_prep;

# Exit
\q
```

#### Run Schema

```bash
# Connect to the database and run schema
psql -U postgres -d upsc_prep -f database/schema.sql

# Optionally seed sample data
psql -U postgres -d upsc_prep -f database/seed_data.sql
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your database credentials
# Edit .env and update:
# - DB_PASSWORD=your_postgres_password
# - JWT_SECRET=generate_a_random_string

# Start backend server
npm run dev
```

Backend should now be running on `http://localhost:5000`

### 4. Frontend Setup

```bash
# In new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend should now be running on `http://localhost:5173`

## Testing the Setup

### Backend Health Check

```bash
curl http://localhost:5000/health
# Should return: {"status":"ok"}
```

### Frontend Access

Open browser and go to `http://localhost:5173`

## Environment Variables

### Backend (.env)

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=upsc_prep
DB_USER=postgres
DB_PASSWORD=your_password

PORT=5000
NODE_ENV=development

JWT_SECRET=your_random_secret_key
JWT_EXPIRY=7d

MAX_FILE_SIZE=50mb
UPLOAD_DIR=./uploads

CLIENT_URL=http://localhost:5173
```

## Troubleshooting

### Database Connection Error

**Error:** `ECONNREFUSED` or connection timeout

**Solution:**
- Ensure PostgreSQL is running
- Check database credentials in .env
- Verify database exists: `psql -U postgres -l`

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
- Change PORT in .env
- Or kill process using the port:
  ```bash
  # On Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # On Mac/Linux
  lsof -ti:5000 | xargs kill -9
  ```

### Module Not Found

**Error:** `Cannot find module`

**Solution:**
- Delete node_modules and package-lock.json
- Run `npm install` again

### CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Backend CORS is already configured for `http://localhost:5173`
- If changing frontend port, update `CORS_ORIGIN` in backend

## Next Steps

1. **Create User Account** - Implement authentication
2. **Upload Materials** - Add study materials
3. **Add Questions** - Build question bank
4. **Develop Features** - Implement remaining features

See [FEATURES.md](./FEATURES.md) for feature details.
See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for database structure.
