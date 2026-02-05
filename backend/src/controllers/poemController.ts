import { Request, Response } from 'express';
import { Pool } from 'pg';

// This would normally be injected, but for this example we'll show the pattern
export class PoemController {
  constructor(private db: Pool) {}

  // Get all poems with pagination
  async getPoems(req: Request, res: Response) {
    try {
      const { page = 1, limit = 12, category, tag } = req.query;
      const offset = ((Number(page) - 1) * Number(limit));

      let query = 'SELECT * FROM poems WHERE is_published = true';
      const params: any[] = [];

      if (category) {
        query += ' AND category_id = $' + (params.length + 1);
        params.push(category);
      }

      query += ' ORDER BY publish_date DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
      params.push(limit, offset);

      const result = await this.db.query(query, params);
      const countResult = await this.db.query('SELECT COUNT(*) FROM poems WHERE is_published = true');

      res.json({
        data: result.rows,
        total: parseInt(countResult.rows[0].count),
        page: Number(page),
        limit: Number(limit),
      });
    } catch (error) {
      console.error('Error fetching poems:', error);
      res.status(500).json({ error: 'Failed to fetch poems' });
    }
  }

  // Get single poem by slug
  async getPoemBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const result = await this.db.query(
        'SELECT p.*, c.name as category_name FROM poems p LEFT JOIN categories c ON p.category_id = c.id WHERE p.slug = $1 AND p.is_published = true',
        [slug]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Poem not found' });
      }

      // Increment view count
      await this.db.query('UPDATE poems SET view_count = view_count + 1 WHERE id = $1', [result.rows[0].id]);

      res.json({ data: result.rows[0] });
    } catch (error) {
      console.error('Error fetching poem:', error);
      res.status(500).json({ error: 'Failed to fetch poem' });
    }
  }

  // Create new poem (admin only)
  async createPoem(req: Request, res: Response) {
    try {
      const {
        title_bengali,
        title_english,
        content,
        description,
        category_id,
        is_published,
        publish_date,
      } = req.body;

      const slug = title_english?.toLowerCase().replace(/\s+/g, '-') || title_bengali.toLowerCase();

      const result = await this.db.query(
        `INSERT INTO poems (
          title_bengali, title_english, slug, content, description,
          category_id, is_published, publish_date, author_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          title_bengali,
          title_english,
          slug,
          content,
          description,
          category_id,
          is_published || false,
          publish_date,
          req.user?.id,
        ]
      );

      res.status(201).json({ data: result.rows[0] });
    } catch (error) {
      console.error('Error creating poem:', error);
      res.status(500).json({ error: 'Failed to create poem' });
    }
  }

  // Update poem (admin only)
  async updatePoem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title_bengali, title_english, content, description, is_published, publish_date } = req.body;

      const result = await this.db.query(
        `UPDATE poems SET
          title_bengali = COALESCE($1, title_bengali),
          title_english = COALESCE($2, title_english),
          content = COALESCE($3, content),
          description = COALESCE($4, description),
          is_published = COALESCE($5, is_published),
          publish_date = COALESCE($6, publish_date),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $7 RETURNING *`,
        [title_bengali, title_english, content, description, is_published, publish_date, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Poem not found' });
      }

      res.json({ data: result.rows[0] });
    } catch (error) {
      console.error('Error updating poem:', error);
      res.status(500).json({ error: 'Failed to update poem' });
    }
  }

  // Delete poem (admin only)
  async deletePoem(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await this.db.query('DELETE FROM poems WHERE id = $1 RETURNING id', [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Poem not found' });
      }

      res.json({ message: 'Poem deleted successfully' });
    } catch (error) {
      console.error('Error deleting poem:', error);
      res.status(500).json({ error: 'Failed to delete poem' });
    }
  }
}
