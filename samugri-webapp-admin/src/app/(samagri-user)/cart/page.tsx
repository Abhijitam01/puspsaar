'use client'

import { useState } from 'react'
import { Minus, Plus, Trash2, Heart, ShoppingBag, Truck, Shield, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import ChangeAddressDialog from '@/components/cart/change-address-dialog'


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
    name: "Brass Diya",
    price: 199,
    originalPrice: 399,
    image: "https://myborosil.com/cdn/shop/files/HDTRAKDB100_1_3fdc301b-ab36-4b75-a656-25493d2c172c.jpg?v=1748412917&width=1646",
    size: "Medium",
    quantity: 2,
    inStock: true,
    seller: "Pooja Essentials"
  },
  {
    id: 2,
    name: "Incense Sticks (Pack of 50)",
    price: 99,
    originalPrice: 149,
    image: "https://m.media-amazon.com/images/I/91Fi7vCYT7L._UF894,1000_QL80_.jpg",
    size: "Standard",
    quantity: 1,
    inStock: true,
    seller: "Sacred Scents"
  },
  {
    id: 3,
    name: "Pooja Thali Set",
    price: 499,
    originalPrice: 799,
    image: "https://www.satvikstore.in/cdn/shop/files/7_Piece_Brass_Shubh_Labh_Pooja_Thali_Set_8_Inch_Design_8_720x.jpg?v=1746617326",
    size: "Large",
    quantity: 1,
    inStock: true,
    seller: "Divine Decor"
  }
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(cartItems)
  const [selectedItems, setSelectedItems] = useState<number[]>(items.map(i => i.id))
  const [addressDialogOpen, setAddressDialogOpen] = useState(false)



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
  const coupons = 265
  const platformFee = 7
  const total = subtotal + platformFee - coupons
  const deliveryFee = subtotal > 500 ? 0 : 40


  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">Add some items to get started</p>
          <Button size="lg" className="px-8">Continue Shopping</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col max-w-7xl px-3 lg:px-6 py-6 m-auto sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <h2 className="text-2xl font-semibold text-gray-800">Your Cart</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Items in Cart: <span className="font-medium text-gray-800">{items.length}</span>
        </p>
      </div>
      <div className="max-w-7xl m-auto  px-3 lg:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">


        {/* Left - Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Address Section */}
          <Card className=" border-none rounded-sm relative ">
            <div className='absolute left-0 top-1/4 max-auto bg-tertiary h-20  rounded-full w-1'></div>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 ">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800">
                      Deliver to: <span className="text-blue-600">Rani Mukharjee, 800001</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1 break-words">
                      Flat 502, Tower A, Green Park, New Delhi-800001
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <Truck className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Free delivery available</span>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="shrink-0 cursor-pointer border-0 bg-secondary text-white hover:bg-orange-500"
                  onClick={() => setAddressDialogOpen(true)}
                > Change
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Cart Items */}
          {items.map((item) => (
            <Card key={item.id} className="border-none rounded-sm relative bg-white">
              <div className='absolute left-0 top-1/4 max-auto bg-tertiary h-20  rounded-full w-1'></div>
              <CardContent className="p-4 flex gap-9">
                {/* Image */}
                <div className="w-24 h-28 rounded-md overflow-hidden border border-gray-200">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-md   text-gray-900">{item.name}</h3>
                  <p className="text-sm  text-gray-500">Size: {item.size}</p>
                  <p className="text-sm text-gray-500">Seller: {item.seller}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-semibold text-lg text-gray-900">₹{item.price}</span>
                    <span className="line-through text-gray-400 text-sm">₹{item.originalPrice}</span>
                    <span className="text-green-600 text-sm font-semibold">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% Off
                    </span>
                  </div>

                  {/* Quantity + Actions */}
                  <div className="mt-3 flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white text-gray-700 border-gray-100 hover:bg-gray-100 hover:text-gray-900 dark:bg-white dark:hover:bg-gray-100"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-3 text-gray-900">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white text-gray-700 border-gray-100 hover:bg-gray-100 hover:text-gray-900 dark:bg-white dark:hover:bg-gray-100"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>

                    <Button variant="ghost" size="sm" className="text-red-500 dark:hover:bg-neutral-100 dark:hover:text-gray-600" onClick={() => removeItem(item.id)}>
                      REMOVE
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

          ))}
        </div>

        {/* Right - Price Details */}
        <div className="sm:space-y-6">
          {/* Price Summary */}
          <Card className="border-none  bg-white">
            <CardContent className=" sm:p-6 space-y-4">
              <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span>Price Details</span>
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center  text-gray-600">
                  <span className="">Price ({items.length} items)</span>
                  <span className="font-medium ">₹{subtotal}</span>
                </div>

                <div className="flex justify-between items-center text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">-₹{totalSavings}</span>
                </div>

                <div className="flex justify-between items-center text-green-600">
                  <span>Coupons Applied</span>
                  <span className="font-medium">-₹{coupons}</span>
                </div>

                <div className="flex justify-between items-center text-gray-600">
                  <span className="">Platform Fee</span>
                  <span className="font-medium">₹{platformFee}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center font-bold text-lg text-gray-800">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-green-700 text-sm font-medium">
                  🎉 You will save ₹{totalSavings + coupons} on this order
                </p>
              </div>

              <Button size="lg" className="w-full bg-secondary  transition-all duration-200 font-semibold">
                Place Order
              </Button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                <Shield className="h-4 w-4" />
                <span>Safe and Secure Payments</span>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className=" border-none bg-white">
            <CardContent className="p-4 sm:p-6  space-y-4">
              <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span>Delivery Information</span>
              </h2>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>Free delivery on orders above ₹500</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>7-day return policy</span>
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
