'use client';

import React from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

// ===== Category List (Pooja Samugri Theme) =====
export const categories = [
    {
        id: 'pooja-Samugri',
        name: 'Pooja Samugri',
        imageUrl:
            'https://bazaar5.com/image/cache/catalog/pro/product/apiData/40081400-shubhkart-copper-kalash-taamba-kalash-pooja-kalash-1-pc-0-900x900.jpg',
        hasDropdown: true,
        submenu: [
            {
                title: 'Essential Items',
                items: ['Kalash', 'Diya', 'Cotton Wick', 'Roli', 'Chawal', 'Kapur', 'Ghee'],
            },
            {
                title: 'Sacred Threads & Fabrics',
                items: ['Janeu', 'Red Cloth', 'Yellow Cloth', 'Moli', 'Chunri'],
            },
            {
                title: 'Pooja Kits',
                items: ['Daily Pooja Kit', 'Festival Kit', 'Satyanarayan Pooja Kit', 'Wedding Pooja Kit'],
            },
        ],
    },
    {
        id: 'idols',
        name: 'God Idols & Statues',
        imageUrl:
            'https://servdharm.com/cdn/shop/collections/god-idol_2000x2000.webp?v=1704353919',
        hasDropdown: true,
        submenu: [
            { title: 'Popular Deities', items: ['Lord Ganesha', 'Lakshmi Maa', 'Shiva Parvati', 'Hanuman Ji'] },
            { title: 'Material Type', items: ['Brass Idols', 'Marble Idols', 'Clay Idols', 'Wooden Idols'] },
        ],
    },
    {
        id: 'incense',
        name: 'Incense & Fragrances',
        imageUrl:
            'https://scentingsecrets.com/cdn/shop/files/ARABIANOUDH50G.webp?v=1696239214',
        hasDropdown: true,
        submenu: [
            { title: 'Types', items: ['Agarbatti', 'Dhoop', 'Cone Dhoop', 'Camphor Tablets'] },
            { title: 'Fragrance', items: ['Sandalwood', 'Jasmine', 'Rose', 'Mogra'] },
        ],
    },
    {
        id: 'festival-items',
        name: 'Festival Items',
        imageUrl:
            'https://m.media-amazon.com/images/I/81Lj-+t0DVL.jpg',
        hasDropdown: true,
        submenu: [
            { title: 'Diwali Special', items: ['Diyas', 'Torans', 'Candles', 'Rangoli Colors'] },
            { title: 'Chhath Puja', items: ['Soop', 'Daura', 'Thekua Mould', 'Deepak', 'Basket'] },
        ],
    },
    {
        id: 'spiritual-books',
        name: 'Spiritual Books',
        imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTntT9A6QLyx9BIXkqKnvPPfYmTeGjyvFbfIg&s',
        hasDropdown: true,
        submenu: [
            {
                title: 'Sacred Texts',
                items: [
                    'Bhagavad Gita',
                    'Ramayana',
                    'Mahabharata',
                    'Vedas',
                    'Upanishads',
                ],
            },
            {
                title: 'Pooja Guides',
                items: [
                    'Daily Pooja Vidhi',
                    'Festival Pooja Manuals',
                    'Satyanarayan Katha',
                    'Durga Saptashati',
                ],
            },
            {
                title: 'Spiritual Teachings',
                items: [
                    'Art of Living',
                    'Meditation & Mindfulness',
                    'Devotional Songs & Chants',
                    'Philosophy & Yoga Texts',
                ],
            },
        ],
    },

    {
        id: 'rudraksha',
        name: 'Rudraksha & Gemstones',
        imageUrl:
            'https://www.rishigyanlive.com/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-30-at-12.41.13.jpeg',
        hasDropdown: true,
        submenu: [
            { title: 'Rudraksha Types', items: ['1 Mukhi', '5 Mukhi', '7 Mukhi', '9 Mukhi'] },
            { title: 'Gemstones', items: ['Ruby', 'Pearl', 'Emerald', 'Sapphire'] },
        ],
    },
    {
        id: 'decor',
        name: 'Temple Decor',
        imageUrl:
            'https://www.saugatonline.com/products_image/d2a9a9ac9c0060d3afb9e41244f84276.jpg',
        hasDropdown: true,
        submenu: [
            { title: 'Items', items: ['Mandir Bells', 'Garlands', 'Thali', 'Aarti Stand', 'Pooja Mats'] },
            { title: 'Lighting', items: ['Electric Diyas', 'LED Garlands', 'Oil Lamps'] },
        ],
    },
];

