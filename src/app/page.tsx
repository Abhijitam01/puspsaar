'use client'

import HeroBanner from "@/components/homepage/hero-section";
import CollectionGrid from "@/components/homepage/collection-grid";
import TrustSection from "@/components/homepage/trust-section";
import FeaturedProducts from "@/components/homepage/featured-products";
import BrandStory from "@/components/homepage/brand-story";
import { Footer } from "@/components/layout/footer";
import TopNavbar from "@/components/user/navigation/top-header";
import DiscoverySet from "@/components/homepage/discovery-set";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen w-full bg-background">
      <TopNavbar />
      <main className="flex-grow w-full overflow-x-hidden">
        <HeroBanner />
        
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-24 mb-24 space-y-32">
          <CollectionGrid />
          <FeaturedProducts />
          <DiscoverySet />
          <BrandStory />
          <TrustSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
