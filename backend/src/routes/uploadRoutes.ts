import { Router, Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const upload = multer({
  dest: './uploads/',
  limits: { fileSize: 52428800 }, // 50MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'audio/mpeg', 'audio/wav', 'audio/mp4'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

export function createUploadRoutes(db: Pool): Router {
  const router = Router();

  // Upload image
  router.post('/image', upload.single('file'), (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const filename = `${uuidv4()}${path.extname(req.file.originalname)}`;
      const filepath = path.join('./uploads/', filename);
      fs.renameSync(req.file.path, filepath);

      res.json({
        message: 'Image uploaded',
        url: `/uploads/${filename}`,
        filename,
      });
    } catch (error) {
      res.status(500).json({ error: 'Upload failed' });
    }
  });

  // Upload audio
  router.post('/audio', upload.single('file'), (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const filename = `${uuidv4()}${path.extname(req.file.originalname)}`;
      const filepath = path.join('./uploads/', filename);
      fs.renameSync(req.file.path, filepath);

      res.json({
        message: 'Audio uploaded',
        url: `/uploads/${filename}`,
        filename,
      });
    } catch (error) {
      res.status(500).json({ error: 'Upload failed' });
    }
  });

  return router;
}
