-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(255),
  role VARCHAR(50) DEFAULT 'viewer',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  type VARCHAR(50),
  icon_url VARCHAR(255),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(50),
  usage_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create poems table
CREATE TABLE IF NOT EXISTS poems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_bengali VARCHAR(255) NOT NULL,
  title_english VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  author_id UUID REFERENCES users(id),
  cover_image_url VARCHAR(255),
  audio_url VARCHAR(255),
  reading_time_minutes INT DEFAULT 5,
  view_count INT DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  publish_date TIMESTAMP,
  scheduled_publish_date TIMESTAMP,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create poem_tags table
CREATE TABLE IF NOT EXISTS poem_tags (
  poem_id UUID REFERENCES poems(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (poem_id, tag_id)
);

-- Create short_stories table
CREATE TABLE IF NOT EXISTS short_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_bengali VARCHAR(255) NOT NULL,
  title_english VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  summary TEXT,
  category_id UUID REFERENCES categories(id),
  author_id UUID REFERENCES users(id),
  cover_image_url VARCHAR(255),
  reading_time_minutes INT DEFAULT 10,
  view_count INT DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  publish_date TIMESTAMP,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create story_content table
CREATE TABLE IF NOT EXISTS story_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID REFERENCES short_stories(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  version INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create story_tags table
CREATE TABLE IF NOT EXISTS story_tags (
  story_id UUID REFERENCES short_stories(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (story_id, tag_id)
);

-- Create novels table
CREATE TABLE IF NOT EXISTS novels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_bengali VARCHAR(255) NOT NULL,
  title_english VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  synopsis TEXT,
  category_id UUID REFERENCES categories(id),
  author_id UUID REFERENCES users(id),
  cover_image_url VARCHAR(255),
  total_chapters INT DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  publish_date TIMESTAMP,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create novel_chapters table
CREATE TABLE IF NOT EXISTS novel_chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  novel_id UUID REFERENCES novels(id) ON DELETE CASCADE,
  chapter_number INT NOT NULL,
  title_bengali VARCHAR(255) NOT NULL,
  title_english VARCHAR(255),
  content TEXT NOT NULL,
  reading_time_minutes INT DEFAULT 15,
  view_count INT DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  publish_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (novel_id, chapter_number)
);

-- Create novel_tags table
CREATE TABLE IF NOT EXISTS novel_tags (
  novel_id UUID REFERENCES novels(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (novel_id, tag_id)
);

-- Create music_albums table
CREATE TABLE IF NOT EXISTS music_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_bengali VARCHAR(255) NOT NULL,
  title_english VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  cover_image_url VARCHAR(255),
  release_date DATE,
  total_tracks INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create music_tracks table
CREATE TABLE IF NOT EXISTS music_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_bengali VARCHAR(255) NOT NULL,
  title_english VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  artist_name VARCHAR(255),
  album_id UUID REFERENCES music_albums(id),
  category_id UUID REFERENCES categories(id),
  audio_url VARCHAR(255),
  cover_image_url VARCHAR(255),
  duration_seconds INT,
  lyrics TEXT,
  view_count INT DEFAULT 0,
  play_count INT DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  publish_date TIMESTAMP,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create music_tags table
CREATE TABLE IF NOT EXISTS music_tags (
  track_id UUID REFERENCES music_tracks(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (track_id, tag_id)
);

-- Create ad_placements table
CREATE TABLE IF NOT EXISTS ad_placements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255),
  ad_code TEXT,
  ad_type VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_type VARCHAR(50),
  page_id UUID,
  user_id UUID,
  session_id VARCHAR(255),
  action VARCHAR(50),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_poems_slug ON poems(slug);
CREATE INDEX idx_poems_published ON poems(is_published);
CREATE INDEX idx_poems_category ON poems(category_id);
CREATE INDEX idx_poems_featured ON poems(featured);
CREATE INDEX idx_stories_slug ON short_stories(slug);
CREATE INDEX idx_stories_published ON short_stories(is_published);
CREATE INDEX idx_novels_slug ON novels(slug);
CREATE INDEX idx_music_tracks_slug ON music_tracks(slug);
CREATE INDEX idx_users_email ON users(email);

-- Insert default admin user (password: admin123)
INSERT INTO users (id, username, email, password_hash, role, is_active)
VALUES (
  gen_random_uuid(),
  'admin',
  'junaidahmedrupok@gmail.com',
  '$2b$10$YIjlrNezO5/tKds6vQyuK.FW7YUhJQ8QZ8LJ6kJzK8F5X5K5Y5Yza',
  'admin',
  TRUE
)
ON CONFLICT (email) DO NOTHING;
