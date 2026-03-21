import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Sparkles, ShoppingBag, Truck, Store, ArrowBigRight } from 'lucide-react';
import { Button } from '../ui/button';

interface Puja {
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

    const pujas: Puja[] = [
        {
            id: 1,
            title: 'Chhath Puja Special',
            subtitle: 'Festive Essentials',
            image: 'https://admin.ntb.gov.np/image-cache/Chhat_ss_festival-1624867842.jpg?p=main&s=773d9f7175d879a7a0dabc06f36976df',
            gradient: 'from-yellow-300 via-yellow-500 to-red-500',
            accentColor: 'bg-secondary',
            features: ['Online Booking', 'Doorstep Delivery', 'Complete Puja Items', 'No more hopping to stores'],
            items: [
                'Traditional Bamboo Baskets',
                'Decorative Diyas',
                'Seasonal Fruits',
                'Puja Thalis & Plates',
                'Flower Garlands',
                'Holy Water Containers'
            ]
        },
        {
            id: 2,
            title: 'Diwali Puja Kit',
            subtitle: 'Light & Prosperity',
            image: 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTvgEdII17Cgkwt-CRJi8pzJbJSpc_tcm90qCgjA1h8kxfRTotSNSKGiAxX8zqcnaJif3v_tOXLVWqEdpm2',
            gradient: 'from-purple-600 via-pink-600 to-red-600',
            accentColor: 'bg-secondary',
            features: ['Online Booking', 'Doorstep Delivery', 'Complete Puja Items', 'Festive Decorations'],
            items: [
                'Decorative Diyas & Candles',
                'Incense & Dhoop Sticks',
                'Rangoli Colors & Stencils',
                'Sweets & Snacks for Prasad',
                'Puja Thalis & Bell',
                'Flower Garlands & Marigold Strings'
            ]
        }
    ];

    return (
        <div className=" mb-12">
            <div className="max-w-7xl mx-auto">

                {/* Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {pujas.map((puja) => (
                        <Card
                            key={puja.id}
                            onMouseEnter={() => setHoveredCard(puja.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            className="group relative overflow-hidden rounded-3xl border-0 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:-translate-y-2"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden rounded-t-3xl">
                                <img
                                    src={puja.image}
                                    alt={puja.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${puja.gradient} opacity-80 mix-blend-multiply`}></div>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                                    <span className="text-sm font-bold text-gray-800">{puja.subtitle}</span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                                    <h2 className="text-3xl font-bold text-white mb-2 text-left">{puja.title}</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {puja.features.map((feature, idx) => (
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
                                    {puja.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                                        >
                                            <div className={`${puja.accentColor} rounded-full p-1 mt-0.5`}>
                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-md text-gray-700 flex-1 text-left">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="group mx-auto  block flex items-center gap-3 bg-secondary to-rose-600 text-white font-bold px-8 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                    <span className="text-lg">Get Quotation</span>
                                    <ArrowBigRight />
                                </button>



                            </div>

                            {/* Floating Dots */}
                            {hoveredCard === puja.id && (
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
                        <span className="text-md">See All Upcoming Pujas</span>
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
