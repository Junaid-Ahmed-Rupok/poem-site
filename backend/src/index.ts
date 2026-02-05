import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import path from 'path';

// Import controllers
import { PoemController } from './controllers/poemController';
import { AuthController } from './controllers/authController';
import { createPoemRoutes } from './routes/poemRoutes';
import { createUploadRoutes } from './routes/uploadRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
const db = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'bangla_kobita',
});

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
const poemController = new PoemController(db);
const authController = new AuthController(db);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth routes
app.post('/api/auth/register', (req, res) => authController.register(req, res));
app.post('/api/auth/login', (req, res) => authController.login(req, res));

// Upload routes (requires auth)
app.use('/api/upload', verifyToken, requireAdmin, createUploadRoutes(db));

// Poem routes
app.use('/api/poems', createPoemRoutes(poemController));

// Story routes (placeholder)
app.get('/api/stories', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM short_stories WHERE is_published = true LIMIT 12');
    res.json({ data: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

app.post('/api/stories', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { title_bengali, title_english, summary, content } = req.body;
    const slug = (title_english || title_bengali).toLowerCase().replace(/\s+/g, '-');
    
    const result = await db.query(
      'INSERT INTO short_stories (id, title_bengali, title_english, slug, summary, author_id, is_published) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [require('uuid').v4(), title_bengali, title_english, slug, summary, req.user?.id, true]
    );
    
    await db.query(
      'INSERT INTO story_content (id, story_id, content, version) VALUES ($1, $2, $3, $4)',
      [require('uuid').v4(), result.rows[0].id, content, 1]
    );

    res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create story' });
  }
});

// Music routes
app.get('/api/music', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM music_tracks WHERE is_published = true LIMIT 24');
    res.json({ data: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch music' });
  }
});

app.post('/api/music', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { title_bengali, title_english, audio_url, cover_image_url } = req.body;
    const slug = (title_english || title_bengali).toLowerCase().replace(/\s+/g, '-');

    const result = await db.query(
      'INSERT INTO music_tracks (id, title_bengali, title_english, slug, audio_url, cover_image_url, is_published) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [require('uuid').v4(), title_bengali, title_english, slug, audio_url, cover_image_url, true]
    );

    res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create music' });
  }
});

// Admin stats
app.get('/api/admin/stats', verifyToken, requireAdmin, async (req, res) => {
  try {
    const poems = await db.query('SELECT COUNT(*) FROM poems');
    const stories = await db.query('SELECT COUNT(*) FROM short_stories');
    const music = await db.query('SELECT COUNT(*) FROM music_tracks');
    const views = await db.query('SELECT SUM(view_count) FROM poems');

    res.json({
      data: {
        total_poems: poems.rows[0].count,
        total_stories: stories.rows[0].count,
        total_music: music.rows[0].count,
        total_views: views.rows[0].sum || 0,
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
