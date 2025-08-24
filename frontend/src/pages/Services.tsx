import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { services } from "@/data/mockData";
import React from "react";
import track from "../../public/services/track.jpg";
import bikes from "../../public/services/bikes.jpeg";
import event from "../../public/services/event.jpg";
import night from "../../public/services/night.jpg";
import tour from "../../public/services/tour.jpg";
import privatetrack from "../../public/services/privatetrack.jpg";
import cyclothon from "../../public/services/cyclothon.jpeg";

const servicesData = [
  {
    id: 1,
    name: "Trekking & Hiking",
    description:
      "Step off the beaten path and into the wild with our Trekking & Hiking experiences—crafted for nature lovers, thrill-seekers, and anyone craving a deeper connection with the outdoors. From gentle forest trails to challenging mountain ascents, we offer guided adventures that match your pace and passion. Our expert team ensures a safe, well-planned, and unforgettable journey, whether you’re a first-time hiker or a seasoned trekker. All you need to bring is your spirit of adventure—we’ll handle the rest. Reconnect with nature. Challenge your limits. Create lasting memories. With our Trekking & Hiking service, every trail tells a story—let’s write yours.",
    image: track,
    category: "Trekking",
    highlights: [
      "Scenic Routes through forests, hills, and mountains",
      "Professional Guides with local knowledge and safety training",
      "Customizable Treks & Hikes for individuals, groups, and families",
      "All-Inclusive Packages with gear, meals, permits & logistics",
      "Campfire Nights & Nature Insights for a full outdoor experience",
    ],
  },
  {
    id: 2,
    name: "Night Camping",
    description:
      "Unplug from the chaos and reconnect with nature through the magic of Night Camping. We designed to elevate your overnight outdoor experience—combining comfort, safety, and a touch of wilderness wonder. Whether you're a first-time camper or a seasoned explorer, Night Camping offers everything you need for a memorable night in the wild. From cozy tents and warm sleeping bags to lanterns and campfire gear, we've got you covered. Soak in the silence. Count the stars. Feel the breeze. With Night Camping, the night becomes your playground.",
    image: night,
    category: "Camping",
    highlights: [
      "Easy-to-Set-Up Tents for quick shelter",
      "Campfire Essentials for warmth, cooking, and stories",
      "All-Weather Sleep Gear to keep you dry and comfortable",
      "Eco-Friendly & Safe for nature and you",
    ],
  },
  {
    id: 3,
    name: "Cyclothon",
    description:
      "Join the movement with our high-energy Cyclothon events—where fitness, fun, and community come together on two wheels. Whether you're a pro cyclist, a weekend rider, or just in it for the thrill, our Cyclothon is designed to inspire and energize. With scenic routes, safe tracks, and a supportive environment, this is more than a race—it's a celebration of endurance, freedom, and the spirit of cycling. Come ride with hundreds of like-minded enthusiasts and make every pedal count. Whether you're riding for fun, fitness, or a cause—Cyclothon is the ride you'll never forget.",
    image: cyclothon,
    category: "Cyclothon",
    highlights: [
      "Multiple Distance Categories for all age groups & fitness levels",
      "Fully Secured Routes with medical & technical support",
      "Participant Kits including T-shirts, badges & goodies",
      "Trophies, Medals & Certificates for top finishers",
      "Live DJ, Food Stalls & More at the finish zone",
    ],
  },
  {
    id: 4,
    name: "Tour Packages",
    description:
      "Explore the world your way with our all-inclusive Tour Packages—crafted to turn every trip into an unforgettable experience. Whether you're seeking adventure, relaxation, culture, or a bit of everything, we’ve got the perfect itinerary waiting for you. From serene hill stations and vibrant cities to hidden gems and exotic getaways, our packages are designed to fit your budget, interests, and travel style. Just pick your destination, and we’ll handle the rest—accommodation, transport, meals, sightseeing, and more. Leave the planning to us and focus on what really matters: making memories.",
    image: tour,
    category: "Tour",
    highlights: [
      "Customizable Itineraries for solo travelers, couples, families & groups",
      "Top-rated Stays and seamless travel arrangements",
      "Local Guides & Support for a smooth and safe experience",
      "Affordable Packages with no hidden costs",
      "Weekend Getaways to Long Vacations—we’ve got it all",
    ],
  },
  {
    id: 5,
    name: "Cultural Events",
    description:
      "Immerse yourself in the rich tapestry of culture, art, and heritage with our unforgettable Cultural Events. From traditional festivals and folk performances to modern art showcases and community gatherings, we bring people together through meaningful experiences that honor diversity and creativity. Our events are thoughtfully curated to highlight local talent, preserve traditions, and spark cultural appreciation among all age groups. Whether you’re a performer, a participant, or just a curious soul—there’s a place for you in the celebration. Come for the colors, stay for the connections. With our Cultural Events, every moment is a celebration of who we are.",
    image: event,
    category: "Cultural",
    highlights: [
      "Festivals, Fairs & Cultural Showcases",
      "Live Music, Dance, & Drama Performances",
      "Handicraft & Food Stalls supporting local artisans",
      "Workshops & Interactive Experiences for all ages",
      "Collaborations with Artists, Schools & Cultural Groups",
    ],
  },
  {
    id: 6,
    name: "Group Bike Rides",
    description:
      "Feel the wind, find your rhythm, and ride as one with our exciting Group Bike Rides. Designed for fun, fitness, and friendship, our group rides bring cycling lovers of all levels together to explore scenic routes and share the joy of the journey. Whether you're a beginner looking for a casual cruise or an experienced rider seeking a challenge, our well-organized rides offer something for everyone. It’s more than just a ride—it’s a community on wheels. Connect with fellow riders, stay motivated, and discover new paths—one pedal stroke at a time.",
    image: bikes,
    category: "Bike Ride",
    highlights: [
      "Curated Routes with varying distances & difficulty levels",
      "Supportive, Friendly Riding Community",
      "On-Ride Support including basic repairs & guidance",
      "Group Ride Essentials like helmets, snacks, & hydration stops",
      "Photo Moments & Post-Ride Meetups to relive the fun",
    ],
  },
  {
    id: 7,
    name: "Private Trek",
    description:
      "Experience a custom trekking journey away from the crowds. A personal guide, bespoke routes, and private camp setups ensure a seamless and exclusive adventure just for you or your private group. Our Private Trek service offers the ultimate freedom to explore at your own pace, with itineraries tailored to your preferences, fitness level, and desired destinations. From a romantic escape to a family bonding trip or a corporate team-building event, your private adventure awaits. Your trek, your rules—with our expertise guiding the way.",
    image: privatetrack,
    category: "private",
    highlights: [
      "Exclusive Adventures, Tailored for You",
      "Personal Guide for one-on-one attention",
      "Bespoke Routes based on your preferences",
      "Private Camp Setups for a seamless experience",
      "Ultimate Freedom to explore at your own pace",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl min-w-[80vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our wide range of adventures and experiences, each designed
            to create lasting memories.
          </p>
        </div>

        <div className="space-y-16">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden group transform hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="grid md:grid-cols-2 grid-cols-1">
                {/* Image Section */}
                <div
                  className={`w-full aspect-[16/9] md:aspect-[4/3] ${
                    index % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Text Content Section */}
                <div className="p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {service.name}
                  </h2>
                  <Badge className="mb-4 w-fit bg-[#b85c38] text-white rounded-full">
                    {service.category}
                  </Badge>
                  <p className="text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
