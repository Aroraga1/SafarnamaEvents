import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BookingModal from "@/components/ui/booking-modal";

const NextEventHighlight = ({ upcomingEvents }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#2c3e50]/5 to-[#f39c12]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2c3e50] mb-4">
            Next Big Adventures
          </h2>
          <p className="text-xl text-foreground">
            Don't miss out on our upcoming highlight events!
          </p>
        </div>

        {upcomingEvents?.map((event, index) => (
          <div key={index} className="relative mb-12">
            <Card className="max-w-4xl mx-auto bg-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative">
                  <img
                    src={
                      event.photos?.[0] ||
                      "https://placehold.co/1280x720/E0E0E0/333333?text=No+Image"
                    }
                    alt={event.eventName}
                    className="w-full h-auto max-h-[50vh] object-cover rounded-l-lg "
                  />
                  <Badge
                    variant="secondary"
                    className="absolute top-4 left-4 bg-white/90 text-[#b85c38] font-medium border-2 border-[#ffffff]"
                  >
                    Limited Slots! 🔴
                  </Badge>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-[#2c3e50] mb-4">
                    {event.eventName}
                  </h3>
                  <div className="space-y-3 mb-6">
                    <p className="flex items-center text-foreground">
                      <span className="text-lg mr-1">📍</span>
                      {event.reachingPointLocationName}
                    </p>
                    <p className="flex items-center text-foreground">
                      <span className="text-lg mr-1">📅</span>
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="flex items-center text-foreground">
                      <span className="text-lg mr-1">💰</span>
                      {event.priceMale === event.priceFemale ? (
                        <span>₹{event.priceMale}</span>
                      ) : (
                        <span>
                          ₹{event.priceMale} (M) / ₹{event.priceFemale} (F)
                        </span>
                      )}
                    </p>
                    <p className="flex items-center text-foreground">
                      <span className="text-lg mr-1">📈</span>
                      {event.type}
                      <span className="text-lg mr-1 ml-5">🥾</span>
                      {event.category}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-foreground">
                      Included 😍:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {event.facilities &&
                        event.facilities.split(",").map((facility, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-base border-gray-300 text-gray-700"
                          >
                            {facility.trim()}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <BookingModal event={event}>
                    <Button variant="adventure" size="lg" className="w-full">
                      Book Now - Limited Spots!
                    </Button>
                  </BookingModal>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NextEventHighlight;
