import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { db } from '../src/db/index'
import { users } from '../src/db/schema'
import { eq } from 'drizzle-orm'
import * as bcrypt from 'bcryptjs'

const adminEmail = process.env.ADMIN_EMAIL || 'admin@puspsaar.com'
const adminPassword = process.env.ADMIN_PASSWORD || 'PuspsaarAdmin2026!'

async function createAdmin() {
  console.log('--- Establishing Admin Credentials ---')
  console.log(`Setting up account for: ${adminEmail}`)

  try {
    // Check if user already exists
    const existing = await db.select().from(users).where(eq(users.email, adminEmail)).limit(1);

    if (existing.length > 0) {
      console.log('Account status: ALREADY ACTIVE.')
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Insert admin
    await db.insert(users).values({
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Account status: SUCCESSFULLY CREATED.')
    console.log('Credentials provisioned via Drizzle/NeonDB.')
  } catch (error: any) {
    console.error('Provisioning failed:', error.message)
  }
}

createAdmin()
