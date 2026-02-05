"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsHeaders = exports.errorHandler = exports.requireAdmin = exports.requireAuth = void 0;
// Auth middleware placeholder
const requireAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // Token validation logic would go here
    // For now, we'll just pass through
    next();
};
exports.requireAuth = requireAuth;
// Admin-only middleware
const requireAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
    next();
};
exports.requireAdmin = requireAdmin;
// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
    });
};
exports.errorHandler = errorHandler;
// CORS middleware
const corsHeaders = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
};
exports.corsHeaders = corsHeaders;
//# sourceMappingURL=auth.js.map