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
    bio: "Loved the premium quality of incense sticks and diya wicks. The packaging was eco-friendly and delivery was on time. Feels divine every morning using these products!",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5,
  },
  {
    name: "Rohan Mehta",
    expertise: "Repeat Customer",
    bio: "Excellent experience! The brass diya and camphor I ordered were authentic and beautifully crafted. Customer support was also very responsive.",
    img: "https://randomuser.me/api/portraits/men/42.jpg",
    rating: 4,
  },
  {
    name: "Sneha Patel",
    expertise: "Puja Enthusiast",
    bio: "I ordered the full Navratri Pooja kit, and everything—from kumkum to coconut—was fresh and neatly packed. It made the rituals so smooth and peaceful.",
    img: "https://randomuser.me/api/portraits/women/60.jpg",
    rating: 5,
  },
  {
    name: "Arjun Gupta",
    expertise: "Regular Devotee",
    bio: "Great selection of spiritual essentials. The sandalwood paste and ghee diya set were of superior quality. I’ll definitely shop again for upcoming festivals.",
    img: "https://randomuser.me/api/portraits/men/29.jpg",
    rating: 4,
  },
  {
    name: "Priya Nair",
    expertise: "First-time Buyer",
    bio: "I’m impressed with the freshness of flowers and the aroma of dhoop sticks. The pooja thali set was exactly as shown on the website!",
    img: "https://randomuser.me/api/portraits/women/70.jpg",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    expertise: "Temple Committee Member",
    bio: "Ordered in bulk for our temple’s monthly pooja. Everything arrived on schedule — from kalash to chandan powder — in perfect condition.",
    img: "https://randomuser.me/api/portraits/men/19.jpg",
    rating: 5,
  },
  {
    name: "Meera Joshi",
    expertise: "Spiritual Seeker",
    bio: "The Rudraksha mala I bought was blessed and pure. It’s been a wonderful experience connecting with such a trustworthy pooja Samugri store online.",
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
