'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Link from "next/link";
import { Sparkles } from "lucide-react";

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
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        setStep('otp');
    };

    const handleVerifyOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (otpValue.length !== 6) return;
        
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Store user info in localStorage (for demo purposes)
        localStorage.setItem('user', JSON.stringify({
            name: name || 'User',
            phone: phoneNumber,
            email: email,
            isLoggedIn: true
        }));
        
        setIsLoading(false);
        // Redirect to profile or home
        router.push('/profile');
    };

    const handleGoogleAuth = () => {
        // Simulate Google auth
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
            <div className="flex items-center justify-center py-10">
                <Card className="w-full max-w-md overflow-hidden shadow-xl bg-card/95 backdrop-blur-md border border-border">
                    <CardHeader>
                        <div className="w-full flex justify-center items-center mb-2">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7fe8d7] to-teal-600 flex items-center justify-center shadow-lg">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <CardTitle className="text-xl text-center text-foreground">Enter verification code</CardTitle>
                        <CardDescription className="text-center">We sent a 6-digit code to {phoneNumber}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FieldGroup>
                            <InputOTP id="otp" maxLength={6} value={otpValue} onChange={setOtpValue}>
                                <InputOTPGroup className="gap-2.5 justify-center w-full">
                                    {[...Array(6)].map((_, i) => <InputOTPSlot key={i} index={i} />)}
                                </InputOTPGroup>
                            </InputOTP>

                            <FieldDescription className="text-center mt-2">
                                Enter the 6-digit code sent to your phone. (Use 123456 for demo)
                            </FieldDescription>

                            <Button 
                                onClick={handleVerifyOTP} 
                                className="w-full bg-primary text-primary-foreground mt-4 hover:bg-primary/90"
                                disabled={isLoading || otpValue.length !== 6}
                            >
                                {isLoading ? 'Verifying...' : 'Verify & Continue'}
                            </Button>

                            <div className="text-center mt-3 space-y-1">
                                <FieldDescription>
                                    Didn't get the code?{' '}
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleResendOTP(); }} className="underline text-primary hover:text-primary/80">
                                        Resend
                                    </a>
                                </FieldDescription>
                                <FieldDescription>
                                    Wrong number?{' '}
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleChangePhone(); }} className="underline text-primary hover:text-primary/80">
                                        Change
                                    </a>
                                </FieldDescription>
                            </div>
                        </FieldGroup>
                    </CardContent>
                </Card>
            </div>
        );

    // ---------------- LOGIN / SIGNUP PAGE ----------------
    return (
        <div className="flex items-center justify-center py-10">
            <Card className="w-full max-w-md overflow-hidden shadow-xl bg-card/95 backdrop-blur-md border border-border">
                <CardContent className="p-4 md:p-8">
                    <FieldGroup className="space-y-3">
                        <div className="text-center">
                            <div className="w-full flex justify-center items-center mb-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7fe8d7] to-teal-600 flex items-center justify-center shadow-lg">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-foreground">
                                {mode === 'login' ? 'Welcome back' : 'Create account'}
                            </h1>
                            <p className="text-muted-foreground">
                                {mode === 'login' ? 'Login to your account' : 'Sign up to get started'}
                            </p>
                        </div>

                        {mode === 'signup' && (
                            <>
                                <Field>
                                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-muted border-border text-foreground"
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-muted border-border text-foreground"
                                    />
                                </Field>
                            </>
                        )}

                        <Field>
                            <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+91 98765 43210"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="bg-muted border-border text-foreground"
                            />
                        </Field>

                        <Button 
                            onClick={handleSendOTP} 
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                            disabled={isLoading || !phoneNumber}
                        >
                            {isLoading ? 'Sending OTP...' : 'Send OTP'}
                        </Button>

                        <FieldSeparator>Or continue with</FieldSeparator>

                        <Button variant="outline" onClick={handleGoogleAuth} className="flex items-center justify-center gap-2 border border-primary text-foreground hover:bg-accent">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133C17.387 19.48 15.6 20.733 12.48 20.733c-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                            <span>Continue with Google</span>
                        </Button>

                        <FieldDescription className="text-center">
                            {mode === 'login' ? (
                                <>
                                    Don't have an account?{' '}
                                    <button 
                                        onClick={() => setMode('signup')} 
                                        className="underline text-primary hover:text-primary/80"
                                    >
                                        Sign up
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <button 
                                        onClick={() => setMode('login')} 
                                        className="underline text-primary hover:text-primary/80"
                                    >
                                        Login
                                    </button>
                                </>
                            )}
                        </FieldDescription>
                    </FieldGroup>
                </CardContent>
            </Card>
        </div>
    );
}
