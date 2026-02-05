# Bangla Kobita - Windows Setup Guide

## 🚀 Complete Setup for Windows

### Step 1: Install Prerequisites

#### Node.js 18+
1. Download from https://nodejs.org (LTS version)
2. Run installer and follow prompts
3. Verify installation:
   ```cmd
   node --version
   npm --version
   ```

#### PostgreSQL 14+
1. Download from https://www.postgresql.org/download/windows/
2. Run installer
3. **Important:** Remember the password you set for postgres user
4. Choose port 5432 (default)
5. Verify installation:
   ```cmd
   psql --version
   ```

---

### Step 2: Create Database

1. Open PowerShell or Command Prompt
2. Navigate to project directory:
   ```cmd
   cd "C:\Users\JUNAID AHMED\Videos\POEM SITE"
   ```

3. Create database:
   ```cmd
   createdb -U postgres bangla_kobita
   ```
   When prompted, enter postgres password

4. Load database schema:
   ```cmd
   psql -U postgres -d bangla_kobita -f database/schema.sql
   ```

5. Create admin user (paste entire block):
   ```cmd
   psql -U postgres -d bangla_kobita -c "INSERT INTO users (id, username, email, password_hash, role, created_at) VALUES (gen_random_uuid(), 'admin', 'junaidahmedrupok@gmail.com', '$2b$10$YIjlrNezO5/tKds6vQyuK.FW7YUhJQ8QZ8LJ6kJzK8F5X5K5Y5Yza', 'admin', NOW());"
   ```

---

### Step 3: Install Dependencies

1. Install backend:
   ```cmd
   cd backend
   npm install
   cd ..
   ```

2. Install frontend:
   ```cmd
   cd frontend
   npm install
   cd ..
   ```

---

### Step 4: Setup Environment Files

#### Backend Configuration

Create `backend\.env` file with:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/bangla_kobita
JWT_SECRET=your-secret-key-change-in-production-12345
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

**Replace `YOUR_PASSWORD` with your postgres password**

#### Frontend Configuration

Create `frontend\.env.local` file with:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

### Step 5: Create Upload Directories

Create these folders if they don't exist:
```cmd
mkdir backend\uploads
mkdir backend\uploads\images
mkdir backend\uploads\audio
```

---

### Step 6: Start the Application

**Method 1: Using Two Command Prompts (Easiest for Beginners)**

Terminal 1 - Backend:
```cmd
cd "C:\Users\JUNAID AHMED\Videos\POEM SITE\backend"
npm run dev
```
Wait for message: "Server is running on port 5000"

Terminal 2 - Frontend:
```cmd
cd "C:\Users\JUNAID AHMED\Videos\POEM SITE\frontend"
npm run dev
```
Wait for message: "ready on http://localhost:3000"

**Method 2: Using Docker (If Installed)**
```cmd
docker-compose up
```

---

### Step 7: Login & Start Uploading

1. Open browser: http://localhost:3000/admin/login
2. Email: `junaidahmedrupok@gmail.com`
3. Password: `admin123`
4. Click "ড্যাশবোর্ড"
5. Upload your first poem!

---

## 🎯 Common Windows Issues & Solutions

### Issue 1: "psql is not recognized"
**Solution:** PostgreSQL not added to PATH
1. Open Environment Variables (Win+X → System → Advanced → Environment Variables)
2. Add `C:\Program Files\PostgreSQL\15\bin` to PATH
3. Restart Command Prompt

### Issue 2: "Port 3000 already in use"
**Solution:** Kill process on port 3000
```cmd
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue 3: "Port 5000 already in use"
**Solution:** Kill process on port 5000
```cmd
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue 4: Database connection fails
**Solution:** Check credentials
1. Verify postgres is running:
   ```cmd
   psql -U postgres -c "SELECT 1"
   ```
2. Verify database exists:
   ```cmd
   psql -U postgres -l | findstr bengali
   ```
3. Check `.env` file has correct password

### Issue 5: "npm: command not found"
**Solution:** Node.js not installed or not in PATH
1. Download and install from nodejs.org
2. Restart Command Prompt
3. Test: `node --version`

---

## 📁 Project Structure After Setup

```
POEM SITE/
├── backend/
│   ├── src/
│   │   ├── index.ts (server)
│   │   ├── controllers/
│   │   └── routes/
│   ├── uploads/ (created automatically)
│   ├── .env (create this)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── admin/
│   │   │       ├── login.tsx
│   │   │       ├── dashboard.tsx
│   │   │       ├── upload-poem.tsx
│   │   │       ├── upload-story.tsx
│   │   │       └── upload-music.tsx
│   │   └── components/
│   │       └── AdminLayout.tsx
│   ├── .env.local (create this)
│   └── package.json
├── database/
│   └── schema.sql
└── GETTING_STARTED.md
```

---

## 🚀 Using Windows Terminal (Recommended)

Instead of Command Prompt, use Windows Terminal for a better experience:
1. Download from Microsoft Store (free)
2. Open multiple tabs (Alt+Shift+D or + button)
3. Run backend in one tab, frontend in another

---

## 🎉 Next Steps

1. **Upload Your Content**
   - Create poems, stories, and music
   - Add images and audio files
   - View on public pages

2. **Add Google AdSense**
   - Sign up at adsense.google.com
   - Get ad code
   - Paste in `frontend/src/pages/_app.tsx`

3. **Deploy Online**
   - Frontend to Vercel (free)
   - Backend to Railway or Render
   - Database to Supabase

4. **Monitor & Grow**
   - Check dashboard for stats
   - Share links on social media
   - Collect feedback from readers

---

## 📞 Getting Help

If you get stuck:
1. Check the error message carefully
2. Google the error with "windows" included
3. Check GETTING_STARTED.md for more info
4. Review database logs:
   ```cmd
   psql -U postgres -d bangla_kobita
   SELECT * FROM pg_stat_statements;
   ```

---

**Good Luck! Your platform is ready. Start uploading! 🎉**
