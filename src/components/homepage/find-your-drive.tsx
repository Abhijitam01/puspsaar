'use client'

import { useMemo, useState } from 'react'
import { products } from '@/data/vehicle-product-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const bodyStyles = ['SUV', 'Sedan', 'Hatchback', '4x4', 'Electric']
const priceBands = [
  { label: 'Under ₹10L', value: 'budget', range: [0, 1000000] },
  { label: '₹10L - ₹20L', value: 'balanced', range: [1000000, 2000000] },
  { label: '₹20L+', value: 'executive', range: [2000000, Infinity] },
]

export default function FindYourDrive() {
  const [activeBody, setActiveBody] = useState<string>('SUV')
  const [band, setBand] = useState(priceBands[0])

  const filteredCars = useMemo(() => {
    return products
      .filter((car) => (activeBody ? car.size?.some((tag) => tag.toLowerCase().includes(activeBody.toLowerCase())) : true))
      .filter((car) => car.price >= band.range[0] && car.price <= band.range[1])
      .slice(0, 4)
  }, [activeBody, band])

  return (
    <section className="w-full rounded-[32px] border border-white/10 bg-gradient-to-br from-[#070912] via-[#05060b] to-[#0e0f1c] p-6 sm:p-10 shadow-[0_25px_80px_rgba(8,8,15,0.7)] text-white">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Smart matcher</p>
          <h2 className="text-2xl font-semibold sm:text-3xl">Compose your next Velaire commission</h2>
          <p className="text-white/70">Filter by segment, patron tier, or driving ritual and slip into pre-vetted inventory.</p>
        </div>
        <Button
          variant="outline"
          className="rounded-full border-white/40 px-5 text-white hover:bg-white/10"
          onClick={() => (window.location.href = '/product')}
        >
          View vault index
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {bodyStyles.map((body) => (
          <button
            key={body}
            onClick={() => setActiveBody(body)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              activeBody === body ? 'bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30' : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            {body}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {priceBands.map((item) => (
          <button
            key={item.value}
            onClick={() => setBand(item)}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-widest ${
              band.value === item.value ? 'border-secondary text-secondary' : 'border-white/10 text-white/50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {filteredCars.map((car) => (
          <div
            key={car.id}
            className="glass-panel rounded-3xl border border-white/10 bg-[#090b14]/70 p-5 transition hover:border-secondary/60"
          >
            <div className="flex items-center justify-between">
              <Badge className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">Vault seal</Badge>
              <p className="text-sm text-white/60">{car.discount}</p>
            </div>
            <div className="mt-3">
              <h3 className="text-lg font-semibold">{car.name}</h3>
              <p className="text-sm text-white/60">{car.subtitle}</p>
            </div>
            <div className="mt-4 h-48 overflow-hidden rounded-2xl border border-white/10">
              <img src={car.image} alt={car.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-white/70">
              <span>₹{(car.price / 100000).toFixed(2)} Lakh</span>
              <span>{car.rating} ★ rating</span>
            </div>
            <div className="mt-5 flex gap-3">
              <Button className="flex-1 rounded-full bg-secondary text-secondary-foreground" onClick={() => (window.location.href = `/product/${car.id}`)}>
                Reserve
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-full border-white/30 text-white hover:bg-white/10"
                onClick={() => (window.location.href = '/product')}
              >
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

