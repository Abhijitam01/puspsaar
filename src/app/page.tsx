'use client'

import HeroBanner from "@/components/homepage/hero-section";
import CollectionGrid from "@/components/homepage/collection-grid";
import TrustSection from "@/components/homepage/trust-section";
import FeaturedProducts from "@/components/homepage/featured-products";
import BrandStory from "@/components/homepage/brand-story";
import { Footer } from "@/components/layout/footer";
import TopNavbar from "@/components/user/navigation/top-header";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen w-full bg-background">
      <TopNavbar />
      <main className="flex-grow">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-24 py-12">
            <HeroBanner />
            <CollectionGrid />
            <FeaturedProducts />
            <BrandStory />
            <TrustSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
