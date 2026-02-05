# Bangla Kobita - Quick Start Guide

## 🚀 Getting Started (5 Minutes)

### Prerequisites
- Node.js 18+ installed
- PostgreSQL 14+ installed
- Git (optional)

### Step 1: Setup Database

```bash
# Create database
createdb bangla_kobita

# Load schema
psql -d bangla_kobita < database/schema.sql

# Create your first admin user (run in psql)
psql -d bangla_kobita

# Inside psql:
INSERT INTO users (id, username, email, password_hash, role, created_at)
VALUES (
  gen_random_uuid(),
  'admin',
  'your-email@example.com',
  '$2b$10$...',  -- bcrypt hash of your password
  'admin',
  NOW()
);
```

**Quick: Use this bcrypt hash for password "admin123":**
```
$2b$10$YIjlrNezO5/tKds6vQyuK.FW7YUhJQ8QZ8LJ6kJzK8F5X5K5Y5Yza
```

### Step 2: Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### Step 3: Setup Environment Variables

**backend/.env**
```
DATABASE_URL=postgresql://localhost/bangla_kobita
JWT_SECRET=your-super-secret-key-change-this
NODE_ENV=development
PORT=5000
```

**frontend/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 4: Start the Application

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Step 5: Login & Upload Content

1. Open http://localhost:3000/admin/login
2. Email: `junaidahmedrupok@gmail.com`
3. Password: `admin123`
4. Click "ড্যাশবোর্ড" (Dashboard)
5. Upload your first poem/story/music!

---

## 📱 Features Available Now

✅ **Admin Dashboard**
- View statistics (total poems, stories, music, views)
- Quick upload buttons for all content types

✅ **Upload Poems**
- Bengali & English titles
- Full poem content
- Cover image
- Publish/Draft status

✅ **Upload Stories**
- Bengali & English titles & descriptions
- Story content
- Cover image
- Publish/Draft status

✅ **Upload Music**
- Bengali & English titles
- Artist & Album info
- Audio file upload
- Cover image
- Duration tracking

✅ **Public Pages**
- Homepage with featured content
- Poems page with listings
- Stories page with listings
- Music page with player
- Individual content pages
- Dark/Light theme

---

## 🎯 Next Steps

### Phase 1: Basic Monetization (1-2 hours)
1. Add Google AdSense to `frontend/src/pages/_app.tsx`
2. Add ad slots to content pages

### Phase 2: Analytics (1 hour)
1. Track views: Already built into backend
2. View dashboard at `/admin/analytics`

### Phase 3: Deployment (2-3 hours)
1. Frontend → Vercel
2. Backend → Railway/Heroku
3. Database → Supabase

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port in .env
PORT=5001
```

### Database Connection Error
```bash
# Check PostgreSQL is running
psql -d bangla_kobita

# If not found, recreate:
createdb bangla_kobita
psql -d bangla_kobita < database/schema.sql
```

### Login Not Working
1. Clear browser cache
2. Check backend logs for errors
3. Verify database has users table populated
4. Try resetting password through database directly

### File Upload Fails
1. Check `backend/uploads/` folder exists
2. Verify file size < 50MB
3. Check file format (images: JPG/PNG/WebP, audio: MP3/WAV/M4A/FLAC)

---

## 📚 API Endpoints

All endpoints require JWT token in header:
```
Authorization: Bearer <your-token>
```

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Get JWT token

### Content
- `POST /api/poems` - Create poem
- `GET /api/poems` - List poems
- `GET /api/poems/:slug` - Get single poem
- `POST /api/stories` - Create story
- `GET /api/stories` - List stories
- `POST /api/music` - Create music track
- `GET /api/music` - List music

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `POST /api/upload/image` - Upload image
- `POST /api/upload/audio` - Upload audio

---

## 💡 Tips

1. **Backup Your Database Regularly**
   ```bash
   pg_dump bangla_kobita > backup.sql
   ```

2. **Monitor Server Logs**
   ```bash
   # Backend logs show in terminal where you ran `npm run dev`
   # Check for errors after uploads
   ```

3. **Use Draft Mode First**
   - Create content with "Draft" status
   - Review on your poems/stories/music pages
   - Publish when satisfied

4. **Beautiful Images Matter**
   - Use high-quality cover images (1200x800px recommended)
   - Same image used in listings and detail pages

5. **Content Organization**
   - Use meaningful English titles for URLs
   - Bengali titles for display
   - Tags help with SEO and user discovery

---

## 🌐 Going Live

### Deployment Checklist
- [ ] Change `JWT_SECRET` in backend .env
- [ ] Set `NODE_ENV=production` in backend
- [ ] Enable HTTPS
- [ ] Add custom domain
- [ ] Configure AdSense
- [ ] Set up email notifications (optional Phase 2)
- [ ] Backup database strategy
- [ ] Monitor uptime/errors

### Recommended Hosting
- **Frontend:** Vercel (free, best for Next.js)
- **Backend:** Railway or Render (free tier available)
- **Database:** Supabase (free PostgreSQL) or Railway

---

## 📖 Full Documentation

See the `/docs` folder for:
- `SETUP.md` - Detailed setup instructions
- `ADMIN.md` - Admin panel guide
- `API.md` - Complete API reference
- `DATABASE.md` - Database schema details
- `DEPLOYMENT.md` - Production deployment

---

**Happy Sharing! 🎉**

Your platform is ready. Upload your content and start engaging with readers today!
