import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database initialization
const dbPath = path.join(__dirname, '..', 'bangla_kobita.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Helper function to run db queries with promises
function runAsync(query: string, params: any[] = []): Promise<any> {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function getAsync(query: string, params: any[] = []): Promise<any> {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function allAsync(query: string, params: any[] = []): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
}

// Initialize database schema
async function initializeDatabase() {
  const schemaPath = path.join(__dirname, '..', '..', 'database', 'schema-sqlite.sql');
  let schema = '';
  
  if (fs.existsSync(schemaPath)) {
    schema = fs.readFileSync(schemaPath, 'utf-8');
  } else {
    // Inline minimal schema
    schema = getInlineSchema();
  }
  
  const statements = schema.split(';').filter(s => s.trim());
  for (const statement of statements) {
    if (statement.trim()) {
      await runAsync(statement);
    }
  }
  console.log('Database schema initialized');
}

function getInlineSchema(): string {
  return `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT,
      bio TEXT,
      avatar_url TEXT,
      role TEXT DEFAULT 'viewer',
      is_active BOOLEAN DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      type TEXT,
      icon_url TEXT,
      display_order INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tags (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      type TEXT,
      usage_count INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS poems (
      id TEXT PRIMARY KEY,
      title_bengali TEXT NOT NULL,
      title_english TEXT,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      description TEXT,
      category_id TEXT,
      author_id TEXT,
      cover_image_url TEXT,
      audio_url TEXT,
      reading_time_minutes INTEGER DEFAULT 5,
      view_count INTEGER DEFAULT 0,
      is_published BOOLEAN DEFAULT 0,
      publish_date TIMESTAMP,
      scheduled_publish_date TIMESTAMP,
      featured BOOLEAN DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id),
      FOREIGN KEY (author_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS short_stories (
      id TEXT PRIMARY KEY,
      title_bengali TEXT NOT NULL,
      title_english TEXT,
      slug TEXT UNIQUE NOT NULL,
      summary TEXT,
      category_id TEXT,
      author_id TEXT,
      cover_image_url TEXT,
      reading_time_minutes INTEGER DEFAULT 10,
      view_count INTEGER DEFAULT 0,
      is_published BOOLEAN DEFAULT 0,
      publish_date TIMESTAMP,
      featured BOOLEAN DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id),
      FOREIGN KEY (author_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS story_content (
      id TEXT PRIMARY KEY,
      story_id TEXT NOT NULL,
      content TEXT NOT NULL,
      version INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (story_id) REFERENCES short_stories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS novels (
      id TEXT PRIMARY KEY,
      title_bengali TEXT NOT NULL,
      title_english TEXT,
      slug TEXT UNIQUE NOT NULL,
      synopsis TEXT,
      category_id TEXT,
      author_id TEXT,
      cover_image_url TEXT,
      total_chapters INTEGER DEFAULT 0,
      completed BOOLEAN DEFAULT 0,
      is_published BOOLEAN DEFAULT 0,
      publish_date TIMESTAMP,
      featured BOOLEAN DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id),
      FOREIGN KEY (author_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS novel_chapters (
      id TEXT PRIMARY KEY,
      novel_id TEXT NOT NULL,
      chapter_number INTEGER NOT NULL,
      title_bengali TEXT NOT NULL,
      title_english TEXT,
      content TEXT NOT NULL,
      reading_time_minutes INTEGER DEFAULT 15,
      view_count INTEGER DEFAULT 0,
      is_published BOOLEAN DEFAULT 0,
      publish_date TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (novel_id) REFERENCES novels(id) ON DELETE CASCADE,
      UNIQUE (novel_id, chapter_number)
    );

    CREATE TABLE IF NOT EXISTS music_tracks (
      id TEXT PRIMARY KEY,
      title_bengali TEXT NOT NULL,
      title_english TEXT,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      artist_name TEXT,
      album_id TEXT,
      category_id TEXT,
      audio_url TEXT,
      cover_image_url TEXT,
      duration_seconds INTEGER,
      lyrics TEXT,
      view_count INTEGER DEFAULT 0,
      play_count INTEGER DEFAULT 0,
      is_published BOOLEAN DEFAULT 0,
      publish_date TIMESTAMP,
      featured BOOLEAN DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );

    CREATE TABLE IF NOT EXISTS music_albums (
      id TEXT PRIMARY KEY,
      title_bengali TEXT NOT NULL,
      title_english TEXT,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      cover_image_url TEXT,
      release_date DATE,
      total_tracks INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS poem_tags (
      poem_id TEXT,
      tag_id TEXT,
      PRIMARY KEY (poem_id, tag_id),
      FOREIGN KEY (poem_id) REFERENCES poems(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS story_tags (
      story_id TEXT,
      tag_id TEXT,
      PRIMARY KEY (story_id, tag_id),
      FOREIGN KEY (story_id) REFERENCES short_stories(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS novel_tags (
      novel_id TEXT,
      tag_id TEXT,
      PRIMARY KEY (novel_id, tag_id),
      FOREIGN KEY (novel_id) REFERENCES novels(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS music_tags (
      track_id TEXT,
      tag_id TEXT,
      PRIMARY KEY (track_id, tag_id),
      FOREIGN KEY (track_id) REFERENCES music_tracks(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    );

    INSERT OR IGNORE INTO users (id, username, email, password_hash, role, is_active)
    VALUES ('1', 'admin', 'junaidahmedrupok@gmail.com', '$2b$10$YIjlrNezO5/tKds6vQyuK.FW7YUhJQ8QZ8LJ6kJzK8F5X5K5Y5Yza', 'admin', 1);
  `;
}

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve uploads
app.use('/uploads', express.static('uploads'));

// Auth middleware
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const secret = (process.env.JWT_SECRET || 'secret') as string;
    const decoded = jwt.verify(token, secret) as any;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Initialize controllers
const authController = new (require('./controllers/authController').AuthController)(db);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth routes
app.post('/api/auth/register', (req, res) => authController.register(req, res));
app.post('/api/auth/login', (req, res) => authController.login(req, res));

// Poem routes
app.get('/api/poems', async (req, res) => {
  try {
    const poems = await allAsync('SELECT * FROM poems WHERE is_published = 1 LIMIT 12');
    res.json({ data: poems });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch poems' });
  }
});

app.post('/api/poems', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { title_bengali, title_english, content, description, cover_image_url } = req.body;
    const id = require('uuid').v4();
    const slug = (title_english || title_bengali).toLowerCase().replace(/\s+/g, '-');
    
    await runAsync(
      `INSERT INTO poems (id, title_bengali, title_english, content, description, cover_image_url, slug, author_id, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [id, title_bengali, title_english, content, description, cover_image_url, slug, req.user?.id]
    );
    
    res.status(201).json({ data: { id, title_bengali, title_english, slug } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create poem' });
  }
});

// Story routes
app.get('/api/stories', async (req, res) => {
  try {
    const stories = await allAsync('SELECT * FROM short_stories WHERE is_published = 1 LIMIT 12');
    res.json({ data: stories });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

app.post('/api/stories', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { title_bengali, title_english, summary, content } = req.body;
    const id = require('uuid').v4();
    const slug = (title_english || title_bengali).toLowerCase().replace(/\s+/g, '-');
    
    await runAsync(
      `INSERT INTO short_stories (id, title_bengali, title_english, summary, slug, author_id, is_published)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [id, title_bengali, title_english, summary, slug, req.user?.id]
    );
    
    await runAsync(
      'INSERT INTO story_content (id, story_id, content, version) VALUES (?, ?, ?, 1)',
      [require('uuid').v4(), id, content]
    );

    res.status(201).json({ data: { id, title_bengali, title_english, slug } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create story' });
  }
});

// Music routes
app.get('/api/music', async (req, res) => {
  try {
    const music = await allAsync('SELECT * FROM music_tracks WHERE is_published = 1 LIMIT 24');
    res.json({ data: music });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch music' });
  }
});

app.post('/api/music', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { title_bengali, title_english, audio_url, cover_image_url } = req.body;
    const id = require('uuid').v4();
    const slug = (title_english || title_bengali).toLowerCase().replace(/\s+/g, '-');

    await runAsync(
      `INSERT INTO music_tracks (id, title_bengali, title_english, slug, audio_url, cover_image_url, is_published)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [id, title_bengali, title_english, slug, audio_url, cover_image_url]
    );

    res.status(201).json({ data: { id, title_bengali, title_english, slug } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create music' });
  }
});

// Admin stats
app.get('/api/admin/stats', verifyToken, requireAdmin, async (req, res) => {
  try {
    const poems = await getAsync('SELECT COUNT(*) as count FROM poems', []) as any;
    const stories = await getAsync('SELECT COUNT(*) as count FROM short_stories', []) as any;
    const music = await getAsync('SELECT COUNT(*) as count FROM music_tracks', []) as any;
    const views = await getAsync('SELECT SUM(view_count) as total FROM poems', []) as any;

    res.json({
      data: {
        total_poems: poems?.count || 0,
        total_stories: stories?.count || 0,
        total_music: music?.count || 0,
        total_views: views?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║  Bangla Kobita API Server             ║
║  Running on port ${PORT}               ║
║  ${process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'DEVELOPMENT'}                    ║
╚═══════════════════════════════════════╝
  `);
});

export default app;
