'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Trash2, Heart, ShoppingBag, Truck, Shield, MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import ChangeAddressDialog from '@/components/cart/change-address-dialog'
import Link from 'next/link'


interface CartItem {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  size: string
  quantity: number
  inStock: boolean
  seller: string
}

const cartItems: CartItem[] = [
  {
    id: 1,
    name: "2022 Hyundai Creta SX (O) Turbo",
    price: 1725000,
    originalPrice: 1899000,
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80",
    size: "Turbo Petrol • Automatic",
    quantity: 1,
    inStock: true,
    seller: "Velaire Hub - Okhla"
  },
  {
    id: 2,
    name: "2020 Tata Nexon EV XZ+",
    price: 1520000,
    originalPrice: 1650000,
    image: "https://images.unsplash.com/photo-1518552781628-df835fcf7729?auto=format&fit=crop&w=900&q=80",
    size: "Electric • 40 kWh",
    quantity: 1,
    inStock: true,
    seller: "Velaire EV Studio - Navi Mumbai"
  },
  {
    id: 3,
    name: "2019 Maruti Suzuki Swift AMT",
    price: 615000,
    originalPrice: 725000,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
    size: "Petrol • AMT",
    quantity: 1,
    inStock: true,
    seller: "Velaire Select - Bengaluru"
  }
];

export default function CartPage() {
  const router = useRouter()
  const [items, setItems] = useState<CartItem[]>(cartItems)
  const [selectedItems, setSelectedItems] = useState<number[]>(items.map(i => i.id))
  const [addressDialogOpen, setAddressDialogOpen] = useState(false)
  const [isOrdering, setIsOrdering] = useState(false)



  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
    setSelectedItems(selectedItems.filter(itemId => itemId !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalSavings = items.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0)
  const coupons = 25000
  const platformFee = 0
  const total = subtotal + platformFee - coupons
  const deliveryFee = 0

  const handlePlaceOrder = async () => {
    setIsOrdering(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    // In a real app, you would create the order in backend
    setIsOrdering(false)
    // Navigate to orders page
    router.push('/orders')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center glass-panel p-12 rounded-2xl">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some items to get started</p>
          <Link href="/product">
            <Button size="lg" className="px-8 bg-secondary text-secondary-foreground hover:opacity-90">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col max-w-7xl px-3 lg:px-6 py-6 m-auto sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <h2 className="text-2xl font-semibold text-primary">Your Cart</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Items in Cart: <span className="font-medium text-foreground">{items.length}</span>
        </p>
      </div>
      <div className="max-w-7xl m-auto px-3 lg:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">


        {/* Left - Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Address Section */}
          <Card className="glass-panel border border-white/10 rounded-xl relative overflow-hidden">
            <div className='absolute left-0 top-1/4 bg-tertiary h-20 rounded-full w-1'></div>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">
                      Deliver to: <span className="text-secondary">Arjun Khanna, 560001</span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 break-words">
                      D-904, Skyline Enclave, Residency Road, Bengaluru - 560001
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <Truck className="h-4 w-4 text-secondary" />
                      <span className="text-sm text-secondary">Complimentary doorstep delivery & RTO support</span>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="shrink-0 cursor-pointer border-0 bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium"
                  onClick={() => setAddressDialogOpen(true)}
                > Change
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Cart Items */}
          {items.map((item) => (
            <Card key={item.id} className="glass-panel border border-white/10 rounded-xl relative overflow-hidden card-hover">
              <div className='absolute left-0 top-1/4 bg-tertiary h-20 rounded-full w-1'></div>
              <CardContent className="p-4 flex gap-6 sm:gap-9">
                {/* Image */}
                <div className="w-24 h-28 rounded-lg overflow-hidden border border-white/10 img-zoom">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-md text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                  <p className="text-sm text-muted-foreground">Seller: {item.seller}</p>

                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-lg text-foreground">₹{item.price.toLocaleString()}</span>
                    <span className="line-through text-muted-foreground text-sm">₹{item.originalPrice.toLocaleString()}</span>
                    <span className="text-secondary text-sm font-semibold">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% Off
                    </span>
                  </div>

                  {/* Quantity + Actions */}
                  <div className="mt-3 flex items-center gap-3 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/5 text-foreground border-white/20 hover:bg-white/10 hover:text-foreground"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-3 text-foreground font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/5 text-foreground border-white/20 hover:bg-white/10 hover:text-foreground"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>

                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => removeItem(item.id)}>
                      REMOVE
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

          ))}
        </div>

        {/* Right - Price Details */}
        <div className="space-y-6">
          {/* Price Summary */}
          <Card className="glass-panel border border-white/10 rounded-xl overflow-hidden">
            <CardContent className="p-4 sm:p-6 space-y-4">
              <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
                <span>Price Details</span>
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Price ({items.length} items)</span>
                  <span className="font-medium text-foreground">₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-secondary">
                  <span>Discount</span>
                  <span className="font-medium">-₹{totalSavings.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-secondary">
                  <span>Coupons Applied</span>
                  <span className="font-medium">-₹{coupons.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Platform Fee</span>
                  <span className="font-medium text-foreground">₹{platformFee}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Delivery Charges</span>
                  <span className={`font-medium ${deliveryFee === 0 ? 'text-secondary' : 'text-foreground'}`}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
              </div>

              <Separator className="bg-white/10" />

              <div className="flex justify-between items-center font-bold text-lg text-foreground">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <div className="bg-secondary/15 border border-secondary/30 p-3 rounded-lg">
                <p className="text-secondary text-sm font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  You will save ₹{(totalSavings + coupons).toLocaleString()} on this order
                </p>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-200 font-semibold neon-glow"
                onClick={handlePlaceOrder}
                disabled={isOrdering}
              >
                {isOrdering ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  'Place Order'
                )}
              </Button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                <Shield className="h-4 w-4" />
                <span>Safe and Secure Payments</span>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="glass-panel border border-white/10 rounded-xl overflow-hidden">
            <CardContent className="p-4 sm:p-6 space-y-4">
              <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
                <span>Delivery Information</span>
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <Truck className="h-4 w-4 text-secondary" />
                  </div>
                  <span>Doorstep delivery, RTO transfer, and detailing included</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-tertiary/20 rounded-lg">
                    <Shield className="h-4 w-4 text-tertiary" />
                  </div>
                  <span>7-day/500 km exchange guarantee on every vehicle</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Address Dialog */}
      <ChangeAddressDialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen} />
    </div>
  )
}
