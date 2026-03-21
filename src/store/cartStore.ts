import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  brand: string
  price: number
  image: string
  volume: string
  category: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string, volume: string) => void
  updateQty: (id: string, volume: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  subtotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find(
          i => i.id === item.id && i.volume === item.volume
        )
        if (existing) {
          set(state => ({
            items: state.items.map(i =>
              i.id === item.id && i.volume === item.volume
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }))
        } else {
          set(state => ({ items: [...state.items, { ...item, quantity: 1 }] }))
        }
      },

      removeItem: (id, volume) => {
        set(state => ({
          items: state.items.filter(i => !(i.id === id && i.volume === volume)),
        }))
      },

      updateQty: (id, volume, quantity) => {
        if (quantity < 1) return
        set(state => ({
          items: state.items.map(i =>
            i.id === id && i.volume === volume ? { ...i, quantity } : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'puspsaar-cart',
    }
  )
)
