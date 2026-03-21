'use client'

import HeroBanner from "@/components/homepage/hero-section";
import CollectionGrid from "@/components/homepage/collection-grid";
import TrustSection from "@/components/homepage/trust-section";
import FeaturedProducts from "@/components/homepage/featured-products";
import BrandStory from "@/components/homepage/brand-story";
import SmellBrowse from "@/components/homepage/smell-browse";
import ReviewsSection from "@/components/homepage/reviews-section";
import { Footer } from "@/components/layout/footer";
import TopNavbar from "@/components/user/navigation/top-header";
import DiscoverySet from "@/components/homepage/discovery-set";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen w-full bg-white">
      <TopNavbar />
      <main className="flex-grow w-full overflow-x-hidden">
        <HeroBanner />
        <TrustSection />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 space-y-24">
          <CollectionGrid />
          <FeaturedProducts />
          <SmellBrowse />
          <DiscoverySet />
          <BrandStory />
          <ReviewsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
