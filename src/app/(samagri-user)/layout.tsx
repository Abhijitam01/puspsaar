'use client'

import React from 'react'
import { Footer } from '@/components/layout/footer'
import TopNavbar from '@/components/user/navigation/top-header'

export default function EcommerceLayout({
  children,
}: { 
  children: React.ReactNode
}) {
  return (
    <div className="relative flex flex-col min-h-screen w-full bg-background">
      {/* Header */}
      <TopNavbar />
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
