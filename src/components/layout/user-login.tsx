'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function UserLoginPage() {
    const router = useRouter();
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [step, setStep] = useState<'form' | 'otp'>('form');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [otpValue, setOtpValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!phoneNumber) return;
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        setStep('otp');
    };

    const handleVerifyOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (otpValue.length !== 6) return;
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        localStorage.setItem('user', JSON.stringify({
            name: name || 'User',
            phone: phoneNumber,
            email: email,
            isLoggedIn: true
        }));
        setIsLoading(false);
        router.push('/profile');
    };

    const handleGoogleAuth = () => {
        localStorage.setItem('user', JSON.stringify({
            name: 'Google User',
            email: 'user@gmail.com',
            isLoggedIn: true
        }));
        router.push('/profile');
    };

    const handleResendOTP = () => console.log('Resending OTP to:', phoneNumber);
    const handleChangePhone = () => { setStep('form'); setOtpValue(''); };

    // ---------------- OTP PAGE ----------------
    if (step === 'otp')
        return (
            <div className="flex items-center justify-center py-16 px-4">
                <div className="w-full max-w-md border border-[#E0E0E0] bg-white p-8 sm:p-10">
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 border border-[#E0E0E0] flex items-center justify-center mx-auto mb-5">
                            <svg className="w-6 h-6 text-[#1C1C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6B6B6B] mb-2">Puspsaar</p>
                        <h1 className="text-2xl font-bold text-[#1C1C1C]" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                            Verify Your Number
                        </h1>
                        <p className="text-sm text-[#6B6B6B] mt-2">
                            We sent a 6-digit code to <span className="text-[#1C1C1C] font-medium">{phoneNumber}</span>
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div className="flex justify-center">
                            <InputOTP id="otp" maxLength={6} value={otpValue} onChange={setOtpValue}>
                                <InputOTPGroup className="gap-2.5 justify-center">
                                    {[...Array(6)].map((_, i) => <InputOTPSlot key={i} index={i} />)}
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                        <p className="text-center text-xs text-[#6B6B6B]">
                            Enter the 6-digit code sent to your phone. <span className="text-[#ABABAB]">(Use 123456 for demo)</span>
                        </p>

                        <button
                            onClick={handleVerifyOTP}
                            disabled={isLoading || otpValue.length !== 6}
                            className="w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1C1C1C] transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Verifying...' : 'Verify & Continue'}
                        </button>

                        <div className="text-center space-y-1 text-xs text-[#6B6B6B]">
                            <p>
                                Didn't get the code?{' '}
                                <button onClick={(e) => { e.preventDefault(); handleResendOTP(); }} className="text-[#1C1C1C] font-semibold underline hover:no-underline">
                                    Resend
                                </button>
                            </p>
                            <p>
                                Wrong number?{' '}
                                <button onClick={(e) => { e.preventDefault(); handleChangePhone(); }} className="text-[#1C1C1C] font-semibold underline hover:no-underline">
                                    Change
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );

    // ---------------- LOGIN / SIGNUP PAGE ----------------
    return (
        <div className="flex items-center justify-center py-16 px-4">
            <div className="w-full max-w-md border border-[#E0E0E0] bg-white p-8 sm:p-10">
                <div className="text-center mb-8">
                    <div className="w-14 h-14 border border-[#E0E0E0] flex items-center justify-center mx-auto mb-5">
                        <svg className="w-6 h-6 text-[#1C1C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6B6B6B] mb-2">Puspsaar</p>
                    <h1 className="text-2xl font-bold text-[#1C1C1C]" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-sm text-[#6B6B6B] mt-1">
                        {mode === 'login' ? 'Login to your Puspsaar account' : 'Sign up to get started'}
                    </p>
                </div>

                <div className="space-y-4">
                    {mode === 'signup' && (
                        <>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C]">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-[#E0E0E0] px-4 py-2.5 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C]">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-[#E0E0E0] px-4 py-2.5 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors"
                                />
                            </div>
                        </>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C]">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full border border-[#E0E0E0] px-4 py-2.5 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors"
                        />
                    </div>

                    <button
                        onClick={handleSendOTP}
                        disabled={isLoading || !phoneNumber}
                        className="w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1C1C1C] transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Sending OTP...' : 'Send OTP'}
                    </button>

                    <div className="relative flex items-center gap-3 py-1">
                        <div className="flex-1 h-px bg-[#E0E0E0]" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#ABABAB]">Or</span>
                        <div className="flex-1 h-px bg-[#E0E0E0]" />
                    </div>

                    <button
                        onClick={handleGoogleAuth}
                        className="w-full py-3 border border-[#E0E0E0] text-[#1C1C1C] text-sm font-medium hover:border-black hover:bg-[#F5F5F5] transition-colors flex items-center justify-center gap-3"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133C17.387 19.48 15.6 20.733 12.48 20.733c-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
                        </svg>
                        <span>Continue with Google</span>
                    </button>

                    <p className="text-center text-xs text-[#6B6B6B]">
                        {mode === 'login' ? (
                            <>
                                Don&apos;t have an account?{' '}
                                <button onClick={() => setMode('signup')} className="text-[#1C1C1C] font-semibold underline hover:no-underline">
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button onClick={() => setMode('login')} className="text-[#1C1C1C] font-semibold underline hover:no-underline">
                                    Login
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
