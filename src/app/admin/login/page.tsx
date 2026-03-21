'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { LogIn, ShieldCheck } from 'lucide-react';

import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success('Access Granted. Welcome, Administrator.');
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] bg-[#C6A969]/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[25%] -right-[10%] w-[50%] h-[50%] bg-[#C6A969]/5 rounded-full blur-[120px]" />
      </div>

      <Card className="w-full max-w-md border-white/5 bg-black/40 backdrop-blur-2xl shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#C6A969]/10 flex items-center justify-center border border-[#C6A969]/20">
            <ShieldCheck className="w-6 h-6 text-[#C6A969]" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-serif text-white tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Maison Puspsaar
            </CardTitle>
            <CardDescription className="text-white/40 text-xs font-medium uppercase tracking-[0.2em]">
              Administrative Entrance
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-white/60 ml-1">
                Admin Identifier
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@puspsaar.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus:border-[#C6A969] transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" title="password" className="text-xs font-semibold uppercase tracking-widest text-white/60 ml-1">
                Passcode
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus:border-[#C6A969] transition-all"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#C6A969] text-black hover:bg-[#d4b87a] h-12 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg transition-all"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Request Access
                </span>
              )}
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <Link href="/" className="text-[10px] text-white/30 uppercase tracking-[0.2em] hover:text-[#C6A969] transition-colors">
              Return to Frontispiece
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
