import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const adminEmail = 'admin@puspsaar.com'
const adminPassword = 'PuspsaarAdmin2026!'

async function createAdmin() {
  console.log('--- Establishing Admin Credentials ---')
  console.log(`Setting up account for: ${adminEmail}`)

  const { data, error } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,
    user_metadata: { role: 'admin' }
  })

  if (error) {
    if (error.message.includes('already registered')) {
      console.log('Account status: ALREADY ACTIVE.')
    } else {
      console.error('Provisioning failed:', error.message)
    }
  } else {
    console.log('Account status: SUCCESSFULLY CREATED.')
    console.log('Credentials provisioned via service role.')
  }
}

createAdmin()
