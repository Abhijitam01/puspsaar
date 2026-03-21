'use client'

import React from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from '@/components/ui/separator'
import { Footer } from '@/components/layout/footer'
import TopNavbar from '@/components/user/navigation/top-header'



export default function EcommerceLayout({
  children,
}: { 
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="relative flex flex-col min-h-screen w-full bg-gray-50">
        {/* Sticky Header */}
        <div className="sticky  top-0 z-50 w-full backdrop-blur-sm bg-background/95 supports-[backdrop-filter]:bg-background/60">
          <TopNavbar />
        </div>
        {/* Main Content with Max Width Container */}
        <ScrollArea className="flex-grow">
          <main className="relative mx-auto w-full max-w-[2100px] px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="flex-1 py-2 sm:py-4 md:py-6 lg:py-8">
              {children}
            </div>
          </main>
        </ScrollArea>

        {/* Footer */}
        <div className="w-full">
          <div className="mx-auto w-full max-w-[2100px] px-2 sm:px-4 md:px-6 lg:px-8">
            <Separator className="dark:bg-gray-200" />
            <Footer />
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}