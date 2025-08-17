import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Define the categories based on the user's keywords, matching the schema
const categories = [
  "All",
  "Trekking",
  "Camping",
  "Cyclothon",
  "Tour",
  "Cultural",
  "Bike Ride",
  "private",
];

const interleaveImages = (events) => {
  if (!Array.isArray(events)) {
    return [];
  }
  const categorizedEvents = events.reduce((acc, event) => {
    if (
      categories.includes(event.category) &&
      event.photos &&
      event.photos.length > 0
    ) {
      acc[event.category] = acc[event.category] || [];
      acc[event.category].push(event);
    }
    return acc;
  }, {});

  const interleavedList = [];
  const categoryKeys = Object.keys(categorizedEvents);
  let hasMoreEvents = true;
  let index = 0;

  while (hasMoreEvents) {
    hasMoreEvents = false;
    for (const key of categoryKeys) {
      if (categorizedEvents[key][index]) {
        interleavedList.push(categorizedEvents[key][index]);
        hasMoreEvents = true;
      }
    }
    index++;
  }
  return interleavedList;
};

const filterByCategory = (events, category) => {
  if (!Array.isArray(events)) {
    return [];
  }
  if (category === "All") {
    return interleaveImages(events);
  }

  return events.filter((event) => event.category === category);
};

const Gallery = ({ events }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (!events || !Array.isArray(events)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const filteredEvents = filterByCategory(events, selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f39c12]/20 to-[#2c3e50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2c3e50] mb-4">
            Adventure Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Relive the amazing moments and get inspired for your next adventure
            with us
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "secondary" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="px-6"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Simple Grid with Image and Name below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {filteredEvents.map((event, index) => (
            <a href={`/events/${event._id}`} key={event._id || index}>
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 backdrop-blur-sm bg-gray-100">
                <div className="w-full aspect-[4/3] overflow-hidden">
                  {event.photos && event.photos.length > 0 ? (
                    <img
                      src={event.photos[0]}
                      alt={event.eventName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-xl text-[#2c3e50] group-hover:text-[#b85c38] transition-colors duration-300">
                    {event.eventName}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500"></div>
              </div>
            </a>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mt-4">
            Want to see your photos here? Join our next adventure!
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-[#f1c40f] to-[#e67e22] rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Create Your Own Memories</h2>
          <p className="text-lg mb-6 opacity-90">
            Join us on our next adventure and be part of these amazing
            experiences!
          </p>
          <Button variant="secondary" size="lg">
            Book Your Next Trip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
