# Quick Start Guide - 5 Minutes to Get Running

## Prerequisites Check
- [ ] Node.js 18+ installed (`node --version`)
- [ ] PostgreSQL 14+ installed (`psql --version`)
- [ ] Git installed
- [ ] ~2GB disk space available

## Option 1: Docker (Fastest - 2 minutes)

```bash
# Navigate to project
cd "c:/Users/JUNAID AHMED/Videos/POEM SITE"

# Start everything
docker-compose up --build

# Wait for containers to start
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# Database: localhost:5432
```

**That's it!** All services running.

## Option 2: Manual Setup (5 minutes)

### Step 1: Database (1 min)
```bash
createdb bangla_kobita
psql -U postgres -d bangla_kobita < database/schema.sql
```

### Step 2: Backend (2 min)
```bash
cd backend
cp .env.example .env
# Edit .env with your database password
npm install
npm run dev
```

### Step 3: Frontend (2 min)
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

### Step 4: Access
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

---

## First Things to Try

1. **Homepage** → http://localhost:3000
2. **Poems Page** → http://localhost:3000/poems
3. **About Page** → http://localhost:3000/about
4. **API Health** → http://localhost:5000/api/health

---

## Common Issues & Fixes

### Port 3000 or 5000 already in use?
```bash
# Mac/Linux - Kill process
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database connection failed?
```bash
# Check PostgreSQL is running
psql -U postgres

# Re-create database
dropdb bangla_kobita
createdb bangla_kobita
psql -U postgres -d bangla_kobita < database/schema.sql
```

### Dependencies not installing?
```bash
# Clear cache and reinstall
rm -rf node_modules
npm cache clean --force
npm install
```

---

## Next Steps After Setup

1. **Read the docs:**
   - `docs/SETUP.md` - Full setup guide
   - `docs/ADMIN_GUIDE.md` - How to manage content
   - `docs/API_DOCS.md` - API endpoints

2. **Customize:**
   - Update colors in `frontend/tailwind.config.js`
   - Change site title in `frontend/src/pages/index.tsx`
   - Update brand in `frontend/src/pages/_app.tsx`

3. **Add Content:**
   - Upload poems via the frontend (dashboard not yet built)
   - Use API endpoints directly via Postman/curl

4. **Deploy:**
   - See `docs/DEPLOYMENT.md` for production setup
   - Choose: Vercel (frontend) + DigitalOcean (backend)

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server

# Database
psql -U postgres -d bangla_kobita    # Access database
\dt                     # List tables
\d poems                # Describe poems table
VACUUM ANALYZE;         # Optimize database

# Docker
docker-compose up       # Start all services
docker-compose down     # Stop all services
docker-compose logs     # View logs
docker-compose ps       # See running containers

# Git
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

---

## Directory Structure at a Glance

```
POEM SITE/
├── frontend/          ← React app (port 3000)
├── backend/           ← API server (port 5000)
├── database/          ← Database schema
├── docs/              ← Documentation
└── docker-compose.yml ← Multi-container setup
```

---

## Troubleshooting

### "Cannot find module" error?
```bash
npm install
```

### "Connection refused" on port 5000?
```bash
# Backend not running?
cd backend
npm run dev
```

### "EADDRINUSE" error?
```bash
# Port already in use, change port in backend/.env
PORT=5001
```

### Data not appearing?
```bash
# Database not initialized
psql -U postgres -d bangla_kobita < database/schema.sql
```

---

## Architecture Overview

```
User Browser (port 3000)
    ↓
Next.js Frontend (React)
    ↓ (API calls)
Express Backend (port 5000)
    ↓
PostgreSQL Database (port 5432)
```

---

## Environment Files

**Create `frontend/.env.local`:**
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Create `backend/.env`:**
```
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=bangla_kobita
JWT_SECRET=dev_secret_key
CORS_ORIGIN=http://localhost:3000
```

---

## Feature Overview

✅ **Homepage** - Navigation & featured content  
✅ **Poems** - Grid listing & individual reader  
✅ **Stories** - Short stories & novels with chapters  
✅ **Music** - Audio player with track listing  
✅ **About** - Author bio & contact  
✅ **Dark Mode** - Full dark theme support  
✅ **Responsive** - Mobile, tablet, desktop  
✅ **Bengali** - Full Unicode support  
✅ **Analytics** - View tracking ready  
✅ **Ads** - AdSense placeholders  

---

## Performance Tips

1. **Use Docker** - Isolated, reproducible environment
2. **Use `.env` files** - Never commit secrets
3. **Regular backups** - `pg_dump` database weekly
4. **Monitor logs** - Check for errors: `docker-compose logs -f`

---

## Getting Help

1. **Setup issues?** → Check `docs/SETUP.md`
2. **API questions?** → See `docs/API_DOCS.md`
3. **Database help?** → Review `docs/DATABASE.md`
4. **Admin guide?** → Read `docs/ADMIN_GUIDE.md`

---

**You're all set! Enjoy building the platform.** 🚀

For detailed info, see `docs/` folder.
