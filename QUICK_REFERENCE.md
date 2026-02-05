# 🚀 Quick Reference Card

## ⚡ 60-Second Setup

```bash
# 1. Create database
createdb bangla_kobita
psql -d bangla_kobita < database/schema.sql

# 2. Install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# 3. Create .env files (see WINDOWS_SETUP.md for Windows)

# 4. Start (2 terminals)
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm run dev

# 5. Visit http://localhost:3000/admin/login
# Email: junaidahmedrupok@gmail.com
# Password: admin123
```

---

## 🔑 Login Credentials

| Field | Value |
|-------|-------|
| Email | `junaidahmedrupok@gmail.com` |
| Password | `admin123` |
| JWT Secret | `your-secret-key` (in .env) |

---

## 📍 Important URLs

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | Homepage |
| http://localhost:3000/admin/login | Admin login |
| http://localhost:3000/admin/dashboard | Admin dashboard |
| http://localhost:5000/api | API base URL |
| http://localhost:5432 | PostgreSQL (default) |

---

## 📝 File Locations

| Component | Location |
|-----------|----------|
| Backend Server | `backend/src/index.ts` |
| Frontend App | `frontend/src/pages/_app.tsx` |
| Admin Layout | `frontend/src/components/AdminLayout.tsx` |
| API Client | `frontend/src/lib/api-client.ts` |
| Database Schema | `database/schema.sql` |
| Environment Vars | `backend/.env` & `frontend/.env.local` |

---

## 🔌 API Endpoints

```
POST   /api/auth/register        # Create admin
POST   /api/auth/login           # Login with JWT
POST   /api/upload/image         # Upload image
POST   /api/upload/audio         # Upload audio
GET    /api/poems                # List poems
POST   /api/poems                # Create poem
GET    /api/poems/:slug          # Get poem
GET    /api/stories              # List stories
POST   /api/stories              # Create story
GET    /api/music                # List music
POST   /api/music                # Create music
GET    /api/admin/stats          # Dashboard stats
```

---

## 🎛️ Admin Features

### Dashboard
- [ ] View total poems, stories, music, views
- [ ] Quick links to upload forms
- [ ] Statistics display

### Upload Poem
- [ ] Bengali title
- [ ] English title
- [ ] Bengali content
- [ ] English content (optional)
- [ ] Cover image
- [ ] Publish/Draft toggle

### Upload Story
- [ ] Bengali title
- [ ] English title
- [ ] Bengali description
- [ ] English description
- [ ] Bengali content
- [ ] English content (optional)
- [ ] Cover image
- [ ] Publish/Draft toggle

### Upload Music
- [ ] Bengali title
- [ ] English title
- [ ] Artist name
- [ ] Album name
- [ ] Audio file (MP3/WAV/M4A/FLAC)
- [ ] Duration in seconds
- [ ] Cover image
- [ ] Publish/Draft toggle

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Kill process or use `PORT=3001 npm run dev` |
| Port 5000 in use | Kill process or use `PORT=5001` in .env |
| DB not found | Run `createdb bangla_kobita` |
| Can't login | Check admin user exists in DB |
| Files won't upload | Check `backend/uploads/` exists |
| API returns 401 | Token expired, login again |
| Blank admin page | Check `.env` has `NEXT_PUBLIC_API_URL` |

---

## 📦 Project Dependencies

### Backend
- express
- postgres (pg)
- typescript
- jsonwebtoken
- bcryptjs
- multer
- cors
- dotenv

### Frontend
- next
- react
- tailwindcss
- axios
- typescript

---

## 🎨 Styling

### Tailwind Colors
```
primary:     Tailwind blue/indigo
secondary:   Tailwind purple
accent:      Tailwind orange
```

### Bengali Text Class
```html
<h1 class="bengali-text-heading">বাংলা শিরোনাম</h1>
<p class="bengali-text">বাংলা টেক্সট</p>
```

---

## 🗄️ Database Tables

