'use client'

import EcommerceNav from "@/components/category/navbar-category";
import RecommendedSection from "@/components/homepage/best-sale";
import CustomerReview from "@/components/homepage/customer-review";
import FeatureHighlights from "@/components/homepage/feature-highlight";
import HeroBanner from "@/components/homepage/hero-section";
import ShopByCategory from "@/components/homepage/shop-by-category";
import SuggestCategory from "@/components/homepage/suggest-by-category";
import TrendingProductSection from "@/components/homepage/trending-product";
import { UpcomingFestival } from "@/components/homepage/upcoming-festival";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import TopNavbar from "@/components/user/navigation/top-header";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <SidebarProvider>
      <div className="relative flex flex-col min-h-screen w-full">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 w-full backdrop-blur-sm bg-background/95 supports-[backdrop-filter]:bg-background/60">
          <TopNavbar />
        </div>
        <div>
          <EcommerceNav />
        </div>

        <ScrollArea className="flex-grow">
          <main className="relative mx-auto w-full max-w-full sm:max-w-4xl md:max-w-6xl lg:max-w-[2100px] px-4 sm:px-6 lg:px-8">
            <div className="flex-1 py-4 md:py-6 lg:py-8 space-y-12">

              {/* Hero Section */}
              <div className="" onClick={() => (window.location.href = "/product")}>
              <HeroBanner />
</div>
              {/* Feature Highlight */}
              <SectionWrapper title="Feature Highlight">
                <FeatureHighlights />
              </SectionWrapper>

              {/* Shop by category */}
              <SectionWrapper title="Shop By Category">
                <div onClick={() => (window.location.href = "/product")} className="w-full cursor-pointer">
                  <ShopByCategory />
                </div>
              </SectionWrapper>

              {/* Best Recommendation */}
              <SectionWrapper
                title="Best Recommendation"
                subtitle="Special Offers"
              >
                <div onClick={() => (window.location.href = "/product")} className="w-full cursor-pointer">
                  <RecommendedSection />
                </div>
              </SectionWrapper>

              {/* Trending Products */}
              <SectionWrapper
                title="Trending Products"
                subtitle="Special Offers"
              >
                <div onClick={() => (window.location.href = "/product")} className="w-full cursor-pointer">
                  <TrendingProductSection />
                </div>
              </SectionWrapper>

              {/* Suggested for you */}
              <SectionWrapper title="Suggested For You">
                <div onClick={() => (window.location.href = "/product")} className="w-full cursor-pointer">
                  <SuggestCategory />
                </div>
              </SectionWrapper>

              {/* Upcoming Festival Pooja Kits */}
              <SectionWrapper
                title="Upcoming Festival Pooja Kits"
                subtitle="Special Offers"
              >
                <UpcomingFestival />
              </SectionWrapper>

              {/* Customer Reviews */}
              <div className="hidden sm:block">
              <SectionWrapper
                title="Customer Review"
                subtitle="What Our Customers Say" >
               <CustomerReview />
              </SectionWrapper>
              </div>
            </div>
          </main>
        </ScrollArea>

        {/* Footer */}
        <Separator />
        <Footer />
      </div>
    </SidebarProvider>
  );
}

// ----------------------
// Section Wrapper Component
// ----------------------
interface SectionWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

function SectionWrapper({ title, subtitle, children }: SectionWrapperProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center">
      {subtitle && (
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-3 sm:px-6 py-2 shadow-lg mb-2">
          <Sparkles className="w-5 h-5 text-orange-500" />
          <span className="text-sm font-semibold text-gray-700">{subtitle}</span>
        </div>
      )}
      <div className="py-4 sm:py-6 md:py-8 w-full">
        <PageHeader title={title} />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
