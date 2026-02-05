# API Documentation - Bangla Kobita

Base URL: `http://localhost:5000/api`

## Authentication

All admin endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

All responses are JSON:

```json
{
  "data": {},
  "message": "Success message",
  "status": 200
}
```

## Poems Endpoints

### Get All Poems

```
GET /poems
```

**Query Parameters:**
- `page` (number) - Page number, default: 1
- `limit` (number) - Items per page, default: 12
- `category` (string) - Filter by category ID
- `tag` (string) - Filter by tag ID

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title_bengali": "কবিতার নাম",
      "title_english": "Poem Title",
      "slug": "poem-slug",
      "content": "Poem text...",
      "description": "Short description",
      "category_id": "uuid",
      "view_count": 42,
      "is_published": true,
      "publish_date": "2026-02-05T00:00:00Z",
      "featured": false,
      "created_at": "2026-02-05T10:30:00Z",
      "updated_at": "2026-02-05T10:30:00Z"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 12
}
```

### Get Single Poem

```
GET /poems/:slug
```

**Response:** Same as above (single object)

### Create Poem (Admin Only)

```
POST /poems
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `title_bengali` (string, required)
- `title_english` (string)
- `content` (string, required)
- `description` (string)
- `category_id` (string)
- `is_published` (boolean)
- `publish_date` (ISO date string)
- `cover_image` (file)
- `audio_file` (file)

**Response:** Created poem object

### Update Poem (Admin Only)

```
PUT /poems/:id
Authorization: Bearer <token>
```

**Body:** Same fields as create (all optional)

### Delete Poem (Admin Only)

```
DELETE /poems/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Poem deleted successfully"
}
```

## Stories Endpoints

### Get All Stories

```
GET /stories
```

Same query parameters as poems.

### Get Single Story

```
GET /stories/:slug
```

### Create Story (Admin Only)

```
POST /stories
Authorization: Bearer <token>
```

**Fields:** Similar to poems

### Update Story

```
PUT /stories/:id
Authorization: Bearer <token>
```

### Delete Story

```
DELETE /stories/:id
Authorization: Bearer <token>
```

## Novels Endpoints

### Get All Novels

```
GET /novels
```

### Get Novel with Chapters

```
GET /novels/:slug
```

### Get All Chapters

```
GET /novels/:novelId/chapters
```

### Get Single Chapter

```
GET /novels/:novelId/chapters/:chapterNumber
```

### Create Novel (Admin Only)

```
POST /novels
Authorization: Bearer <token>
```

**Fields:**
- `title_bengali` (required)
- `title_english`
- `synopsis`
- `category_id`
- `cover_image` (file)

### Add Chapter (Admin Only)

```
POST /novels/:novelId/chapters
Authorization: Bearer <token>
```

**Fields:**
- `chapter_number` (required)
- `title_bengali`
- `title_english`
- `content` (required)
- `is_published` (boolean)

### Update Chapter

```
PUT /novels/:novelId/chapters/:chapterNumber
Authorization: Bearer <token>
```

### Delete Chapter

```
DELETE /novels/:novelId/chapters/:chapterNumber
Authorization: Bearer <token>
```

## Music Endpoints

### Get All Tracks

```
GET /music
```

**Query Parameters:**
- `page` (number)
- `limit` (number)
- `album` (string) - Album ID

### Get Single Track

```
GET /music/:slug
```

### Get All Albums

```
GET /music/albums
```

### Create Track (Admin Only)

```
POST /music
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Fields:**
- `title_bengali` (required)
- `title_english`
- `description`
- `artist_name`
- `album_id`
- `audio_file` (file, required)
- `cover_image` (file)
- `lyrics` (text)
- `is_published` (boolean)

### Update Track

```
PUT /music/:id
Authorization: Bearer <token>
```

### Delete Track

```
DELETE /music/:id
Authorization: Bearer <token>
```

## Categories Endpoints

### Get Categories

```
GET /categories?type=poem
```

**Query Parameters:**
- `type` - 'poem', 'story', or 'music'

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "প্রেম",
      "slug": "prem",
      "description": "Love poems",
      "type": "poem",
      "display_order": 1
    }
  ]
}
```

### Create Category (Admin Only)

```
POST /categories
Authorization: Bearer <token>
```

**Fields:**
- `name` (required)
- `slug` (required)
- `description`
- `type` (required)
- `display_order`

## Tags Endpoints

### Get Tags

```
GET /tags?type=poem
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "প্রকৃতি",
      "slug": "prokiti",
      "type": "poem",
      "usage_count": 15
    }
  ]
}
```

### Create Tag (Admin Only)

```
POST /tags
Authorization: Bearer <token>
```

**Fields:**
- `name` (required)
- `slug` (required)
- `type` (required)

## Analytics Endpoints

### Track Event

```
POST /analytics
```

**Body:**
```json
{
  "content_type": "poem",
  "content_id": "uuid",
  "action": "view",
  "duration_seconds": 300
}
```

### Get Analytics

```
GET /analytics
Authorization: Bearer <token>
```

**Query Parameters:**
- `startDate` - ISO date string
- `endDate` - ISO date string
- `contentType` - Filter by type

## Admin Endpoints

### Dashboard Stats

```
GET /admin/stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "data": {
    "total_poems": 50,
    "total_stories": 20,
    "total_music": 15,
    "total_views": 10000,
    "this_month_views": 2500,
    "featured_content": []
  }
}
```

### Get Ad Placements

```
GET /admin/ads
Authorization: Bearer <token>
```

### Update Ad Placement

```
PUT /admin/ads/:id
Authorization: Bearer <token>
```

**Fields:**
- `name`
- `position`
- `ad_code`
- `ad_type`
- `is_active`

## Error Responses

### 400 Bad Request

```json
{
  "error": "Invalid input data",
  "status": 400
}
```

### 401 Unauthorized

```json
{
  "error": "Unauthorized",
  "status": 401
}
```

### 403 Forbidden

```json
{
  "error": "Forbidden: Admin access required",
  "status": 403
}
```

### 404 Not Found

```json
{
  "error": "Resource not found",
  "status": 404
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error",
  "status": 500
}
```

## Rate Limiting

Currently not implemented but recommended for production:
- 100 requests per minute per IP (general)
- 10 requests per minute for auth endpoints

## Pagination

Most list endpoints support pagination:

```
?page=1&limit=12
```

- Default page: 1
- Default limit: 12
- Maximum limit: 100

## Sorting

Endpoints support sorting:

```
?sort=publish_date&order=desc
```

- Default sort: publish_date
- Default order: desc

## Filtering

Content can be filtered by:
- `category` - Category ID
- `tag` - Tag ID
- `status` - published/draft
- `featured` - boolean

## Search

Full-text search (to be implemented):

```
GET /search?q=query&type=poem
```

---

**API Version:** 1.0  
**Last Updated:** February 2026