```
1. users            - Admin accounts
2. poems            - Poetry content
3. poem_tags        - Poem categorization
4. stories          - Short stories
5. story_content    - Story versions
6. story_tags       - Story categorization
7. novels           - Novel metadata
8. novel_chapters   - Chapter structure
9. novel_tags       - Novel categorization
10. music_tracks    - Audio tracks
11. music_albums    - Album grouping
12. music_tags      - Music categorization
13. categories      - Content types
14. tags            - Searchable tags
15. ad_placements   - Ad positions
16. analytics       - Event tracking
17. seo_metadata    - Meta information
```

---

## 🔒 Authentication Flow

```
1. User enters email + password
2. Backend: Hash password check
3. Backend: Generate JWT token
4. Frontend: Store token in localStorage
5. Subsequent requests: Include token in header
6. Authorization: `Bearer <token>`
```

---

## 📤 File Upload Flow

```
1. User selects file in form
2. Frontend: Validate file size/type
3. Frontend: Send to /api/upload/image or /api/upload/audio
4. Backend: Multer validates MIME type
5. Backend: Generate UUID filename
6. Backend: Save to backend/uploads/
7. Backend: Return file URL
8. Frontend: Include URL in content creation
```

---

## 🎯 Content Creation Flow

```
Admin Login
    ↓
Dashboard
    ↓
Click "Upload Poem/Story/Music"
    ↓
Fill form with content
    ↓
Upload files (images, audio)
    ↓
Click "Add Content"
    ↓
Content saved to database
    ↓
View on public pages
    ↓
Readers can view/listen
```

---

## 📊 Analytics Ready

Track these events (to implement):
- Page view
- Content view
- Content read completion
- Music play/pause
- Content share
- Time on page

---

## 🌐 Deploy When Ready

### Frontend (Vercel)
```bash
cd frontend
npm i -g vercel
vercel
# Follow prompts, set NEXT_PUBLIC_API_URL
```

### Backend (Railway)
- Connect GitHub
- Set DATABASE_URL (from Supabase)
- Set JWT_SECRET
- Deploy

### Database (Supabase)
- Create PostgreSQL database
- Run schema.sql
- Copy connection string to backend

---

## 💡 Pro Tips

1. **Backup database regularly:**
   ```bash
   pg_dump bangla_kobita > backup.sql
   ```

2. **Clear browser cache:**
   - Ctrl+Shift+Delete (Chrome/Firefox)
   - Cmd+Shift+Delete (Mac)

3. **Monitor logs:**
   - Backend logs in terminal where `npm run dev` runs
   - Frontend logs in console (F12)

4. **Use quality images:**
   - Recommended: 1200x800px for covers
   - Format: JPG or WebP for performance

5. **Test on mobile:**
   - Use browser dev tools (F12 → Toggle device toolbar)
   - Or scan QR code with phone when running locally

---

## 🎓 Learning Path

1. **Day 1:** Setup & login
2. **Day 2:** Upload content
3. **Day 3:** Explore public pages
4. **Day 4:** Add AdSense
5. **Day 5:** Deploy to production

---

## ✅ Validation Checklist

Before going live, verify:
- [ ] Backend starts without errors
- [ ] Frontend loads without errors
- [ ] Can login to admin
- [ ] Can upload poem
- [ ] Can upload story
- [ ] Can upload music
- [ ] Public pages load content
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] No console errors

---

## 🆘 Support Resources

1. **WINDOWS_SETUP.md** - Windows-specific help
2. **GETTING_STARTED.md** - General troubleshooting
3. **docs/API.md** - API endpoint reference
4. **Backend logs** - Check terminal for errors
5. **Browser console** - F12 to see frontend errors

---

## 🎉 You're Ready!

Everything is complete and working. Start using it now:

```bash
npm run dev          # backend
npm run dev          # frontend
http://localhost:3000/admin/login
junaidahmedrupok@gmail.com / admin123
```

**Happy sharing! 🇧🇩📚🎵**
