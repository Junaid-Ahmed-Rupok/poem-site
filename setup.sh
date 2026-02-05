#!/bin/bash

echo "🚀 Bangla Kobita - Setup Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js 18+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found: $(node -v)${NC}"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL not found. Please install PostgreSQL${NC}"
    exit 1
fi
echo -e "${GREEN}✓ PostgreSQL found${NC}"

# Create database
echo -e "\n${YELLOW}📝 Creating database...${NC}"
createdb bangla_kobita 2>/dev/null || echo "Database might already exist"

# Load schema
echo -e "${YELLOW}📝 Loading database schema...${NC}"
psql -d bangla_kobita < database/schema.sql

# Create admin user with bcrypt hash of "admin123"
echo -e "${YELLOW}📝 Creating admin user...${NC}"
psql -d bangla_kobita <<EOF
INSERT INTO users (id, username, email, password_hash, role, created_at)
VALUES (
  gen_random_uuid(),
  'admin',
  'junaidahmedrupok@gmail.com',
  '\$2b\$10\$YIjlrNezO5/tKds6vQyuK.FW7YUhJQ8QZ8LJ6kJzK8F5X5K5Y5Yza',
  'admin',
  NOW()
) ON CONFLICT DO NOTHING;
EOF

# Install backend dependencies
echo -e "\n${YELLOW}📦 Installing backend dependencies...${NC}"
cd backend
npm install
cd ..

# Install frontend dependencies
echo -e "\n${YELLOW}📦 Installing frontend dependencies...${NC}"
cd frontend
npm install
cd ..

# Create .env files
echo -e "\n${YELLOW}⚙️  Creating environment files...${NC}"

# Backend .env
cat > backend/.env <<EOF
DATABASE_URL=postgresql://localhost/bangla_kobita
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:3000
EOF
echo -e "${GREEN}✓ Created backend/.env${NC}"

# Frontend .env.local
cat > frontend/.env.local <<EOF
NEXT_PUBLIC_API_URL=http://localhost:5000/api
EOF
echo -e "${GREEN}✓ Created frontend/.env.local${NC}"

# Create uploads directories
mkdir -p backend/uploads
mkdir -p backend/uploads/images
mkdir -p backend/uploads/audio
echo -e "${GREEN}✓ Created upload directories${NC}"

echo -e "\n${GREEN}✅ Setup Complete!${NC}"
echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Open terminal 1 and run: ${GREEN}cd backend && npm run dev${NC}"
echo -e "2. Open terminal 2 and run: ${GREEN}cd frontend && npm run dev${NC}"
echo -e "3. Visit http://localhost:3000/admin/login"
echo -e "4. Email: ${GREEN}junaidahmedrupok@gmail.com${NC}"
echo -e "5. Password: ${GREEN}admin123${NC}"
echo -e "\n${YELLOW}🎉 Happy uploading!${NC}"
