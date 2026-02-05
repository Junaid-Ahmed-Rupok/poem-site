# Setup Guide - Bangla Kobita, Golpo, O Gaan

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Docker & Docker Compose (optional, for containerized setup)
- Git

## Quick Start with Docker

The easiest way to get started is using Docker Compose:

```bash
cd "c:/Users/JUNAID AHMED/Videos/POEM SITE"
docker-compose up --build
```

This will start:
- PostgreSQL database on `localhost:5432`
- Backend API on `http://localhost:5000`
- Frontend on `http://localhost:3000`

## Manual Setup

### 1. Database Setup

Install PostgreSQL and create a database:

```bash
createdb bangla_kobita
psql -U postgres -d bangla_kobita < database/schema.sql
```

Update `backend/.env` with your database credentials:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=bangla_kobita
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run build
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

## Configuration

### Environment Variables

#### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_ADSENSE_CLIENT_ID=your_adsense_client_id
```

#### Backend (.env)

```
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=bangla_kobita
JWT_SECRET=your_secret_key_here
CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=52428800
```

## First Time Setup

1. **Start the application** using Docker Compose or manually
2. **Access the frontend** at `http://localhost:3000`
3. **API is ready** at `http://localhost:5000/api/health`

## Project Structure

```
POEM-SITE/
├── frontend/                 # Next.js React frontend
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Next.js pages
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities (API client, etc)
│   │   ├── styles/          # Global CSS
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Helper functions
│   ├── public/              # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.js
│
├── backend/                  # Node.js Express API
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── utils/           # Utilities
│   │   ├── config/          # Configuration
│   │   └── index.ts         # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── database/                 # Database files
│   ├── migrations/          # Schema changes
│   ├── seeds/               # Sample data
│   └── schema.sql           # Complete schema
│
├── docs/                     # Documentation
└── docker-compose.yml        # Docker configuration
```

## Available Scripts

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
```

### Backend

```bash
npm run dev          # Start with ts-node-dev
npm run build        # Compile TypeScript
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
npm run migrate      # Run migrations
```

## Database Migrations

The database schema is defined in `database/schema.sql`. To initialize:

```bash
psql -U postgres -d bangla_kobita < database/schema.sql
```

## Troubleshooting

### Port Already in Use

If port 3000 or 5000 is already in use:

```bash
# Find process using port
lsof -i :3000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Database Connection Failed

Check your `.env` file and ensure PostgreSQL is running:

```bash
# Start PostgreSQL (macOS)
brew services start postgresql

# Start PostgreSQL (Linux)
sudo systemctl start postgresql

# Test connection
psql -U postgres
```

### Build Errors

Clear cache and reinstall:

```bash
# Backend
rm -rf node_modules dist
npm install

# Frontend
rm -rf node_modules .next
npm install
```

## Next Steps

1. Follow [ADMIN_GUIDE.md](ADMIN_GUIDE.md) to set up content
2. See [DATABASE.md](DATABASE.md) for schema details
3. Check [API_DOCS.md](API_DOCS.md) for API endpoints
4. Review [DEPLOYMENT.md](DEPLOYMENT.md) for production setup

---

**Need Help?** Check the error logs or review the configuration files.
