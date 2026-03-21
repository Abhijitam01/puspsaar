import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Sparkles, ShoppingBag, Truck, Store, ArrowBigRight } from 'lucide-react';
import { Button } from '../ui/button';

interface LaunchEvent {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    gradient: string;
    accentColor: string;
    features: string[];
    items: string[];
}

export const UpcomingFestival = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const events: LaunchEvent[] = [
        {
            id: 1,
            title: 'Velaire SUV Showcase',
            subtitle: 'Weekend Experience',
            image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80',
            gradient: 'from-yellow-300 via-yellow-500 to-red-500',
            accentColor: 'bg-secondary',
            features: ['On-ground advisors', 'Concierge trade-in desk', 'Finance pre-approvals', 'Same-week delivery slots'],
            items: [
                'Live demos of 8 best-selling SUVs',
                'Personalized off-road simulation',
                'Insurance & warranty clinics',
                'Exclusive loyalty bonuses',
                '48-hour blocking window',
                'Complimentary detailing session'
            ]
        },
        {
            id: 2,
            title: 'Electric Drive Week',
            subtitle: 'EV Test Drive Festival',
            image: 'https://images.unsplash.com/photo-1518552781628-df835fcf7729?auto=format&fit=crop&w=1600&q=80',
            gradient: 'from-purple-600 via-pink-600 to-red-600',
            accentColor: 'bg-secondary',
            features: ['Fast-charging demos', 'Battery health clinics', 'Exclusive subsidies', 'EV accessory bazaar'],
            items: [
                'City drive loop with product expert',
                'Home-charger installation guidance',
                'Battery buyback guarantees',
                'Connected car walkthrough',
                'Subscription plans for fleets',
                'Green loan desk with partner banks'
            ]
        }
    ];

    return (
        <div className=" mb-12">
            <div className="max-w-7xl mx-auto">

                {/* Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {events.map((event) => (
                        <Card
                            key={event.id}
                            onMouseEnter={() => setHoveredCard(event.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            className="group relative overflow-hidden rounded-3xl border-0 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:-translate-y-2"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden rounded-t-3xl">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${event.gradient} opacity-80 mix-blend-multiply`}></div>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                                    <span className="text-sm font-bold text-gray-800">{event.subtitle}</span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                                    <h2 className="text-3xl font-bold text-white mb-2 text-left">{event.title}</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {event.features.map((feature, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-flex items-center gap-1 text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full"
                                            >
                                                <CheckCircle2 className="w-3 h-3" />
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Content */}
                            <div className="p-6 space-y-2">
                                <div className="space-y-2">
                                    {event.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                                        >
                                            <div className={`${event.accentColor} rounded-full p-1 mt-0.5`}>
                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-md text-gray-700 flex-1 text-left">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="group mx-auto  block flex items-center gap-3 bg-secondary to-rose-600 text-white font-bold px-8 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                    <span className="text-lg">Reserve Slot</span>
                                    <ArrowBigRight />
                                </button>



                            </div>

                            {/* Floating Dots */}
                            {hoveredCard === event.id && (
                                <>
                                    <div className="absolute top-20 right-10 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                                    <div className="absolute top-32 right-16 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-75"></div>
                                    <div className="absolute bottom-40 left-10 w-3 h-3 bg-orange-400 rounded-full animate-ping delay-150"></div>
                                </>
                            )}
                        </Card>
                    ))}
                </div>

                {/* See All */}
                <div className="text-center">
                    <button className="group inline-flex items-center gap-3 bg-secondary text-white font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                        <span className="text-md">See All Events</span>
                        <ArrowBigRight />
                    </button>
                </div>
            </div>

            <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .delay-75 {
          animation-delay: 75ms;
        }
        .delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
        </div>
    );
};
