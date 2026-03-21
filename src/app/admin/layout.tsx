"use client";

import { AdminSidebarModern } from '@/components/admin/admin-navbar/admin-sidebar';
import ModeToggle from '@/components/admin/admin-navbar/toggle-mode';
import { Separator } from '@/components/ui/separator';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeProvider } from 'next-themes';
import { Bell } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider className="flex h-screen">
        <AdminSidebarModern />
        <div className="flex flex-col flex-1 min-w-0">
          <header className="sticky top-0 z-20 flex h-16 items-center px-4 border-b">
            <SidebarTrigger className="mr-2" />
            <Separator orientation="vertical" className="mx-2 h-6" />
            <div>
              <h1 className="font-semibold text-sm">Puspsaar Admin</h1>
            </div>
            <div className="flex items-center gap-6 ml-auto">
              <Bell className='h-[2.5rem] w-[2.5rem] transition-all dark:bg-muted-foreground/5 hover:cursor-pointer rounded-full p-3' />
              <ModeToggle  />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}