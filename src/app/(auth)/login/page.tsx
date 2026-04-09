'use client'

import React, { Suspense } from 'react'
import AuthPage from '@/components/layout/user-login'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative ">
      {/* Main content above overlay */}
      <div className="relative z-10 w-full px-4">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-[#6B6B6B]" />
          </div>
        }>
          <AuthPage />
        </Suspense>
      </div>
    </div>
  )
}
