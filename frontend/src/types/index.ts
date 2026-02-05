// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// User types
export interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  bio?: string;
  avatar_url?: string;
  role: 'admin' | 'user';
  created_at: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  type: 'poem' | 'story' | 'music';
  icon_url?: string;
  display_order: number;
}

// Tag types
export interface Tag {
  id: string;
  name: string;
  slug: string;
  type: 'poem' | 'story' | 'music';
  usage_count: number;
}

// Poem types
export interface Poem {
  id: string;
  title_bengali: string;
  title_english?: string;
  slug: string;
  content: string;
  description?: string;
  category_id?: string;
  category?: Category;
  cover_image_url?: string;
  audio_url?: string;
  reading_time_minutes?: number;
  view_count: number;
  is_published: boolean;
  publish_date?: string;
  featured: boolean;
  tags?: Tag[];
  created_at: string;
  updated_at: string;
}

export interface CreatePoemDto {
  title_bengali: string;
  title_english?: string;
  content: string;
  description?: string;
  category_id?: string;
  cover_image?: File;
  audio_file?: File;
  tags?: string[];
  is_published?: boolean;
  publish_date?: string;
}

// Story types
export interface StoryContent {
  id: string;
  story_id: string;
  content: string;
  version: number;
  created_at: string;
}

export interface Story {
  id: string;
  title_bengali: string;
  title_english?: string;
  slug: string;
  summary?: string;
  category_id?: string;
  category?: Category;
  cover_image_url?: string;
  reading_time_minutes?: number;
  view_count: number;
  is_published: boolean;
  publish_date?: string;
  featured: boolean;
  content?: StoryContent;
  tags?: Tag[];
  created_at: string;
  updated_at: string;
}

export interface CreateStoryDto {
  title_bengali: string;
  title_english?: string;
  summary?: string;
  content: string;
  category_id?: string;
  cover_image?: File;
  tags?: string[];
  is_published?: boolean;
  publish_date?: string;
}

// Novel types
export interface NovelChapter {
  id: string;
  novel_id: string;
  chapter_number: number;
  title_bengali?: string;
  title_english?: string;
  content: string;
  reading_time_minutes?: number;
  view_count: number;
  is_published: boolean;
  publish_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Novel {
  id: string;
  title_bengali: string;
  title_english?: string;
  slug: string;
  synopsis?: string;
  category_id?: string;
  category?: Category;
  cover_image_url?: string;
  total_chapters: number;
  completed: boolean;
  is_published: boolean;
  publish_date?: string;
  featured: boolean;
  chapters?: NovelChapter[];
  tags?: Tag[];
  created_at: string;
  updated_at: string;
}

export interface CreateNovelDto {
  title_bengali: string;
  title_english?: string;
  synopsis?: string;
  category_id?: string;
  cover_image?: File;
  tags?: string[];
}

export interface CreateNovelChapterDto {
  chapter_number: number;
  title_bengali?: string;
  title_english?: string;
  content: string;
  is_published?: boolean;
  publish_date?: string;
}

// Music types
export interface MusicAlbum {
  id: string;
  title_bengali: string;
  title_english?: string;
  slug: string;
  description?: string;
  cover_image_url?: string;
  release_date?: string;
  total_tracks: number;
  created_at: string;
}

export interface MusicTrack {
  id: string;
  title_bengali: string;
  title_english?: string;
  slug: string;
  description?: string;
  artist_name?: string;
  album_id?: string;
  album?: MusicAlbum;
  audio_url: string;
  cover_image_url?: string;
  duration_seconds?: number;
  lyrics?: string;
  view_count: number;
  play_count: number;
  is_published: boolean;
  publish_date?: string;
  featured: boolean;
  tags?: Tag[];
  created_at: string;
  updated_at: string;
}

export interface CreateMusicTrackDto {
  title_bengali: string;
  title_english?: string;
  description?: string;
  artist_name?: string;
  album_id?: string;
  audio_file: File;
  cover_image?: File;
  lyrics?: string;
  tags?: string[];
  is_published?: boolean;
  publish_date?: string;
}

// Ad types
export interface AdPlacement {
  id: string;
  name: string;
  position: 'header' | 'sidebar' | 'footer' | 'between_stanzas' | 'before_audio';
  ad_code?: string;
  ad_type: 'adsense' | 'custom';
  is_active: boolean;
}

// Analytics types
export interface AnalyticsEvent {
  content_type: 'poem' | 'story' | 'novel_chapter' | 'music';
  content_id: string;
  action: 'view' | 'read_complete' | 'play_complete';
  duration_seconds?: number;
}

// SEO types
export interface SeoMetadata {
  id: string;
  page_slug: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_image_url?: string;
  canonical_url?: string;
}
