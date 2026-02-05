"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Import controllers
const poemController_1 = require("./controllers/poemController");
const authController_1 = require("./controllers/authController");
const poemRoutes_1 = require("./routes/poemRoutes");
const uploadRoutes_1 = require("./routes/uploadRoutes");
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Database connection
const db = new pg_1.Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'bangla_kobita',
});
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
// Serve uploads
app.use('/uploads', express_1.default.static('uploads'));
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const secret = (process.env.JWT_SECRET || 'secret');
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch {
        res.status(401).json({ error: 'Invalid token' });
    }
};
const requireAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};
// Initialize controllers
const poemController = new poemController_1.PoemController(db);
const authController = new authController_1.AuthController(db);
// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Auth routes
app.post('/api/auth/register', (req, res) => authController.register(req, res));
app.post('/api/auth/login', (req, res) => authController.login(req, res));
// Upload routes (requires auth)
app.use('/api/upload', verifyToken, requireAdmin, (0, uploadRoutes_1.createUploadRoutes)(db));
// Poem routes
app.use('/api/poems', (0, poemRoutes_1.createPoemRoutes)(poemController));
// Story routes (placeholder)
app.get('/api/stories', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM short_stories WHERE is_published = true LIMIT 12');
        res.json({ data: result.rows });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch stories' });
    }
});
app.post('/api/stories', verifyToken, requireAdmin, async (req, res) => {
    try {
        const { title_bengali, title_english, summary, content } = req.body;
        const slug = (title_english || title_bengali).toLowerCase().replace(/\s+/g, '-');
        const result = await db.query('INSERT INTO short_stories (id, title_bengali, title_english, slug, summary, author_id, is_published) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [require('uuid').v4(), title_bengali, title_english, slug, summary, req.user?.id, true]);
        await db.query('INSERT INTO story_content (id, story_id, content, version) VALUES ($1, $2, $3, $4)', [require('uuid').v4(), result.rows[0].id, content, 1]);
        res.status(201).json({ data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create story' });
    }
});
// Music routes
app.get('/api/music', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM music_tracks WHERE is_published = true LIMIT 24');
        res.json({ data: result.rows });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch music' });
    }
});
app.post('/api/music', verifyToken, requireAdmin, async (req, res) => {
    try {
        const { title_bengali, title_english, audio_url, cover_image_url } = req.body;
        const slug = (title_english || title_bengali).toLowerCase().replace(/\s+/g, '-');
        const result = await db.query('INSERT INTO music_tracks (id, title_bengali, title_english, slug, audio_url, cover_image_url, is_published) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [require('uuid').v4(), title_bengali, title_english, slug, audio_url, cover_image_url, true]);
        res.status(201).json({ data: result.rows[0] });
    }
    catch (error) {
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});
// Error handling
app.use((err, req, res, next) => {
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
exports.default = app;
//# sourceMappingURL=index.js.map