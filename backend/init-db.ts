import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const db = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'bangla_kobita',
});

async function initializeDatabase() {
  try {
    console.log('Connecting to database...');
    const client = await db.connect();
    
    console.log('Reading schema file...');
    const schemaPath = path.join(process.cwd(), '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    
    console.log('Executing schema...');
    await client.query(schema);
    
    console.log('✅ Database initialized successfully!');
    client.release();
    await db.end();
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
