'use client'

import React from 'react'
import AuthPage from '@/components/layout/user-login'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative ">
      {/* Main content above overlay */}
      <div className="relative z-10 w-full px-4">
        <AuthPage />
      </div>
    </div>
  )
}
