# Admin Guide - Bangla Kobita, Golpo, O Gaan

## Overview

This guide explains how to manage content on the Bangla Kobita platform.

## Getting Started

1. Access the admin panel at `/admin` (not yet implemented in MVP)
2. Log in with your credentials
3. You'll see the dashboard with overview statistics

## Managing Content

### Adding a Poem

1. Go to **কবিতা (Poems)** → **নতুন যোগ করুন (Add New)**
2. Fill in the form:
   - **শিরোনাম (বাংলা)** - Bengali title (required)
   - **Title (English)** - English transliteration (optional)
   - **কন্টেন্ট** - Poem text with rich formatting
   - **বিবরণ** - Short description
   - **কভার ছবি** - Feature image
   - **অডিও ফাইল** - Optional audio recording (MP3)
   - **ক্যাটাগরি** - Select category (Prem, Prakriti, etc.)
   - **ট্যাগ** - Add relevant tags
3. Choose to **Save as Draft** or **Publish Immediately**
4. If publishing later, set a **Scheduled Date**
5. Click **Save**

### Adding a Story

1. Go to **গল্প (Stories)** → **নতুন যোগ করুন**
2. Enter story details:
   - Title (Bengali & English)
   - Summary/synopsis
   - Full story content
   - Cover image
   - Category and tags
3. Save and publish

### Adding a Novel

Novels are structured as chapters:

1. Go to **উপন্যাস (Novels)** → **নতুন যোগ করুন**
2. Create the novel entry:
   - Title and synopsis
   - Cover image
   - Category
3. Click **নতুন অধ্যায় যোগ করুন (Add New Chapter)**
4. For each chapter:
   - Chapter number
   - Title (optional)
   - Content
   - Publish date

### Adding Music

1. Go to **গান (Music)** → **নতুন ট্র্যাক যোগ করুন**
2. Fill in details:
   - **শিরোনাম** - Song title (Bengali)
   - **অডিও ফাইল** - Upload MP3 file (required)
   - **শিল্পী নাম** - Artist name
   - **অ্যালবাম** - Select or create album
   - **কভার ইমেজ** - Album artwork
   - **গীতি** - Lyrics (optional)
   - **বর্ণনা** - Description
3. Set publishing options
4. Click **Save**

## Content Management

### Publishing & Scheduling

- **Immediate Publish** - Content goes live instantly
- **Schedule for Later** - Pick a date/time to auto-publish
- **Save as Draft** - Edit and publish anytime later

### Editing Content

1. Find the item in the content list
2. Click the **সম্পাদনা (Edit)** button
3. Make changes
4. Click **Save**

### Deleting Content

1. Find the item
2. Click the **মুছুন (Delete)** button
3. Confirm deletion

### Featured Content

To feature content on homepage:

1. Edit the item
2. Check the **বৈশিষ্ট্যযুক্ত (Featured)** checkbox
3. Save

## Media Library

### Uploading Images

1. Go to **মিডিয়া লাইব্রেরি (Media Library)**
2. Click **ছবি আপলোড করুন (Upload Images)**
3. Drag & drop or select files
4. Supported formats: JPG, PNG, WebP
5. Images are optimized automatically

### Uploading Audio

1. Go to **অডিও আপলোড করুন (Upload Audio)**
2. Select MP3, WAV, M4A, or FLAC files
3. Maximum 50MB per file
4. Audio is processed for streaming

## Categories & Tags

### Creating Categories

1. Go to **সেটিংস (Settings)** → **ক্যাটাগরি (Categories)**
2. Click **নতুন ক্যাটাগরি (New Category)**
3. Enter:
   - Name (Bengali & English)
   - Description
   - Display order
   - Optional icon
4. Save

**Standard Categories for Poems:**
- প্রেম (Prem - Love)
- প্রকৃতি (Prakriti - Nature)
- বিরহ (Biroho - Separation)
- সামাজিক (Samajik - Social)

### Managing Tags

1. Go to **ট্যাগ (Tags)**
2. Create tags as needed
3. Tags are optional but help with discovery
4. Auto-suggested during content creation

## Analytics & Performance

### Dashboard Stats

The dashboard shows:
- Total views this month
- Top content
- Recent uploads
- System health

### Tracking Content Performance

1. Go to **পরিসংখ্যান (Analytics)**
2. View:
   - Page views by content
   - Average reading time
   - Popular poems/stories
   - Music play counts
   - Referrer sources

### Engagement Metrics

- **পড়া সম্পূর্ণ হার** - Reading completion %
- **শোনার সময়** - Average listening duration
- **সোশ্যাল শেয়ার** - Share counts

## Ad Management

### Configuring Ads

1. Go to **মনিটাইজেশন (Monetization)** → **বিজ্ঞাপন (Ads)**
2. Set up AdSense:
   - Enter AdSense Client ID
   - Set ad placement preferences
3. Ad positions:
   - Header banner
   - Sidebar
   - Between poem stanzas
   - Before audio player
   - Footer

### Ad Performance

1. View **বিজ্ঞাপন আয় (Ad Earnings)** in dashboard
2. See:
   - Impressions per day
   - Click-through rate (CTR)
   - Estimated earnings
   - Top performing placements

## Settings

### Site Settings

1. Go to **সেটিংস (Settings)**
2. Configure:
   - Site title and description
   - Meta tags for SEO
   - Social media links
   - Contact information
   - Theme preferences

### User Management

1. Go to **ব্যবহারকারী (Users)**
2. Manage admin accounts
3. Set roles and permissions
4. Reset passwords if needed

## SEO Optimization

### For Each Content Item

1. Enter **মেটা শিরোনাম** (Meta Title) - up to 60 characters
2. Enter **মেটা বর্ণনা** (Meta Description) - up to 160 characters
3. Add **কীওয়ার্ড** (Keywords)
4. Enable social sharing

### For Homepage

1. Go to **সেটিংস (Settings)** → **এসইও**
2. Set:
   - Homepage meta title
   - Homepage meta description
   - Keywords
   - Favicon

## Backup & Maintenance

### Backup Content

1. Go to **টুলস (Tools)** → **ব্যাকআপ (Backup)**
2. Click **ব্যাকআপ তৈরি করুন (Create Backup)**
3. All content is saved

### System Health

1. Monitor **সিস্টেম স্বাস্থ্য (System Health)**
2. Check:
   - Database status
   - Server uptime
   - Storage usage
   - Performance metrics

## Troubleshooting

### Content Not Appearing

- Check if content is published
- Verify publish date hasn't passed
- Clear browser cache
- Check analytics for view data

### Upload Issues

- Maximum file size: 50MB for audio, 10MB for images
- Ensure file format is supported
- Check storage quota
- Try re-uploading

### Performance Issues

- Optimize large image files before upload
- Compress audio files to MP3
- Clear old analytics data
- Contact support if persistent

## Best Practices

1. **Write Clear Titles** - Use both Bengali and English
2. **Add Descriptions** - Help readers understand content
3. **Use Categories** - Organize content logically
4. **Add Tags** - Improve discoverability
5. **Upload Quality Images** - Use high-resolution covers
6. **Include Audio** - Enhance engagement with audio versions
7. **Regular Updates** - Keep site fresh with new content
8. **Monitor Analytics** - Track what works best
9. **Respond to Comments** - Build community engagement
10. **Optimize for Mobile** - Test on phones/tablets

## Support & Help

For technical issues, check:
- [SETUP.md](SETUP.md) - Installation help
- [API_DOCS.md](API_DOCS.md) - API reference
- [DATABASE.md](DATABASE.md) - Schema documentation

---

**Last Updated:** February 2026
