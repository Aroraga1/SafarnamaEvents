import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardStats = ({ events, bookings }) => {
  // Calculate Total Active Events
  const getActiveEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only
    return events.filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    }).length;
  };

  // Calculate Total Revenue (simplified, assuming average price per person)
  const getTotalRevenue = () => {
    return bookings.reduce((total, booking) => {
      const event = events.find((e) => e.id === booking.eventId);
      if (!event) return total;
      // This is an estimation. In a real app, booking would specify male/female count.
      const estimatedPricePerPerson = (event.priceMale + event.priceFemale) / 2;
      return total + estimatedPricePerPerson * booking.people;
    }, 0);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-card border-0 rounded-lg shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Active Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-600">
            {getActiveEvents()}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-card border-0 rounded-lg shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">
            {events.length}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-card border-0 rounded-lg shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">
            {bookings.length}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-card border-0 rounded-lg shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-orange-600">
            ₹{getTotalRevenue().toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;