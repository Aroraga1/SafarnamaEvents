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
import BookingModal from "@/components/ui/booking-modal";
import { upcomingEvents, pastEvents, reviews } from "@/data/mockData";
import heroImage from "@/assets/hero-mountain.jpg";
// import NextEventCard from "@/style/components/NextEventCard.css";

const Index = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const nextEvent = upcomingEvents[currentEventIndex];

  const nextEventSlide = () => {
    setCurrentEventIndex((prev) => (prev + 1) % upcomingEvents.length);
  };

  const prevEventSlide = () => {
    setCurrentEventIndex(
      (prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Your Next
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Adventure Awaits
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
            Join Safarnama for unforgettable treks, beach parties, desert
            safaris, and so much more!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button variant="adventure" size="xl">
              Book the Next Trek!
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-primary"
            >
              Explore Adventures
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
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

      {/* Upcoming Event Highlight */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Next Big Adventure
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't miss out on our upcoming highlight event!
            </p>
          </div>

          {nextEvent && (
            <div className="relative">
              <Card className="max-w-4xl mx-auto bg-gradient-card border-0 shadow-adventure hover:shadow-xl transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative">
                    <img
                      src={nextEvent.image}
                      alt={nextEvent.name}
                      className="w-full h-80 lg:h-full object-cover rounded-l-lg"
                    />
                    <Badge
                      id="limited-slots"
                      variant="secondary"
                      className="absolute top-4 left-4 bg-white/90 text-primary font-medium border-[aquamarine] text-[  ]"
                    >
                      Limited Slots!🔴
                    </Badge>
                  </div>

                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-primary mb-4">
                      {nextEvent.name}
                    </h3>
                    <div className="space-y-3 mb-6">
                      <p className="flex items-center text-muted-foreground">
                        <span className="text-lg mr-1">📍</span>
                        {nextEvent.location}
                      </p>
                      <p className="flex items-center text-muted-foreground">
                        <span className="text-lg mr-1">📅</span>
                        {new Date(nextEvent.date).toLocaleDateString()}
                      </p>
                      <p className="flex items-center text-muted-foreground">
                        <span className="text-lg mr-1">💰</span>₹
                        {nextEvent.maleFee} (M) / ₹{nextEvent.femaleFee} (F)
                      </p>
                      {(nextEvent.distance || nextEvent.trekType) && (
                        <p className="flex items-center text-muted-foreground">
                          <span className="text-lg mr-1">🥾</span>
                          {nextEvent.distance}
                          <span className="text-lg mr-1 ml-5">📈</span>
                          {nextEvent.trekType}
                        </p>
                      )}
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Included😍:</h4>
                      <div className="flex flex-wrap gap-2">
                        {nextEvent.facilities.map((facility, index) => (
                          <Badge key={index} variant="outline">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <BookingModal event={nextEvent}>
                      <Button variant="adventure" size="lg" className="w-full">
                        Book Now - Limited Spots!
                      </Button>
                    </BookingModal>
                  </div>
                </div>
              </Card>

              {/* Navigation */}
              {/* {upcomingEvents.length > 1 && (
                <div className="flex justify-center mt-6 gap-4">
                  <Button variant="outline" onClick={prevEventSlide}>
                    ← Previous
                  </Button>
                  <Button variant="outline" onClick={nextEventSlide}>
                    Next →
                  </Button>
                </div>
              )} */}
            </div>
          )}
        </div>
      </section>

      {/* Past Crazy Events */}
      <section className="py-16 bg-gradient-to-br from-sunset-orange/10 to-forest-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Past Crazy Events
            </h2>
            <p className="text-xl text-muted-foreground">
              Relive the memories from our amazing adventures!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event) => (
              <Card
                key={event.id}
                className="group bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge
                        variant="secondary"
                        className="bg-white/20 text-white"
                      >
                        {event.trekType}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{event.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <span className="mr-2">📍</span>
                    {event.location} •{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {event.description}
                  </p>
                  <Button variant="outline" className="w-full">
                    View Photos
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gradient-to-br from-mountain-blue/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              What Adventurers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real experiences from our amazing community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img
                      src={review.image || "/placeholder.svg"}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <div className="flex text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i}>⭐</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">
                    "{review.comment}"
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {review.eventName}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of adventurers who have already discovered incredible
            experiences with Safarnama. Your next unforgettable journey is just
            one click away!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="xl">
              View All Adventures
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-primary"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
