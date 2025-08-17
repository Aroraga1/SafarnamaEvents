import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom"; // ✅ Correct Link import for navigation

const PastEventsSection = ({ pastEvents }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#f39c12]/10 to-[#2c3e50]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2c3e50] mb-4">
            Past Crazy Events
          </h2>
          <p className="text-xl text-muted-foreground">
            Relive the memories from our amazing adventures!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pastEvents.length > 0 ? (
            pastEvents.map((event) => (
              <Card
                key={event.id}
                className="group bg-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={
                      event.photos[0] ||
                      "https://placehold.co/1280x720/8B4513/FFF8DC?text=No+Image"
                    }
                    alt={event.eventName}
                    className="w-full max-h-[35vh] object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge
                        variant="secondary"
                        className="bg-[#b85c38]/80 text-white"
                      >
                        {event.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-[#2c3e50]">
                    {event.eventName}
                  </CardTitle>
                  <CardDescription className="flex items-center">
                    <span className="mr-2">📍</span>
                    {event.reachingPointLocationName} •{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {event.facilities}
                  </p>
                  <div className="flex justify-center">
                    <Link
                      to={`/events/${event._id}`}
                      className="px-6 py-3 text-lg font-semibold text-white bg-[#b85c38] rounded-full shadow-md hover:bg-[#a14c2f] transition-all duration-300"
                    >
                      View Photos
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-2 text-center text-muted-foreground">
              No past events to show.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PastEventsSection;
