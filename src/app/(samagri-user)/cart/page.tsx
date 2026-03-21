'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Trash2, ShoppingBag, Truck, Shield, MapPin, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { toast } from 'sonner'

interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
}

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQty, clearCart, subtotal } = useCartStore()
  const [isOrdering, setIsOrdering] = useState(false)
  const [address, setAddress] = useState<ShippingAddress>({
    name: '',
    phone: '',
    address: '',
  })
  const [showAddressForm, setShowAddressForm] = useState(false)

  const total = subtotal()
  const originalTotal = items.reduce((sum, i) => sum + (i.price * 1.15) * i.quantity, 0)
  const savings = originalTotal - total

  const handlePlaceOrder = async () => {
    if (!address.name || !address.phone || !address.address) {
      setShowAddressForm(true)
      toast.error('Please fill in your delivery address first')
      return
    }
    setIsOrdering(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            product_id: i.id,
            product_name: i.name,
            product_image: i.image,
            volume: i.volume,
            quantity: i.quantity,
            price: i.price,
          })),
          total_amount: total,
          shipping_name: address.name,
          shipping_phone: address.phone,
          shipping_address: address.address,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Order failed')
      clearCart()
      router.push(`/order-success?orderId=${data.orderId}`)
    } catch (err) {
      toast.error('Failed to place order. Please try again.')
      setIsOrdering(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center border border-[#E0E0E0] p-12 max-w-sm w-full">
          <ShoppingBag className="h-16 w-16 mx-auto text-[#E0E0E0] mb-6" />
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-2" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
            Your cart is empty
          </h2>
          <p className="text-[#6B6B6B] mb-8 text-sm">Start exploring our premium fragrances</p>
          <Link
            href="/product"
            className="inline-block px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1C1C1C] transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="border-b border-[#E0E0E0] py-8">
        <div className="max-w-7xl px-4 lg:px-8 mx-auto flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] mb-1">Puspsaar</p>
            <h1 className="text-3xl font-bold text-[#1C1C1C]" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Your Cart
            </h1>
            <p className="text-[#6B6B6B] text-sm mt-1">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={() => clearCart()}
            className="text-xs text-[#6B6B6B] hover:text-[#E32C2B] transition-colors uppercase tracking-[0.1em] font-semibold"
          >
            Clear cart
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Address Section */}
          <div className="border border-[#E0E0E0] p-5">
            {!showAddressForm ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-[#E0E0E0] flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-[#1C1C1C]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1C1C1C] text-sm">Delivery Address</p>
                    {address.name ? (
                      <p className="text-[#6B6B6B] text-xs mt-0.5">{address.name} · {address.address}</p>
                    ) : (
                      <p className="text-[#6B6B6B] text-xs mt-0.5">Add your delivery address</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="border border-[#1C1C1C] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] hover:bg-black hover:text-white transition-colors"
                >
                  {address.name ? 'Edit' : 'Add'}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-semibold text-[#1C1C1C] text-sm uppercase tracking-[0.1em]">Delivery Details</h3>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="Full Name"
                    value={address.name}
                    onChange={e => setAddress(a => ({ ...a, name: e.target.value }))}
                    className="col-span-1 border border-[#E0E0E0] px-4 py-2.5 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors"
                  />
                  <input
                    placeholder="Phone"
                    value={address.phone}
                    onChange={e => setAddress(a => ({ ...a, phone: e.target.value }))}
                    className="col-span-1 border border-[#E0E0E0] px-4 py-2.5 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors"
                  />
                  <input
                    placeholder="Full delivery address"
                    value={address.address}
                    onChange={e => setAddress(a => ({ ...a, address: e.target.value }))}
                    className="col-span-2 border border-[#E0E0E0] px-4 py-2.5 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <button
                  onClick={() => setShowAddressForm(false)}
                  className="px-6 py-2 bg-black text-white text-xs font-bold uppercase tracking-[0.1em] hover:bg-[#1C1C1C] transition-colors"
                >
                  Save Address
                </button>
              </div>
            )}
          </div>

          {/* Cart Items */}
          {items.map(item => (
            <div key={`${item.id}-${item.volume}`} className="border border-[#E0E0E0] p-4 flex gap-4">
              {/* Image */}
              <div className="w-24 h-28 overflow-hidden border border-[#E0E0E0] shrink-0 bg-[#F5F5F5]">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B] mb-0.5">{item.brand}</p>
                <h3 className="font-semibold text-[#1C1C1C] text-sm mb-0.5 line-clamp-1">{item.name}</h3>
                <p className="text-[#6B6B6B] text-xs">{item.volume} · {item.category}</p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="font-bold text-[#1C1C1C]">₹{(item.price * item.quantity).toLocaleString()}</span>
                  <span className="text-[#ABABAB] text-xs line-through">₹{Math.round(item.price * 1.15 * item.quantity).toLocaleString()}</span>
                  <span className="text-[#E32C2B] text-xs font-semibold">13% Off</span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center border border-[#E0E0E0]">
                    <button
                      onClick={() => updateQty(item.id, item.volume, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-1.5 hover:bg-[#F5F5F5] transition-colors disabled:opacity-40"
                    >
                      <Minus className="h-3.5 w-3.5 text-[#1C1C1C]" />
                    </button>
                    <span className="px-3 text-[#1C1C1C] font-medium text-sm border-x border-[#E0E0E0]">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.volume, item.quantity + 1)}
                      className="p-1.5 hover:bg-[#F5F5F5] transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5 text-[#1C1C1C]" />
                    </button>
                  </div>
                  <button
                    onClick={() => { removeItem(item.id, item.volume); toast.success('Item removed') }}
                    className="p-1.5 text-[#6B6B6B] hover:text-[#E32C2B] transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <div className="border border-[#E0E0E0] p-5 space-y-4">
            <h2 className="font-bold text-lg text-[#1C1C1C]" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#6B6B6B]">
                <span>Subtotal ({items.length} items)</span>
                <span className="text-[#1C1C1C] font-medium">₹{Math.round(originalTotal).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#E32C2B]">
                <span>Discount</span>
                <span className="font-medium">-₹{Math.round(savings).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#6B6B6B]">
                <span>Delivery</span>
                <span className="text-[#1C1C1C] font-medium">FREE</span>
              </div>
            </div>

            <div className="border-t border-[#E0E0E0] pt-4 flex justify-between items-center font-bold text-lg text-[#1C1C1C]">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            {savings > 0 && (
              <div className="bg-[#F5F5F5] border border-[#E0E0E0] p-3">
                <p className="text-[#1C1C1C] text-sm font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  You save ₹{Math.round(savings).toLocaleString()} on this order!
                </p>
              </div>
            )}

            <button
              className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1C1C1C] transition-colors disabled:opacity-60"
              onClick={handlePlaceOrder}
              disabled={isOrdering}
            >
              {isOrdering ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Placing Order...
                </span>
              ) : 'Place Order'}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-[#6B6B6B]">
              <Shield className="h-3.5 w-3.5" />
              <span>Safe & Secure · 100% Authentic</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="border border-[#E0E0E0] p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm text-[#6B6B6B]">
              <div className="w-9 h-9 border border-[#E0E0E0] flex items-center justify-center shrink-0">
                <Truck className="h-4 w-4 text-[#1C1C1C]" />
              </div>
              <span>Free doorstep delivery, 2–5 business days</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#6B6B6B]">
              <div className="w-9 h-9 border border-[#E0E0E0] flex items-center justify-center shrink-0">
                <Shield className="h-4 w-4 text-[#1C1C1C]" />
              </div>
              <span>7-day hassle-free returns on all orders</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
