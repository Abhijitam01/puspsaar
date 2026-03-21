'use client'
import { LoginForm } from '@/components/admin/loginpage/login-form'
import React from 'react'

export default function LoginPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      {/* Left Section */}
      <div className="relative hidden lg:block overflow-hidden">
        {/* Background Image */}
        <img
          src="https://plus.unsplash.com/premium_photo-1729038870223-43539d44d5bd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3113"
          alt="Login background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Footer */}
        <div className="absolute bottom-6 left-12 text-sm text-gray-200 opacity-90 z-10">
          © 2025 Velaire House. All rights reserved.
        </div>
      </div>

      {/* Right Section (Login Form) */}
      <div className="flex items-center justify-center p-7 relative overflow-hidden bg-white">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 to-transparent pointer-events-none"></div>

        <div className="w-full max-w-lg p-8 relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <img
              src="/logo.png"
              alt="Velaire House Logo"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
          {/* Login Form */}
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
