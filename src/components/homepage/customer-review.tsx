import React from "react";
import CustomCarousel from "./customer-carousel";
import { useTheme } from "next-themes";

// Define the type for each review
interface Review {
  name: string;
  expertise: string; // Customer type or feedback tone
  bio: string;
  img?: string;
  rating: number; // Rating out of 5
}

// Static customer review data (replace with API later if needed)
const guides: Review[] = [
  {
    name: "Aditi Sharma",
    expertise: "Verified Buyer",
    bio: "Reserved a Lucid Air through Velaire House and the underwriting plus reveal ritual wrapped in 36 hours. It felt like commissioning art, not buying a car.",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5,
  },
  {
    name: "Rohan Mehta",
    expertise: "Repeat Customer",
    bio: "Exited my previous GT and upgraded to a Taycan Turbo S. The Velaire advisors ran financing, logistics, and even curated the soundtrack for delivery.",
    img: "https://randomuser.me/api/portraits/men/42.jpg",
    rating: 4,
  },
  {
    name: "Sneha Patel",
    expertise: "EV Enthusiast",
    bio: "Booked a Nexon EV test drive online and the advisor arrived with a portable charger and full demo. Battery health report and service history were shared instantly.",
    img: "https://randomuser.me/api/portraits/women/60.jpg",
    rating: 5,
  },
  {
    name: "Arjun Gupta",
    expertise: "Fleet Manager",
    bio: "We refreshed our field fleet with four Defender commissions. Velaire orchestrated paperwork, wraps, and GPS retrofits with zero downtime.",
    img: "https://randomuser.me/api/portraits/men/29.jpg",
    rating: 5,
  },
  {
    name: "Priya Nair",
    expertise: "First-time Buyer",
    bio: "First ownership journey and I was nervous. The Velaire capital team unpacked every clause, locked a low APR, and even booked my first weekend drive.",
    img: "https://randomuser.me/api/portraits/women/70.jpg",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    expertise: "Weekend Driver",
    bio: "Wanted something fun for road trips and landed a mint condition Jeep Compass. The detailing, ceramic coating, and delivery experience were top-notch.",
    img: "https://randomuser.me/api/portraits/men/19.jpg",
    rating: 4,
  },
  {
    name: "Meera Joshi",
    expertise: "Luxury Segment",
    bio: "Test drove three luxury sedans back-to-back at their studio and got real-time telematics reports. Settled on an Audi A4 that feels practically brand new.",
    img: "https://randomuser.me/api/portraits/women/15.jpg",
    rating: 5,
  },
];

const CustomerReviewPage: React.FC = () => {

  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Handle viewing full review or related product
  const handleguide = (review: Review): void => {
    //navigate("/reviews", { state: { selectedReviewer: review.name } });
  };

  return (
    <section className="w-full hidden sm:block">
      <div className="max-w-8xl mx-auto px-4 text-center">
        {/* Carousel Section */}
        <CustomCarousel
          guides={guides}
          viewprofilehandle={handleguide}
          isHome={true}
        />
      </div>
    </section>
  );
};

export default CustomerReviewPage;
