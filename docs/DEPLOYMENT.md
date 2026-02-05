# Deployment Guide - Bangla Kobita, Golpo, O Gaan

## Production Deployment Checklist

- [ ] Database backed up and secured
- [ ] Environment variables configured
- [ ] SSL certificate installed
- [ ] CDN configured for media files
- [ ] Analytics and AdSense set up
- [ ] Email notifications configured
- [ ] Monitoring and alerting enabled
- [ ] Daily backups scheduled

## Hosting Recommendations

### Frontend (Next.js)

**Vercel** (Recommended)
- Free tier available
- Automatic deployments from Git
- Global CDN included
- Environment variables management
- Zero-configuration deployment

**Deployment:**
```bash
npm install -g vercel
vercel
```

### Backend (Node.js)

**DigitalOcean App Platform**
- Affordable ($12-40/month)
- Good Southeast Asia coverage
- PostgreSQL managed database
- Auto-scaling available
- Easy Git integration

**Railway.app**
- Simple deployment
- Good for startups
- PostgreSQL included
- GitHub integration

**Alternative: AWS, Google Cloud, Azure**

## Environment Setup

### Production Environment Variables

**Frontend (Vercel):**
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxx
```

**Backend (DigitalOcean/Railway):**
```
NODE_ENV=production
PORT=5000
DB_HOST=postgres-db.example.com
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=secure_password_here
DB_NAME=bangla_kobita
JWT_SECRET=very_secure_random_string_here
CORS_ORIGIN=https://yourdomain.com
SSL_CERT=/path/to/cert
SSL_KEY=/path/to/key
```

## Database Setup

### PostgreSQL Managed Database

1. Create managed database on hosting provider
2. Initialize schema:
```bash
psql -h db-host.com -U postgres -d bangla_kobita < database/schema.sql
```

3. Create backups:
```bash
pg_dump -h db-host.com -U postgres -F c bangla_kobita > backup.dump
```

## Domain & SSL

### Domain Setup

1. Register domain on Namecheap, GoDaddy, or your preferred registrar
2. Point nameservers to:
   - **Frontend**: Vercel nameservers (if using Vercel)
   - **Backend**: Your hosting provider's nameservers

### SSL Certificate

**Free SSL (Let's Encrypt):**

```bash
# Using Certbot
sudo certbot certonly --standalone -d yourdomain.com -d api.yourdomain.com
```

**Auto-renewal:**
```bash
# Add to crontab
0 0 1 * * certbot renew --quiet
```

## CDN Configuration

### CloudFlare (Recommended)

1. Add domain to CloudFlare
2. Configure DNS records
3. Enable:
   - Full page caching
   - Image optimization
   - Gzip compression
   - Minify CSS/JS

### For Media Files

Use CloudFlare or AWS CloudFront:

```
Frontend: yourdomain.com → Vercel
API: api.yourdomain.com → DigitalOcean
Media: cdn.yourdomain.com → CloudFlare/CloudFront
```

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to DigitalOcean
        run: |
          ssh-keyscan ${{ secrets.DO_HOST }} >> ~/.ssh/known_hosts
          ssh -i ~/.ssh/id_rsa deploy@${{ secrets.DO_HOST }} 'cd /app && git pull && npm install && npm run build && pm2 restart app'

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Monitoring & Analytics

### Google Analytics 4

1. Create GA4 property for your domain
2. Add measurement ID to `.env`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

3. Verify tracking in Analytics dashboard

### Google AdSense

1. Sign up at AdSense
2. Submit site for approval (24-72 hours)
3. Get Client ID and add to environment
4. Configure ad units in dashboard

### Server Monitoring

**Uptime Monitoring:**
- UptimeRobot (free tier)
- Pingdom
- New Relic

**Error Tracking:**
```bash
npm install --save @sentry/node
```

Configure in backend `index.ts`:
```typescript
import * as Sentry from "@sentry/node";

