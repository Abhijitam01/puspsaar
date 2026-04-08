'use client'

import { useState, useEffect } from 'react';
import { createClient } from "@/lib/supabase/client";
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
  const [settings, setSettings] = useState<Record<string, any>>({});
  const supabase = createClient();

  useEffect(() => {
    async function getSettings() {
      const { data } = await supabase.from('site_settings').select('*');
      if (data) {
        const settingsMap = data.reduce((acc: any, curr: any) => {
          acc[curr.id] = curr.value;
          return acc;
        }, {});
        setSettings(settingsMap);
      }
    }
    getSettings();
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen w-full bg-white">
      <TopNavbar />
      <main className="flex-grow w-full overflow-x-hidden">
        <HeroBanner settings={settings.hero_banner} />
        <TrustSection />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 space-y-24">
          <CollectionGrid settings={settings.collection_grid} />
          <FeaturedProducts />
          <SmellBrowse />
          <DiscoverySet settings={settings.discovery_set} />
          <BrandStory settings={settings.brand_story} />
          <ReviewsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
