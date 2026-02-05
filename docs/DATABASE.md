# Database Schema Documentation

## Overview

The database uses PostgreSQL 14+ with the following tables:

## Core Tables

### users
Stores admin and user information.

```sql
- id (UUID, PK)
- username (VARCHAR, unique)
- email (VARCHAR, unique)
- password_hash (VARCHAR)
- full_name (VARCHAR)
- bio (TEXT)
- avatar_url (VARCHAR)
- role (VARCHAR) - admin, editor, viewer
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### categories
Content categories.

```sql
- id (UUID, PK)
- name (VARCHAR)
- slug (VARCHAR, unique)
- description (TEXT)
- type (VARCHAR) - poem, story, music
- icon_url (VARCHAR)
- display_order (INT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### tags
Content tags for better organization.

```sql
- id (UUID, PK)
- name (VARCHAR)
- slug (VARCHAR, unique)
- type (VARCHAR) - poem, story, music
- usage_count (INT)
- created_at (TIMESTAMP)
```

## Content Tables

### poems
Poetry content.

```sql
- id (UUID, PK)
- title_bengali (VARCHAR)
- title_english (VARCHAR)
- slug (VARCHAR, unique)
- content (TEXT)
- description (TEXT)
- category_id (UUID, FK → categories)
- author_id (UUID, FK → users)
- cover_image_url (VARCHAR)
- audio_url (VARCHAR)
- reading_time_minutes (INT)
- view_count (INT)
- is_published (BOOLEAN)
- publish_date (TIMESTAMP)
- scheduled_publish_date (TIMESTAMP)
- featured (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**Indexes:**
- `idx_poems_slug` - For fast URL lookups
- `idx_poems_published` - For published content queries
- `idx_poems_category` - For category filtering
- `idx_poems_featured` - For homepage content

### poem_tags
Junction table for poem-tag relationships.

```sql
- poem_id (UUID, FK → poems, PK)
- tag_id (UUID, FK → tags, PK)
```

### short_stories
Short story content.

```sql
- id (UUID, PK)
- title_bengali (VARCHAR)
- title_english (VARCHAR)
- slug (VARCHAR, unique)
- summary (TEXT)
- category_id (UUID, FK → categories)
- author_id (UUID, FK → users)
- cover_image_url (VARCHAR)
- reading_time_minutes (INT)
- view_count (INT)
- is_published (BOOLEAN)
- publish_date (TIMESTAMP)
- featured (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### story_content
Story content versions.

```sql
- id (UUID, PK)
- story_id (UUID, FK → short_stories)
- content (TEXT)
- version (INT)
- created_at (TIMESTAMP)
```

### story_tags
Junction table for story-tag relationships.

```sql
- story_id (UUID, FK → short_stories, PK)
- tag_id (UUID, FK → tags, PK)
```

### novels
Novel entries with chapter structure.

```sql
- id (UUID, PK)
- title_bengali (VARCHAR)
- title_english (VARCHAR)
- slug (VARCHAR, unique)
- synopsis (TEXT)
- category_id (UUID, FK → categories)
- author_id (UUID, FK → users)
- cover_image_url (VARCHAR)
- total_chapters (INT)
- completed (BOOLEAN)
- is_published (BOOLEAN)
- publish_date (TIMESTAMP)
- featured (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### novel_chapters
Individual novel chapters.

```sql
- id (UUID, PK)
- novel_id (UUID, FK → novels)
- chapter_number (INT)
- title_bengali (VARCHAR)
- title_english (VARCHAR)
- content (TEXT)
- reading_time_minutes (INT)
- view_count (INT)
- is_published (BOOLEAN)
- publish_date (TIMESTAMP)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- UNIQUE (novel_id, chapter_number)
```

### novel_tags
Junction table for novel-tag relationships.

```sql
- novel_id (UUID, FK → novels, PK)
- tag_id (UUID, FK → tags, PK)
```

### music_albums
Music albums/collections.

```sql
- id (UUID, PK)
- title_bengali (VARCHAR)
- title_english (VARCHAR)
- slug (VARCHAR, unique)
- description (TEXT)
- cover_image_url (VARCHAR)
- release_date (DATE)
- total_tracks (INT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### music_tracks
Individual music tracks.

```sql
- id (UUID, PK)
- title_bengali (VARCHAR)
- title_english (VARCHAR)
- slug (VARCHAR, unique)
- description (TEXT)
- artist_name (VARCHAR)
- album_id (UUID, FK → music_albums)
- category_id (UUID, FK → categories)
- audio_url (VARCHAR)
- cover_image_url (VARCHAR)
- duration_seconds (INT)
- lyrics (TEXT)
- view_count (INT)
- play_count (INT)
- is_published (BOOLEAN)
- publish_date (TIMESTAMP)
- featured (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### music_tags
Junction table for music-tag relationships.

```sql
- track_id (UUID, FK → music_tracks, PK)
- tag_id (UUID, FK → tags, PK)
```

## Management Tables

### ad_placements
AdSense and custom ad configurations.

```sql
- id (UUID, PK)
- name (VARCHAR)
- position (VARCHAR) - header, sidebar, footer, between_stanzas, before_audio
- ad_code (TEXT)
- ad_type (VARCHAR) - adsense, custom
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### analytics
User engagement tracking.

```sql
- id (UUID, PK)
- content_type (VARCHAR) - poem, story, novel_chapter, music
- content_id (UUID)
- user_session_id (VARCHAR)
- action (VARCHAR) - view, read_complete, play_complete
- duration_seconds (INT)
- page_url (VARCHAR)
- referrer (VARCHAR)
- user_agent (VARCHAR)
- ip_address (VARCHAR)
- created_at (TIMESTAMP)
```

**Indexes:**
- `idx_analytics_content` - For content-specific analytics
- `idx_analytics_created_at` - For time-range queries

### seo_metadata
SEO information for pages.

```sql
- id (UUID, PK)
- page_slug (VARCHAR, unique)
- meta_title (VARCHAR)
- meta_description (VARCHAR)
- meta_keywords (VARCHAR)
- og_image_url (VARCHAR)
- canonical_url (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## Sample Data

### Categories

**Poems:**
- প্রেম (Prem) - Love poetry
- প্রকৃতি (Prakriti) - Nature poetry
- বিরহ (Biroho) - Separation/longing
- সামাজিক (Samajik) - Social commentary

**Stories/Novels:**
- ছোট গল্প (Chhoto Golpo) - Short stories
- রোমান্টিক (Romantic)
- নাটকীয় (Dramatic)

**Music:**
- আধুনিক (Adhunik) - Modern
- ঐতিহ্যবাহী (Aitihasik) - Traditional
- লোকসংগীত (Loksangeet) - Folk

## Query Performance

### Common Queries

**Get published poems:**
```sql
SELECT * FROM poems
WHERE is_published = true
ORDER BY publish_date DESC
LIMIT 12;
```

**Get featured content:**
```sql
SELECT * FROM poems
WHERE featured = true AND is_published = true
ORDER BY publish_date DESC;
```

**Get category with poems:**
```sql
SELECT c.*, COUNT(p.id) as poem_count
FROM categories c
LEFT JOIN poems p ON c.id = p.category_id AND p.is_published = true
WHERE c.type = 'poem'
GROUP BY c.id;
```

**Get novel with all chapters:**
```sql
SELECT n.*, array_agg(ch.id) as chapter_ids
FROM novels n
LEFT JOIN novel_chapters ch ON n.id = ch.novel_id
WHERE n.slug = $1
GROUP BY n.id;
```

## Migrations

Run migrations to initialize schema:

```bash
psql -U postgres -d bangla_kobita < database/schema.sql
```

For incremental migrations, create files in `database/migrations/`:
```
001_initial_schema.sql
002_add_seo_table.sql
003_add_audio_support.sql
```

## Backup Strategy

### Daily Backup
```bash
pg_dump -U postgres bangla_kobita > backup_$(date +%Y%m%d).sql
```

### Restore Backup
```bash
psql -U postgres bangla_kobita < backup_20260205.sql
```

## Foreign Key Relationships

- `poems.category_id` → `categories.id`
- `poems.author_id` → `users.id`
- `poem_tags.poem_id` → `poems.id`
- `poem_tags.tag_id` → `tags.id`
- `short_stories.category_id` → `categories.id`
- `story_content.story_id` → `short_stories.id`
- `novels.category_id` → `categories.id`
- `novel_chapters.novel_id` → `novels.id`
- `music_tracks.album_id` → `music_albums.id`
- `music_tracks.category_id` → `categories.id`

All foreign keys have `ON DELETE CASCADE` to maintain referential integrity.

---

**Schema Version:** 1.0  
**Last Updated:** February 2026
