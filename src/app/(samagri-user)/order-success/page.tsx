'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { CheckCircle, Download, ShoppingBag, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [downloading, setDownloading] = useState(false)

  const handleDownloadInvoice = async () => {
    if (!orderId) return
    setDownloading(true)
    try {
      const response = await fetch(`/api/invoice/${orderId}`)
      if (!response.ok) throw new Error('Failed to generate invoice')
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `puspsaar-invoice-${orderId.slice(0, 8)}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed:', err)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="max-w-md w-full text-center">
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, delay: 0.1 }}
        className="mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-[#C6A969]/10 border-2 border-[#C6A969] flex items-center justify-center mx-auto">
          <CheckCircle className="w-12 h-12 text-[#C6A969]" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1
          className="text-3xl font-bold text-foreground mb-3"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Order Confirmed!
        </h1>
        <p className="text-muted-foreground text-base mb-2">
          Thank you for shopping with Puspsaar
        </p>
        {orderId && (
          <p className="text-sm text-muted-foreground mb-8">
            Order ID: <span className="text-foreground font-mono font-medium">{orderId}</span>
          </p>
        )}

        {/* Gold divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#C6A969]/50 to-transparent mb-8" />

        {/* Info box */}
        <div className="glass-panel rounded-2xl p-5 mb-8 text-left space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="text-[#C6A969]">✓</span>
            Your order has been confirmed and is being processed
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="text-[#C6A969]">✓</span>
            Expected delivery: 2–5 business days
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="text-[#C6A969]">✓</span>
            You can download your invoice below or from your profile
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {orderId && (
            <Button
              onClick={handleDownloadInvoice}
              disabled={downloading}
              className="w-full bg-foreground text-background hover:bg-[#C6A969] hover:text-black transition-all rounded-xl py-6 font-semibold neon-glow"
            >
              {downloading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Generating Invoice...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Invoice (PDF)
                </span>
              )}
            </Button>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Link href="/orders">
              <Button variant="outline" className="w-full rounded-xl border-border hover:border-[#C6A969]/50">
                <ShoppingBag className="w-4 h-4 mr-2" />
                My Orders
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full rounded-xl border-border hover:border-[#C6A969]/50">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Suspense fallback={<div className="w-8 h-8 rounded-full border-4 border-[#C6A969] border-t-transparent animate-spin mx-auto"></div>}>
        <OrderSuccessContent />
      </Suspense>
    </div>
  )
}
