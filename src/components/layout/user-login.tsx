'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Mail, Lock, User, Phone } from "lucide-react";

export default function UserLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();
    
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const redirectTo = searchParams.get('redirectTo') || '/profile';

    // Redirect if already logged in
    useEffect(() => {
        if (status === 'authenticated') {
            router.push(redirectTo);
        }
    }, [status, router, redirectTo]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast.error("Invalid email or password");
            } else {
                toast.success("Logged in successfully");
                router.push(redirectTo);
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, phone }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "Signup failed");
            } else {
                toast.success("Account created successfully. You can now login.");
                setMode('login');
                setPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const buttonLoading = isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    );

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-[#6B6B6B]" />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center py-16 px-4">
            <div className="w-full max-w-md border border-[#E0E0E0] bg-white p-8 sm:p-10 shadow-sm transition-all hover:shadow-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 border border-[#E0E0E0] flex items-center justify-center mx-auto mb-6 bg-[#F9F9F9]">
                        <svg className="w-7 h-7 text-[#1C1C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#888888] mb-2">Maison Puspsaar</p>
                    <h1 className="text-2xl font-bold text-[#1C1C1C] tracking-tight" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-sm text-[#6B6B6B] mt-2 font-light">
                        {mode === 'login' ? 'Access your curated collection' : 'Begin your olfactory journey'}
                    </p>
                </div>

                <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-4">
                    {mode === 'signup' && (
                        <>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1C1C1C] flex items-center gap-2">
                                    <User size={12} /> Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Rahul Dev"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-[#E0E0E0] px-4 py-3 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-all bg-[#FDFDFD]"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1C1C1C] flex items-center gap-2">
                                    <Phone size={12} /> Phone Number (Optional)
                                </label>
                                <input
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full border border-[#E0E0E0] px-4 py-3 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-all bg-[#FDFDFD]"
                                />
                            </div>
                        </>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1C1C1C] flex items-center gap-2">
                            <Mail size={12} /> Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-[#E0E0E0] px-4 py-3 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-all bg-[#FDFDFD]"
                            required
                        />
                    </div>

                    <div className="space-y-1.5 relative">
                        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1C1C1C] flex items-center gap-2">
                            <Lock size={12} /> {mode === 'login' ? 'Password' : 'Create Password'}
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-[#E0E0E0] px-4 py-3 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-all bg-[#FDFDFD]"
                                required
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ABABAB] hover:text-black transition-colors"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {mode === 'signup' && (
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1C1C1C] flex items-center gap-2">
                                <Lock size={12} /> Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full border border-[#E0E0E0] px-4 py-3 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-all bg-[#FDFDFD]"
                                required
                            />
                        </div>
                    )}

                    {mode === 'login' && (
                        <div className="text-right">
                            <button type="button" className="text-[10px] font-semibold text-[#6B6B6B] hover:text-black hover:underline transition-all uppercase tracking-wider">
                                Forgot password?
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1C1C1C] transition-all disabled:opacity-50 flex items-center justify-center mt-2"
                    >
                        {buttonLoading}
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                    </button>

                    <p className="text-center text-xs text-[#6B6B6B] pt-4">
                        {mode === 'login' ? (
                            <>
                                New to Puspsaar?{' '}
                                <button type="button" onClick={() => setMode('signup')} className="text-[#1C1C1C] font-bold border-b border-black hover:pb-0.5 transition-all">
                                    Create An Account
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button type="button" onClick={() => setMode('login')} className="text-[#1C1C1C] font-bold border-b border-black hover:pb-0.5 transition-all">
                                    Sign In Instead
                                </button>
                            </>
                        )}
                    </p>
                </form>
            </div>
        </div>
    );
}
