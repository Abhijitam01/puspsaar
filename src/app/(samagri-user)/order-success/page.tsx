'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { CheckCircle, Download, ShoppingBag, Home } from 'lucide-react'
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
        <div className="w-24 h-24 border-2 border-[#1C1C1C] flex items-center justify-center mx-auto">
          <CheckCircle className="w-12 h-12 text-[#1C1C1C]" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6B6B6B] mb-3">Puspsaar</p>
        <h1
          className="text-3xl font-bold text-[#1C1C1C] mb-3"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
        >
          Order Confirmed!
        </h1>
        <p className="text-[#6B6B6B] text-sm mb-2">
          Thank you for shopping with Puspsaar
        </p>
        {orderId && (
          <p className="text-sm text-[#6B6B6B] mb-8">
            Order ID: <span className="text-[#1C1C1C] font-mono font-semibold">{orderId}</span>
          </p>
        )}

        <div className="h-px bg-[#E0E0E0] mb-8" />

        {/* Info box */}
        <div className="border border-[#E0E0E0] p-5 mb-8 text-left space-y-3 bg-[#F5F5F5]">
          {[
            'Your order has been confirmed and is being processed',
            'Expected delivery: 2–5 business days',
            'You can download your invoice below or from your profile',
          ].map((text) => (
            <div key={text} className="flex items-start gap-3 text-sm text-[#6B6B6B]">
              <CheckCircle className="w-4 h-4 text-[#1C1C1C] shrink-0 mt-0.5" />
              {text}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {orderId && (
            <button
              onClick={handleDownloadInvoice}
              disabled={downloading}
              className="w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1C1C1C] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {downloading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating Invoice...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download Invoice (PDF)
                </>
              )}
            </button>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/orders"
              className="flex items-center justify-center gap-2 border border-[#E0E0E0] py-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] hover:border-black transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              My Orders
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 border border-[#E0E0E0] py-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] hover:border-black transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="w-8 h-8 border-4 border-[#E0E0E0] border-t-[#1C1C1C] rounded-full animate-spin mx-auto" />
      }>
        <OrderSuccessContent />
      </Suspense>
    </div>
  )
}
