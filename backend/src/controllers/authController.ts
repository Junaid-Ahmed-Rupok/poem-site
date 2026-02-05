import { Request, Response } from 'express';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export class AuthController {
  constructor(private db: Pool) {}

  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const id = uuidv4();

      await this.db.query(
        'INSERT INTO users (id, username, email, password_hash, role) VALUES ($1, $2, $3, $4, $5)',
        [id, username, email, hashedPassword, 'admin']
      );

      const secret = (process.env.JWT_SECRET || 'secret') as string;
      const token = jwt.sign({ id, role: 'admin' }, secret, {
        expiresIn: process.env.JWT_EXPIRY || '7d',
      });

      res.status(201).json({ message: 'Registered successfully', token, user: { id, username, email } });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await this.db.query('SELECT * FROM users WHERE email = $1', [email]);

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const user = result.rows[0];
      const validPassword = await bcrypt.compare(password, user.password_hash);

      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const secret = (process.env.JWT_SECRET || 'secret') as string;
      const token = jwt.sign(
        { id: user.id, role: user.role },
        secret,
        { expiresIn: process.env.JWT_EXPIRY || '7d' }
      );

      res.json({ message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  }
}
