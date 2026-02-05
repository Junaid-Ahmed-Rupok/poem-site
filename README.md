# 🎉 Bangla Kobita - Bengali Poetry, Stories & Music Platform

Your complete, production-ready platform for sharing Bengali poetry, stories, and music with monetization support.

## ✨ What's Included

✅ **Complete Admin Dashboard**
- Upload poems with Bengali/English titles
- Upload stories and novels with chapter support
- Upload music tracks with album organization
- Real-time statistics and analytics
- Admin login with JWT authentication

✅ **Beautiful Public Website**
- Homepage with featured content
- Poems listing and detail pages
- Stories/novels section with full reader
- Music player with track listings
- Dark/light theme toggle
- Responsive mobile design
- Bengali font support (Noto Sans Bengali)

✅ **Full Backend API**
- RESTful endpoints for all content types
- Secure file upload (images & audio)
- JWT authentication & authorization
- PostgreSQL database with 12+ tables
- CORS configuration for frontend

✅ **Monetization Ready**
- Google AdSense integration (ready)
- Analytics tracking
- View/read count monitoring
- Ad placement management

---

## 🚀 Quick Start (5 Minutes)

### On Windows:
See [WINDOWS_SETUP.md](./WINDOWS_SETUP.md) for detailed Windows instructions

### On macOS/Linux:
1. **Install dependencies:**
   ```bash
   # Install Node.js 18+ from nodejs.org
   # Install PostgreSQL 14+ from postgresql.org
   ```

2. **Setup database:**
   ```bash
   createdb bangla_kobita
   psql -d bangla_kobita < database/schema.sql
   ```

3. **Install packages:**
   ```bash
   cd backend && npm install && cd ..
   cd frontend && npm install && cd ..
   ```

4. **Create `.env` files:**
   
   **backend/.env:**
   ```
   DATABASE_URL=postgresql://localhost/bangla_kobita
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   PORT=5000
   CORS_ORIGIN=http://localhost:3000
   ```

   **frontend/.env.local:**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

5. **Start servers:**
   ```bash
   # Terminal 1
   cd backend && npm run dev
   
   # Terminal 2
   cd frontend && npm run dev
   ```

6. **Login:**
   - Visit http://localhost:3000/admin/login
   - Email: `junaidahmedrupok@gmail.com`
   - Password: `admin123`
   - Start uploading!

---

## 📚 Documentation

- [GETTING_STARTED.md](./GETTING_STARTED.md) - Quick start guide
- [WINDOWS_SETUP.md](./WINDOWS_SETUP.md) - Windows-specific setup
- [docs/SETUP.md](./docs/SETUP.md) - Detailed setup guide
- [docs/ADMIN.md](./docs/ADMIN.md) - Admin panel guide
- [docs/API.md](./docs/API.md) - Complete API documentation
- [docs/DATABASE.md](./docs/DATABASE.md) - Database schema details
- [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) - Production deployment guide

---

## 🎯 Features

### Content Management
- 📝 **Poems**: Support for Bengali & English titles/content
- 📖 **Stories**: Short stories and full novels with chapter support
- 🎵 **Music**: Audio tracks with album organization
- 🖼️ **Cover Images**: Upload custom images for each piece
- 🎙️ **Audio Files**: Upload MP3, WAV, M4A, FLAC files

### Admin Features
- 🔒 Secure login with JWT
- 📊 Dashboard with statistics
- 📤 Drag & drop file uploads
- 🎛️ Publish/Draft mode
- 🔄 Edit & delete content
- 🌙 Dark/Light theme

### Public Features
- 🌍 Beautiful responsive design
- 🔍 Content discovery
- 🎧 Embedded audio player
- 🌙 Dark mode
- 📱 Mobile optimized
- 🇧🇩 Bengali font support

### Technical
- ⚡ Next.js 14 frontend
- 🚀 Express.js backend
- 🗄️ PostgreSQL database
- 🔐 JWT authentication
- 📦 Docker support
- 🌐 CORS enabled
- 🔧 TypeScript for type safety

---

## 💻 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | PostgreSQL 14+ |
| **Auth** | JWT with bcryptjs |
| **File Storage** | Local filesystem (configurable) |
| **Styling** | Tailwind CSS with custom Bengali theme |
| **Fonts** | Noto Sans Bengali |

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Create admin account
- `POST /api/auth/login` - Login (returns JWT token)

### Content
- `GET /api/poems` - List poems
- `POST /api/poems` - Create poem (admin)
- `GET /api/poems/:slug` - Get single poem
- `GET /api/stories` - List stories
- `POST /api/stories` - Create story (admin)
- `GET /api/music` - List music
- `POST /api/music` - Create music track (admin)

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `POST /api/upload/image` - Upload image
- `POST /api/upload/audio` - Upload audio

Full API documentation: [docs/API.md](./docs/API.md)

---

## 📁 Project Structure

```
POEM SITE/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.tsx    # Homepage
│   │   │   ├── poems.tsx    # Poems listing
│   │   │   ├── stories.tsx  # Stories listing
│   │   │   ├── music.tsx    # Music listing
│   │   │   └── admin/       # Admin panel
│   │   │       ├── login.tsx
│   │   │       ├── dashboard.tsx
│   │   │       ├── upload-poem.tsx
│   │   │       ├── upload-story.tsx
│   │   │       └── upload-music.tsx
│   │   ├── components/      # Reusable components
│   │   ├── lib/            # Utilities & API client
│   │   └── styles/         # Global styles
│   └── package.json
│
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── index.ts        # Server entry point
│   │   ├── controllers/    # Business logic
│   │   └── routes/         # API routes
│   ├── uploads/            # File storage
│   └── package.json
│
├── database/
│   └── schema.sql          # Database schema
│
├── docs/                   # Documentation
│   ├── SETUP.md
│   ├── ADMIN.md
│   ├── API.md
│   ├── DATABASE.md
│   └── DEPLOYMENT.md
│
├── GETTING_STARTED.md      # Quick start
├── WINDOWS_SETUP.md        # Windows instructions
├── docker-compose.yml      # Docker configuration
└── README.md              # This file
```

