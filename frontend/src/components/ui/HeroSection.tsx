import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  // heroImage prop ab use nahi hoga, slides array use hoga
  onBookTrekClick: () => void; // Naya prop to handle scrolling to the target component (now also used by the scroll indicator)
}

const slides = [
  { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" }, // Replace with your video URL
  {
    type: "image",
    src: "https://placehold.co/1920x1080/FFD700/000000?text=Adventure+1",
  },
  {
    type: "image",
    src: "https://placehold.co/1920x1080/ADFF2F/000000?text=Adventure+2",
  },
  {
    type: "image",
    src: "https://placehold.co/1920x1080/87CEEB/000000?text=Adventure+3",
  },
  {
    type: "image",
    src: "https://placehold.co/1920x1080/FF6347/000000?text=Adventure+4",
  },
];

const HeroSection: React.FC<HeroSectionProps> = ({ onBookTrekClick }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null); // Specify HTMLVideoElement type for ref

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null; // Specify NodeJS.Timeout for clarity

    if (slides[0].type === "video" && !videoEnded) {
      return;
    }

    interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [videoEnded]);

  const handleVideoEnded = () => {
    setVideoEnded(true);
    setCurrentSlideIndex(1);
  };

  // const handleExploreClick = () => {
  //   window.location.href = "/gallery"; // Navigate to /gallery page
  // };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
              ${currentSlideIndex === index ? "opacity-100" : "opacity-0"}`}
          >
            {slide.type === "video" ? (
              <video
                ref={videoRef}
                src={slide.src}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnded}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={slide.src}
                alt={`Adventure ${index}`}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
        {/* Overlay with new color gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2c3e50]/70 to-[#f39c12]/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Your Next
          <span className="block bg-gradient-to-r from-[#b85c38] to-[#f39c12] bg-clip-text text-transparent">
            {" "}
            Adventure Awaits
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
          Join Safarnama for unforgettable treks, beach parties, desert safaris,
          and so much more!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button
            className="bg-[#b85c38] hover:bg-[#a15031] text-white"
            size="xl"
            onClick={onBookTrekClick} // Call the passed down function for scrolling
          >
            Book the Next Trek!
          </Button>
          <a href="/gallery" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="xl"
              className="bg-transparent border-white text-white hover:bg-white/10 hover:text-[#b85c38]"
              // onClick={} // Navigate to /gallery
            >
              Explore Adventures
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-pointer" // Added cursor-pointer
        onClick={onBookTrekClick} // Added onClick handler to the scroll indicator
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
