"use client";
import Link from "next/link";
import { FaPaypal, FaStripe, FaCreditCard, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";

export function Footer() {
    const { resolvedTheme } = useTheme();

    return (
        <footer className="relative  pt-16 pb-6">
            <div className="container mx-auto px-4">
                {/* Top Grid: Logo, Categories, Services, Newsletter */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Logo Section */}
                    <div className="space-y-4">
                        <div className="cursor-pointer flex items-center gap-1">
                            <Image
                                src={resolvedTheme === 'dark' ? "/logo.png" : "/logo.png"}
                                alt="logo"
                                width={100}
                                height={100}
                                className="rounded-lg"
                            />

                        </div>
                        <p className="text-muted-foreground">Patna, Bihar, India</p>
                        <p className="text-muted-foreground">Hours: 9:00 AM - 8:00 PM, Mon - Sat</p>
                        <p className="text-muted-foreground">support@Samugri.com</p>
                    </div>

                    {/* Shop Categories */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 dark:text-gray-900">Shop Categories</h3>
                        <ul className="space-y-2">
                            <li><span className="text-muted-foreground">Diya & Candles</span></li>
                            <li><span className="text-muted-foreground">Pooja Thali Set</span></li>
                            <li><span className="text-muted-foreground">Incense & Dhoop</span></li>
                            <li><span className="text-muted-foreground">Tulsi & Rudraksha</span></li>
                            <li><span className="text-muted-foreground">Decorative Items</span></li>
                            <li><span className="text-muted-foreground">Holy Water & Ganga Jal</span></li>
                        </ul>
                    </div>

                    {/* Customer Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 dark:text-gray-900">Customer Services</h3>
                        <ul className="space-y-2">
                            <li><span className="text-muted-foreground">Order Tracking</span></li>
                            <li><span className="text-muted-foreground">Pooja Kit Customization</span></li>
                            <li><span className="text-muted-foreground">Gift Wrapping Services</span></li>
                            <li><span className="text-muted-foreground">Shipping & Delivery Info</span></li>
                            <li><span className="text-muted-foreground">Help Center / Support</span></li>
                        </ul>
                    </div>


                    {/* Newsletter Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 dark:text-gray-900">Subscribe For Newsletter</h3>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-background dark:bg-white border-muted"
                                />
                                <Button variant="ghost" className="dark:bg-orange-500">Subscribe</Button>
                            </div>
                            <p className="text-sm text-muted-foreground">No spam. Just the latest deals and offers</p>
                        </div>
                    </div>
                </div>
                <Separator className="dark:bg-gray-200" />

                {/* Middle Grid: Social, Payments, Quick Links, App Download */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 max-w-6xl mx-auto">
                    {/* Social Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 dark:text-gray-900">Follow Us</h4>
                        <div className="flex space-x-4">
                            <Link href="https://youtube.com" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary/10">
                                <FaYoutube className="w-5 h-5 text-muted-foreground" />
                            </Link>
                            <Link href="https://facebook.com" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary/10">
                                <FaFacebook className="w-5 h-5 text-muted-foreground" />
                            </Link>
                            <Link href="https://instagram.com" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary/10">
                                <FaInstagram className="w-5 h-5 text-muted-foreground" />
                            </Link>
                            <Link href="https://twitter.com" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary/10">
                                <FaTwitter className="w-5 h-5 text-muted-foreground" />
                            </Link>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 dark:text-gray-900">Payments</h4>
                        <div className="flex space-x-4">
                            <div className="p-2 bg-muted  dark:bg-gray-100 rounded flex items-center justify-center">
                                <FaPaypal className="w-6 h-6 text-muted-foreground mr-2" />
                                <span className="text-xs text-muted-foreground">PayPal</span>
                            </div>
                            <div className="p-2 bg-muted rounded dark:bg-gray-100 flex items-center justify-center">
                                <FaStripe className="w-6 h-6 text-muted-foreground mr-2" />
                                <span className="text-xs text-muted-foreground">Stripe</span>
                            </div>
                            <div className="p-2 bg-muted rounded dark:bg-gray-100 flex items-center justify-center">
                                <FaCreditCard className="w-6 h-6 text-muted-foreground mr-2" />
                                <span className="text-xs text-muted-foreground">Credit Card</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}


                    {/* App Download */}
                    <div className="">
                        <h4 className="text-lg font-semibold mb-4 dark:text-gray-900">Download App</h4>
                        <div className="flex flex-col  sm:flex-row gap-8">
                            <Link href="#" className="flex items-center ">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK-1PF0frFMSO1ma9BjGNp9QfFhBChAC0aVJHdv_3FglgPu-gzFZQk_uvxmPOo3vueGg&usqp=CAU" // replace with your App Store image path
                                    alt="App Store"
                                    width={135}
                                    height={40}
                                    className="object-contain"
                                />
                            </Link>
                            <Link href="#" className="flex items-center ">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKNqs653du81vCkY4LX88JvCi10csd0y3czCbsm6INho2ej9jF0_6pdqQEuVHCjvf_A&usqp=CAU" // replace with your Google Play image path
                                    alt="Google Play"
                                    width={135}
                                    height={40}
                                    className="object-contain"
                                />
                            </Link>
                        </div>
                    </div>

                </div>

                <Separator className="dark:bg-gray-200" />

                {/* Bottom Section */}
                <div className="pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-muted-foreground">© 2024 Samugri. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="/terms-conditions" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
                            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
                            <Link href="/contact-us" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link>
                            <Link href="/refund-policy" className="text-sm text-muted-foreground hover:text-primary">Refund Policy</Link>
                            <Link href="/shipping-policy" className="text-sm text-muted-foreground hover:text-primary">Shipping Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}