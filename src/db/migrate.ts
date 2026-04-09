import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  console.log('⏳ Running migrations...');

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  const start = Date.now();

  try {
    // Note: drizzle-orm/neon-http/migrator uses a specific folder structure for migrations
    // If we use 'push' we don't necessarily need this script, but for formal migrations we do.
    // For now, let's just make sure we have a way to run migrations.
    await migrate(db, { migrationsFolder: 'drizzle' });
    
    const end = Date.now();
    console.log(`✅ Migrations completed in ${end - start}ms`);
  } catch (error) {
    console.error('❌ Migration failed');
    console.error(error);
    process.exit(1);
  }
};

runMigrate();
