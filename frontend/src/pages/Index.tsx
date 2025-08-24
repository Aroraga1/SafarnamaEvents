import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

import heroImage from "/other/hero-mountain.jpg";

import HeroSection from "@/components/ui/HeroSection";
import NextEventHighlight from "@/components/ui/NextEventHighlight";
import PastEventsSection from "@/components/ui/PastEventsSection";
import ReviewsSection from "@/components/ui/ReviewsSection";
import CallToActionSection from "@/components/ui/CallToActionSection";

// Optional: Define the type of `event` if using TypeScript
// interface EventType {
//   _id: string;
//   name: string;
//   date: string;
//   time: string;
//   priceMale: number;
//   priceFemale: number;
// }
////

const Index = ({ events }) => {
  const { events: allEvents, upcomingEvents, pastEvents } = events;

  return (
    <div className="min-h-screen">
      <HeroSection heroImage={heroImage} />
      <NextEventHighlight upcomingEvents={upcomingEvents} />
      <PastEventsSection pastEvents={pastEvents} />
      <ReviewsSection />
      <CallToActionSection />
    </div>
  );
};

export default Index;