export default function EcommerceNav() {
    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-50">
            {/* ===== Desktop Header ===== */}
            <div className="hidden md:block relative">
                <div className="max-w-7xl mx-auto">
                    <NavigationMenu viewport={false} className="max-w-full">
                        <NavigationMenuList className="flex justify-start gap-2 p-4 relative">
                            {categories.map((category) => (
                                <NavigationMenuItem
                                    key={category.id}
                                    className="relative list-none overflow-visible z-50"
                                >
                                    {category.hasDropdown ? (
                                        <>
                                            <NavigationMenuTrigger
                                                className="flex flex-col items-center gap-1 px-4 py-2 h-auto bg-transparent hover:bg-gray-50 rounded-lg focus:outline-none data-[state=open]:bg-gray-50 transition-colors [&>svg]:hidden"
                                            >
                                                <div className="w-20 h-20 flex items-center justify-center border border-gray-200 p-0.5 rounded-full shadow-sm hover:shadow-md transition-shadow group-hover:border-tertiary">
                                                    <img
                                                        src={category.imageUrl}
                                                        alt={category.name}
                                                        className="w-full h-full object-cover rounded-full"
                                                    />
                                                </div>
                                                <span className="text-sm md:text-[12px] font-semibold text-gray-600 group-hover:text-tertiary transition-colors mt-1">
                                                    {category.name}
                                                </span>
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent
                                                className="absolute left-0 top-full mt-2 bg-white shadow-lg border border-gray-200 rounded-lg p-6 max-h-[400px] overflow-y-auto w-auto min-w-[280px] max-w-[700px]"
                                            >
                                                <div
                                                    className={`grid gap-6 ${
                                                        category.submenu && category.submenu.length > 2
                                                            ? 'grid-cols-2'
                                                            : 'grid-cols-1'
                                                    }`}
                                                >
                                                    {category.submenu?.map((section, idx) => (
                                                        <div key={idx} className="break-inside-avoid">
                                                            <h3 className="font-semibold text-base mb-3 text-rose-900 border-b border-rose-100 pb-2">
                                                                {section.title}
                                                            </h3>
                                                            <ul className="space-y-1">
                                                                {section.items.map((item, itemIdx) => (
                                                                    <li key={itemIdx}>
                                                                        <NavigationMenuLink
                                                                            href="#"
                                                                            className="block px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-rose-50 hover:text-rose-900 transition-colors cursor-pointer"
                                                                        >
                                                                            {item}
                                                                        </NavigationMenuLink>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </NavigationMenuContent>
                                        </>
                                    ) : (
                                        <NavigationMenuLink
                                            href="#"
                                            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="w-20 h-20 flex items-center justify-center border border-gray-200 p-0.5 rounded-full shadow-sm">
                                                <img
                                                    src={category.imageUrl}
                                                    alt={category.name}
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            </div>
                                            <span className="text-sm md:text-[12px] font-semibold text-gray-600 mt-1">
                                                {category.name}
                                            </span>
                                        </NavigationMenuLink>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>

            {/* ===== Mobile Header ===== */}
            {/* <div className="flex md:hidden items-center justify-between p-4 border-b">
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetTrigger asChild>
                        <button className="p-2 rounded-md">
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[80%] overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle className="text-lg font-semibold mb-4">
                                Browse Categories
                            </SheetTitle>
                        </SheetHeader>
                        <ul className="space-y-4">
                            {categories.map((cat) => (
                                <li key={cat.id}>
                                    <button
                                        className="w-full text-left flex justify-between items-center py-2 text-gray-800 font-medium"
                                        onClick={() => handleMenuToggle(cat.id)}
                                    >
                                        <span>{cat.name}</span>
                                        {cat.hasDropdown &&
                                            (activeMenu === cat.id ? (
                                                <ChevronUp className="w-5 h-5" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5" />
                                            ))}
                                    </button>
                                    {cat.hasDropdown && activeMenu === cat.id && (
                                        <ul className="ml-4 mt-2 space-y-1">
                                            {cat.submenu?.map((section, idx) => (
                                                <div key={idx}>
                                                    <h3 className="text-sm font-semibold text-gray-700">
                                                        {section.title}
                                                    </h3>
                                                    {section.items.map((item, itemIdx) => (
                                                        <li key={itemIdx} className="text-sm text-gray-600 pl-2 py-1">
                                                            {item}
                                                        </li>
                                                    ))}
                                                </div>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </SheetContent>
                </Sheet>
            </div> */}
        </header>
    );
}
