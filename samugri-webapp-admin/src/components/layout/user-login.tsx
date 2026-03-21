'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Link from "next/link";

export default function UserLoginPage() {
    const [step, setStep] = useState<'login' | 'otp'>('login');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpValue, setOtpValue] = useState('');

    const handleSendOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('Sending OTP to:', phoneNumber);
        setStep('otp');
    };

    const handleVerifyOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('Verifying OTP:', otpValue);
    };

    const handleGoogleAuth = () => console.log('Google authentication initiated');
    const handleResendOTP = () => console.log('Resending OTP to:', phoneNumber);
    const handleChangePhone = () => { setStep('login'); setOtpValue(''); };

    // ---------------- OTP PAGE ----------------
    if (step === 'otp')
        return (
            <div className="flex items-center justify-center py-10">
                <Card className="w-full max-w-md overflow-hidden shadow-xl bg-white/90 backdrop-blur-md border border-gray-200">
                    <CardHeader>
                        <div className="w-full flex justify-center items-center mb-2">
                            <img src="/logo.png" alt="logo" className="h-12 w-30" />
                        </div>
                        <CardTitle className="text-xl text-center">Enter verification code</CardTitle>
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
                                Enter the 6-digit code sent to your phone.
                            </FieldDescription>

                            <Button onClick={handleVerifyOTP} className="w-full bg-tertiary mt-4 hover:from-blue-700 hover:to-purple-700">
                                Verify
                            </Button>

                            <div className="text-center mt-3 space-y-1">
                                <FieldDescription>
                                    Didn’t get the code?{' '}
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleResendOTP(); }} className="underline text-blue-600 hover:text-blue-700">
                                        Resend
                                    </a>
                                </FieldDescription>
                                <FieldDescription>
                                    Wrong number?{' '}
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleChangePhone(); }} className="underline text-blue-600">
                                        Change
                                    </a>
                                </FieldDescription>
                            </div>
                        </FieldGroup>
                    </CardContent>
                </Card>
            </div>
        );

    // ---------------- LOGIN PAGE ----------------
    return (
        <div className="flex items-center justify-center py-10">
            <Card className="w-full max-w-md overflow-hidden shadow-xl bg-white/90 backdrop-blur-md border border-gray-200">
                <CardContent className="p-4 md:p-8">
                    <FieldGroup className="space-y-3">
                        <div className="text-center">
                            <div className="w-full flex justify-center items-center mb-3">
                                <img src="/logo.png" alt="logo" className="h-12 w-30" />
                            </div>
                            <h1 className="text-3xl font-bold">Welcome back</h1>
                            <p className="text-muted-foreground">Login to your account</p>
                        </div>

                        <Field>
                            <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Field>

                        <Button onClick={handleSendOTP} className="w-full bg-tertiary">
                            Send OTP
                        </Button>

                        <FieldSeparator>Or continue with</FieldSeparator>

                        <Button variant="outline" onClick={handleGoogleAuth} className="flex items-center justify-center gap-2 border border-tertiary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133C17.387 19.48 15.6 20.733 12.48 20.733c-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                            <span>Login with Google</span>
                        </Button>

                        <FieldDescription className="text-center">
                            Don’t have an account?{' '}
                            <Link href="#" className="underline text-blue-600 hover:text-blue-700">
                                Sign up
                            </Link>
                        </FieldDescription>
                    </FieldGroup>
                </CardContent>
            </Card>
        </div>
    );
}
