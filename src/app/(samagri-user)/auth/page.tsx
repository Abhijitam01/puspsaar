'use client'
import AuthPage from '@/components/layout/user-login'
import React, { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

function LoginPage() {
  return (
    <div>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-[#6B6B6B]" />
        </div>
      }>
        <AuthPage />
      </Suspense>
    </div>
  )
}

export default LoginPage