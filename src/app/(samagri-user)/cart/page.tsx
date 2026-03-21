'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Trash2, ShoppingBag, Truck, Shield, MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { toast } from 'sonner'
import Image from 'next/image'

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
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center glass-panel p-12 rounded-2xl max-w-sm w-full">
          <ShoppingBag className="h-20 w-20 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">Start exploring our premium fragrances</p>
          <Link href="/product">
            <Button className="bg-foreground text-background hover:bg-[#C6A969] hover:text-black transition-all rounded-full px-8">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-7xl px-4 lg:px-8 py-6 mx-auto flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Your Cart</h2>
          <p className="text-muted-foreground text-sm mt-0.5">{items.length} item{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => clearCart()}
          className="text-xs text-muted-foreground hover:text-destructive transition-colors"
        >
          Clear cart
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Address Section */}
          <Card className="glass-panel border border-border rounded-xl">
            <CardContent className="p-5">
              {!showAddressForm ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#C6A969]/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-[#C6A969]" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">Delivery Address</p>
                      {address.name ? (
                        <p className="text-muted-foreground text-xs mt-0.5">{address.name} · {address.address}</p>
                      ) : (
                        <p className="text-muted-foreground text-xs mt-0.5">Add your delivery address</p>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#C6A969]/40 text-[#C6A969] hover:bg-[#C6A969]/10"
                    onClick={() => setShowAddressForm(true)}
                  >
                    {address.name ? 'Edit' : 'Add'}
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground text-sm">Delivery Details</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="Full Name"
                      value={address.name}
                      onChange={e => setAddress(a => ({ ...a, name: e.target.value }))}
                      className="col-span-1 bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#C6A969]/60"
                    />
                    <input
                      placeholder="Phone"
                      value={address.phone}
                      onChange={e => setAddress(a => ({ ...a, phone: e.target.value }))}
                      className="col-span-1 bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#C6A969]/60"
                    />
                    <input
                      placeholder="Full delivery address"
                      value={address.address}
                      onChange={e => setAddress(a => ({ ...a, address: e.target.value }))}
                      className="col-span-2 bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#C6A969]/60"
                    />
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setShowAddressForm(false)}
                    className="bg-foreground text-background hover:bg-[#C6A969] hover:text-black"
                  >
                    Save Address
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cart Items */}
          {items.map(item => (
            <Card key={`${item.id}-${item.volume}`} className="glass-panel border border-border rounded-xl card-hover">
              <CardContent className="p-4 flex gap-4">
                {/* Image */}
                <div className="w-24 h-28 rounded-xl overflow-hidden border border-border shrink-0 bg-muted img-zoom">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-[#C6A969] text-xs font-semibold mb-0.5">{item.brand}</p>
                  <h3 className="font-semibold text-foreground text-sm mb-0.5 line-clamp-1">{item.name}</h3>
                  <p className="text-muted-foreground text-xs">{item.volume} · {item.category}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-bold text-foreground">₹{(item.price * item.quantity).toLocaleString()}</span>
                    <span className="text-muted-foreground text-xs line-through">₹{Math.round(item.price * 1.15 * item.quantity).toLocaleString()}</span>
                    <span className="text-[#C6A969] text-xs font-semibold">13% Off</span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center bg-muted border border-border rounded-lg">
                      <button
                        onClick={() => updateQty(item.id, item.volume, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-1.5 hover:bg-accent rounded-l-lg transition-colors disabled:opacity-40"
                      >
                        <Minus className="h-3.5 w-3.5 text-foreground" />
                      </button>
                      <span className="px-3 text-foreground font-medium text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.volume, item.quantity + 1)}
                        className="p-1.5 hover:bg-accent rounded-r-lg transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5 text-foreground" />
                      </button>
                    </div>
                    <button
                      onClick={() => { removeItem(item.id, item.volume); toast.success('Item removed'); }}
                      className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <Card className="glass-panel border border-border rounded-xl">
            <CardContent className="p-5 space-y-4">
              <h2 className="font-bold text-lg text-foreground flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="text-foreground font-medium">₹{Math.round(originalTotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#C6A969]">
                  <span>Discount</span>
                  <span className="font-medium">-₹{Math.round(savings).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className="text-[#C6A969] font-medium">FREE</span>
                </div>
              </div>

              <Separator className="bg-border" />

              <div className="flex justify-between items-center font-bold text-lg text-foreground">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              {savings > 0 && (
                <div className="bg-[#C6A969]/10 border border-[#C6A969]/20 p-3 rounded-xl">
                  <p className="text-[#C6A969] text-sm font-medium flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    You save ₹{Math.round(savings).toLocaleString()} on this order!
                  </p>
                </div>
              )}

              <Button
                size="lg"
                className="w-full bg-foreground text-background hover:bg-[#C6A969] hover:text-black transition-all font-semibold rounded-xl neon-glow"
                onClick={handlePlaceOrder}
                disabled={isOrdering}
              >
                {isOrdering ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Placing Order...
                  </span>
                ) : 'Place Order'}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5" />
                <span>Safe & Secure • 100% Authentic</span>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Info */}
          <Card className="glass-panel border border-border rounded-xl">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="p-2 bg-[#C6A969]/10 rounded-lg">
                  <Truck className="h-4 w-4 text-[#C6A969]" />
                </div>
                <span>Free doorstep delivery, 2–5 business days</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="p-2 bg-[#C6A969]/10 rounded-lg">
                  <Shield className="h-4 w-4 text-[#C6A969]" />
                </div>
                <span>7-day hassle-free returns on all orders</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
