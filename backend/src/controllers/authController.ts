import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export class AuthController {
  constructor(private db: sqlite3.Database) {}

  private getAsync(query: string, params: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.get(query, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  private runAsync(query: string, params: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(query, params, function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const id = uuidv4();

      await this.runAsync(
        'INSERT INTO users (id, username, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
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

      const user = await this.getAsync('SELECT * FROM users WHERE email = ?', [email]);

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

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
