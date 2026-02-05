"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
class AuthController {
    constructor(db) {
        this.db = db;
    }
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const id = (0, uuid_1.v4)();
            await this.db.query('INSERT INTO users (id, username, email, password_hash, role) VALUES ($1, $2, $3, $4, $5)', [id, username, email, hashedPassword, 'admin']);
            const secret = (process.env.JWT_SECRET || 'secret');
            const token = jsonwebtoken_1.default.sign({ id, role: 'admin' }, secret, {
                expiresIn: process.env.JWT_EXPIRY || '7d',
            });
            res.status(201).json({ message: 'Registered successfully', token, user: { id, username, email } });
        }
        catch (error) {
            res.status(500).json({ error: 'Registration failed' });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await this.db.query('SELECT * FROM users WHERE email = $1', [email]);
            if (result.rows.length === 0) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const user = result.rows[0];
            const validPassword = await bcryptjs_1.default.compare(password, user.password_hash);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const secret = (process.env.JWT_SECRET || 'secret');
            const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, secret, { expiresIn: process.env.JWT_EXPIRY || '7d' });
            res.json({ message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email } });
        }
        catch (error) {
            res.status(500).json({ error: 'Login failed' });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map