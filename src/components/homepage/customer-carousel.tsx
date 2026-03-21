import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useTheme } from "next-themes";


const AUTO_SLIDE_INTERVAL = 3500;

interface Guide {
    name: string;
    expertise: string;
    bio: string;
    img?: string;
    rating: number;
}

interface CustomCarouselProps {
    guides: Guide[];
    viewprofilehandle: (guide: Guide) => void;
    isHome?: boolean;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
    guides,
    viewprofilehandle,
    isHome = false,
}) => {
    const { theme } = useTheme();
    const isDarkMode = theme === "dark";
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const prevSlide = (): void => {
        setCurrentIndex((prev) => (prev - 1 + guides.length) % guides.length);
    };

    const nextSlide = (): void => {
        setCurrentIndex((prev) => (prev + 1) % guides.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
        return () => clearInterval(timer);
    }, [currentIndex, guides.length]);

    return (
        <div className="carousel-container relative flex flex-col items-center  overflow-hidden">
               {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-5 right-10 w-80 h-80 bg-secondary/20 dark:bg-secondary/20 rounded-full blur-2xl"></div>
                    <div className="absolute top-10 left-10 w-80 h-80 bg-primary/30 dark:bg-primary/15 rounded-full blur-3xl"></div>
                </div>
            {/* Left button */}
            <button
                aria-label="Previous"
                onClick={prevSlide}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 backdrop-blur-md shadow-lg p-3 rounded-full transition-all duration-300 ${isDarkMode
                        ? "bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40"
                        : "bg-white/80 border border-gray-200 hover:bg-white hover:border-secondary"
                    } cursor-pointer`}
            >
                <ChevronLeft
                    className={`w-6 h-6 ${isDarkMode ? "text-white" : "text-gray-700"}`}
                />
            </button>

            {/* Cards */}
            <div className="carousel-track flex justify-center items-center">
                {guides.map((guide, index) => {
                    let position = "hidden";
                    if (index === currentIndex) position = "center";
                    else if (index === (currentIndex + 1) % guides.length)
                        position = "right";
                    else if (index === (currentIndex - 1 + guides.length) % guides.length)
                        position = "left";

                    return (
                        <div
                            key={index}
                            className={`${position} w-[280px] sm:w-[300px] h-[420px] flex flex-col items-center justify-center text-center hover:-translate-y-[10px] backdrop-blur-md rounded-2xl p-6 transition-all duration-300 ${isDarkMode
                                    ? "bg-black/30 border border-white/20 hover:border-white/40"
                                    : "bg-white/30 border-2 border-gray-300 hover:border-secondary"
                                } ${position === "center" ? "scale-100" : "scale-90 opacity-80"} card`}
                        >
                            <img
                                src={guide.img || "/assets/default-card.jpg"}
                                alt={guide.name || "Customer image"}
                                loading="eager"
                                className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-gray-200"
                            />
                            <h3
                                className={`${isDarkMode ? "text-white" : "!text-gray-900"
                                    } font-semibold mt-1`}
                            >
                                {guide.name}
                            </h3>
                            <p className="text-tertiary text-sm">{guide.expertise}</p>

                            {/* ⭐ Rating */}
                            <div className="flex justify-center mt-2 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < guide.rating
                                                ? "text-yellow-400 fill-yellow-400"
                                                : isDarkMode
                                                    ? "text-gray-600"
                                                    : "text-gray-400"
                                            }`}
                                    />
                                ))}
                            </div>

                            <p
                                className={`text-[14px] my-3 ${isDarkMode ? "text-gray-400" : "text-gray-800"
                                    }`}
                            >
                                {guide.bio}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Right button */}
            <button
                aria-label="Next"
                onClick={nextSlide}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 backdrop-blur-md shadow-lg p-3 rounded-full transition-all duration-300 ${isDarkMode
                        ? "bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40"
                        : "bg-white/80 border border-gray-200 hover:bg-white hover:border-secondary"
                    } cursor-pointer`}
            >
                <ChevronRight
                    className={`w-6 h-6 ${isDarkMode ? "text-white" : "text-gray-700"}`}
                />
            </button>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-6 space-x-2">
                {guides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index
                                ? "bg-tertiary scale-110"
                                : isDarkMode
                                    ? "bg-gray-500"
                                    : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CustomCarousel;