Sentry.init({ dsn: process.env.SENTRY_DSN });
app.use(Sentry.Handlers.errorHandler());
```

## Performance Optimization

### Frontend Optimization

1. Enable Next.js Image Optimization
2. Compress images before upload
3. Use CDN for static assets
4. Enable browser caching

### Backend Optimization

1. Use connection pooling:
```typescript
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

2. Add Redis caching for frequent queries:
```bash
npm install redis
```

3. Implement rate limiting
4. Use gzip compression

### Database Optimization

```sql
-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM poems WHERE is_published = true;

-- Vacuum and analyze
VACUUM ANALYZE;

-- Regular maintenance
VACUUM ANALYZE poems;
VACUUM ANALYZE categories;
```

## Backup & Recovery

### Automated Backups

**Using DigitalOcean Spaces:**

```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="bangla_kobita_${DATE}.dump"

pg_dump -h $DB_HOST -U $DB_USER -F c $DB_NAME > $BACKUP_FILE

# Upload to Spaces
s3cmd put $BACKUP_FILE s3://your-bucket/$BACKUP_FILE

# Keep only last 30 days
find . -name "bangla_kobita_*.dump" -mtime +30 -delete
```

Schedule with cron:
```bash
0 2 * * * /home/deploy/backup.sh
```

### Recovery Procedure

```bash
# Restore from backup
pg_restore -h $DB_HOST -U $DB_USER -d bangla_kobita backup.dump

# Or for SQL format
psql -h $DB_HOST -U $DB_USER bangla_kobita < backup.sql
```

## Scaling Strategy

### Phase 1 (0-1000 visitors/day)
- Single server setup
- Basic monitoring
- Manual backups

### Phase 2 (1000-10000 visitors/day)
- Add Redis caching
- Enable CDN
- Automated backups
- Load balancing

### Phase 3 (10000+ visitors/day)
- Horizontal scaling
- Database replication
- Microservices architecture
- Advanced caching

## Security Best Practices

### HTTPS Enforcement

```nginx
# Nginx config
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;
    ssl_certificate /etc/ssl/certs/yourdomain.com.crt;
    ssl_certificate_key /etc/ssl/private/yourdomain.com.key;
    # ...
}
```

### Environment Security

- Never commit `.env` files
- Use secrets management
- Rotate keys regularly
- Use strong database passwords

### API Security

- Enable CORS properly
- Implement rate limiting
- Validate all inputs
- Use HTTPS only

## Post-Deployment

### Testing Checklist

- [ ] All pages load correctly
- [ ] Audio/image streaming works
- [ ] Search functionality works
- [ ] Analytics tracking active
- [ ] Ads displaying properly
- [ ] Admin panel accessible
- [ ] Mobile responsive
- [ ] Dark mode working
- [ ] Performance acceptable (<2s load time)

### Go-Live Checklist

- [ ] Domain active
- [ ] SSL working
- [ ] Backups functioning
- [ ] Monitoring configured
- [ ] Support email set up
- [ ] Social media linked
- [ ] SEO verified
- [ ] Analytics receiving data

## Troubleshooting

### High Database Load
```sql
-- Find slow queries
SELECT query, calls, mean_time FROM pg_stat_statements 
ORDER BY mean_time DESC LIMIT 10;

-- Check table sizes
SELECT 
  schemaname, tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename))
FROM pg_tables 
WHERE schemaname != 'information_schema'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Memory Issues
```bash
# Monitor server
top -o %MEM
free -h

# Check Node.js memory
node --max-old-space-size=4096 dist/index.js
```

### Connection Pool Exhaustion
```typescript
console.log(pool.totalCount);
console.log(pool.idleCount);
```

## Monthly Maintenance

- [ ] Review analytics
- [ ] Check error logs
- [ ] Update dependencies
- [ ] Verify backups
- [ ] Monitor security
- [ ] Optimize slow queries
- [ ] Update SSL certs (if needed)
- [ ] Review costs

---

**Ready for Production?** Contact your hosting provider or read their specific documentation for additional setup steps.

**Last Updated:** February 2026