---

## 🌐 Deployment

### Quick Deploy with Vercel + Railway

1. **Frontend on Vercel:**
   ```bash
   npm i -g vercel
   cd frontend
   vercel
   ```

2. **Backend on Railway:**
   - Create account at railway.app
   - Connect GitHub repo
   - Set environment variables
   - Deploy

3. **Database on Supabase:**
   - Create account at supabase.io
   - Create PostgreSQL database
   - Run `schema.sql`
   - Update connection string

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed instructions.

---

## 💰 Monetization

The platform is ready for Google AdSense integration:

1. **Sign up:** https://adsense.google.com
2. **Get ad code** from your AdSense account
3. **Add to:** `frontend/src/pages/_app.tsx`
4. **View ad revenue** in your AdSense dashboard

Ad placement points ready:
- Homepage header & sidebar
- Poems detail page (above/below content)
- Stories reader (margins)
- Music player page

---

## 🔒 Security

✅ **Implemented:**
- JWT token-based authentication
- bcryptjs password hashing (10 rounds)
- CORS protection
- SQL injection prevention (parameterized queries)
- Admin-only routes
- File upload validation

⚠️ **Before Production:**
- Change `JWT_SECRET` in `.env`
- Set `NODE_ENV=production`
- Enable HTTPS
- Configure firewall rules
- Regular database backups
- Set strong admin password

---

## 🐛 Troubleshooting

### Backend Issues
```bash
# Check database connection
psql -d bangla_kobita

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check port is not in use
lsof -i :5000
```

### Frontend Issues
```bash
# Clear .next cache
rm -rf .next

# Rebuild
npm run build

# Check API URL in .env.local
cat .env.local
```

### Database Issues
```bash
# Check schema loaded
psql -d bangla_kobita -c "\dt"

# Check admin user exists
psql -d bangla_kobita -c "SELECT * FROM users LIMIT 1;"
```

See [GETTING_STARTED.md](./GETTING_STARTED.md) for more solutions.

---

## 📈 Analytics

Track your content performance:
- View counts per poem/story/music
- Reading time for stories
- Play counts for music
- Visitor trends over time
- Popular content rankings

Dashboard at: http://localhost:3000/admin/dashboard

---

## 🚀 What's Next

1. **Immediate (Today):**
   - ✅ Setup completed
   - ✅ Admin panel ready
   - ✅ Upload first content

2. **Short Term (This Week):**
   - Add Google AdSense
   - Share content on social media
   - Invite friends to read

3. **Medium Term (This Month):**
   - Deploy to production
   - Monitor analytics
   - Optimize based on feedback

4. **Long Term (Phase 2):**
   - Comment & rating system
   - User accounts & followers
   - Email notifications
   - Advanced search & filters
   - API for third-party apps

---

## 💬 Support

Need help? Check:
1. [WINDOWS_SETUP.md](./WINDOWS_SETUP.md) - Windows specific
2. [GETTING_STARTED.md](./GETTING_STARTED.md) - General troubleshooting
3. [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) - Production deployment

---

## 📄 License

This project is ready for personal use and deployment.

---

## 🎉 Ready to Go!

Your Bengali content platform is complete and ready to use:

```bash
# Start backend
cd backend && npm run dev

# Start frontend (new terminal)
cd frontend && npm run dev

# Visit: http://localhost:3000/admin/login
# Login with: junaidahmedrupok@gmail.com / admin123
# Start uploading!
```

**Happy sharing! 🇧🇩📚🎵**

---

*Platform created for Bengali writers, poets, and musicians to share their work globally with monetization support.*

## Quick Start

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

See [SETUP.md](docs/SETUP.md) for detailed setup instructions.

## Documentation

- [Setup Guide](docs/SETUP.md) - Installation and configuration
- [Admin Guide](docs/ADMIN_GUIDE.md) - How to manage content
- [API Documentation](docs/API_DOCS.md) - Backend API endpoints
- [Database Schema](docs/DATABASE.md) - Data models
- [Deployment](docs/DEPLOYMENT.md) - Production deployment

## File Structure Overview

### Frontend (`frontend/`)
- `src/pages/` - Next.js pages and routes
- `src/components/` - Reusable React components
- `src/types/` - TypeScript type definitions
- `src/utils/` - Helper functions
- `src/styles/` - Global and component styles
- `public/` - Static assets (images, fonts, audio)

### Backend (`backend/`)
- `src/controllers/` - Request handlers
- `src/routes/` - API route definitions
- `src/models/` - Database models
- `src/middleware/` - Express middleware
- `src/config/` - Configuration files

### Database (`database/`)
- `migrations/` - Database schema changes
- `seeds/` - Sample data for testing
- `schema.sql` - Complete database schema

## Environment Variables

Both frontend and backend require `.env.local` files. See `.env.example` files in respective directories.

## Support

For administrative help, refer to [ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md).

---

**Created**: February 2026  
**Platform**: Bangla Kobita, Golpo, O Gaan
