'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { ArrowLeft, Mail, Shield, Key, CheckCircle, ShoppingBag, AlertCircle } from 'lucide-react'

interface ForgotPasswordData {
  email: string
  otp: string
  newPassword: string
  confirmPassword: string
}

type Step = 'email' | 'otp' | 'password'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('email')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState('')
  const [formData, setFormData] = useState<ForgotPasswordData>({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  })

  const steps = [
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'otp', label: 'Verify OTP', icon: Shield },
    { id: 'password', label: 'New Password', icon: Key }
  ]

  const getCurrentStepIndex = () => steps.findIndex(step => step.id === currentStep)

  const validateEmail = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateOTP = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required'
    } else if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = 'OTP must be 6 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePassword = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSendOTP = async () => {
    if (!validateEmail()) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSuccessMessage('OTP sent successfully to your email')
      setCurrentStep('otp')
    } catch (error) {
      setErrors({ email: 'Failed to send OTP. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!validateOTP()) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock OTP verification (in real app, verify with backend)
      if (formData.otp === '123456') {
        setSuccessMessage('OTP verified successfully')
        setCurrentStep('password')
      } else {
        setErrors({ otp: 'Invalid OTP. Please try again.' })
      }
    } catch (error) {
      setErrors({ otp: 'Failed to verify OTP. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async () => {
    if (!validatePassword()) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSuccessMessage('Password reset successfully')
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/admin/login')
      }, 2000)
    } catch (error) {
      setErrors({ newPassword: 'Failed to reset password. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: keyof ForgotPasswordData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
    setSuccessMessage('')
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const StepIcon = step.icon
        const isActive = index === getCurrentStepIndex()
        const isCompleted = index < getCurrentStepIndex()
        
        return (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              isCompleted 
                ? 'bg-green-500 border-green-500 text-white' 
                : isActive 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'bg-gray-100 border-gray-300 text-gray-400'
            }`}>
              {isCompleted ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <StepIcon className="h-5 w-5" />
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 transition-colors duration-300 ${
                isCompleted ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        )
      })}
    </div>
  )

  const renderEmailStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Forgot your password?
        </h2>
        <p className="text-gray-600 text-sm">
          Enter your email address and we'll send you an OTP to reset your password
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          className={`h-11 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.email}
          </p>
        )}
      </div>

      <Button
        onClick={handleSendOTP}
        className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Sending OTP...
          </div>
        ) : (
          'Send OTP'
        )}
      </Button>
    </div>
  )

  const renderOTPStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Enter verification code
        </h2>
        <p className="text-gray-600 text-sm">
          We've sent a 6-digit code to <strong>{formData.email}</strong>
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
          6-Digit OTP *
        </Label>
        <Input
          id="otp"
          type="text"
          placeholder="Enter 6-digit OTP"
          value={formData.otp}
          onChange={(e) => updateFormData('otp', e.target.value.replace(/\D/g, '').slice(0, 6))}
          className={`h-11 text-center text-lg font-mono ${errors.otp ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
          disabled={isLoading}
          maxLength={6}
        />
        {errors.otp && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.otp}
          </p>
        )}
        <p className="text-xs text-gray-500 text-center">
          Demo OTP: 123456
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => setCurrentStep('email')}
          className="flex-1 h-11"
          disabled={isLoading}
        >
          Back
        </Button>
        <Button
          onClick={handleVerifyOTP}
          className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Verifying...
            </div>
          ) : (
            'Verify OTP'
          )}
        </Button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleSendOTP}
          className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          disabled={isLoading}
        >
          Didn't receive the code? Resend
        </button>
      </div>
    </div>
  )

  const renderPasswordStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Set new password
        </h2>
        <p className="text-gray-600 text-sm">
          Choose a strong password for your account
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
            New Password *
          </Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={(e) => updateFormData('newPassword', e.target.value)}
            className={`h-11 ${errors.newPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            disabled={isLoading}
          />
          {errors.newPassword && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.newPassword}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm Password *
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData('confirmPassword', e.target.value)}
            className={`h-11 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            disabled={isLoading}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => setCurrentStep('otp')}
          className="flex-1 h-11"
          disabled={isLoading}
        >
          Back
        </Button>
        <Button
          onClick={handleResetPassword}
          className="flex-1 h-11 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Resetting...
            </div>
          ) : (
            'Reset Password'
          )}
        </Button>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'email':
        return renderEmailStep()
      case 'otp':
        return renderOTPStep()
      case 'password':
        return renderPasswordStep()
      default:
        return renderEmailStep()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full shadow-lg">
              <ShoppingBag className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600">
            DpBazar Admin Portal
          </p>
        </div>

        {/* Progress Indicator */}
        {renderStepIndicator()}

        {/* Reset Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{successMessage}</span>
              </div>
            )}

            {/* Current Step Content */}
            {renderCurrentStep()}

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link
                href="/admin/login"
                className="text-sm text-gray-600 hover:text-gray-800 font-medium flex items-center justify-center gap-1"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2024 DpBazar. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}