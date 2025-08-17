import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Admin Panel Components
import AuthCard from "../admin/components/AuthCard";
import ActiveEventsList from "../admin/components/ActiveEventsList";
import EventForm from "../admin/components/EventForm"; // For "Add new Event"
import BookingSummary from "../admin/components/BookingSummary";
import BookingDetailPage from "../admin/components/BookingDetailPage";

// API functions (though mock data is used for now)
import { addEvent as addEventApi } from "../admin/api/events";

const Admin = ({ events }) => {
  const { events: allEvents, upcomingEvents } = events;
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [event, setEvent] = useState(events);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const { toast } = useToast();

  // const handleLogin = () => {
  //   if (password === "safarnama123") {
  //     setIsAuthenticated(true);
  //     toast({
  //       title: "Login Successful",
  //       description: "Welcome to Safarnama Admin Panel",
  //     });
  //   } else {
  //     toast({
  //       title: "Access Denied",
  //       description: "Incorrect password",
  //       variant: "destructive",
  //     });
  //   }
  // };

  // This function is now simplified, as EventForm directly calls the API
  const handleEventAdded = (newEventData) => {
    setEvents((prevEvents) => [...prevEvents, newEventData]);
    setActiveTab("dashboard");
  };

  const handleEditEvent = (eventId, updatedData) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, ...updatedData } : event
      )
    );
    toast({
      title: "Event Updated",
      description: `Event ID ${eventId} has been updated.`,
      variant: "success",
    });
  };

  // if (showBookingDetails) {
  //   return (
  //     <BookingDetailPage
  //       event={{ events, upcomingEvents }}
  //       onBack={() => setShowBookingDetails(false)}
  //     />
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2c3e50]/10 to-[#f39c12]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#2c3e50]">Admin Dashboard</h1>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            Logout
          </Button>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-3 bg-gray-200">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-[#b85c38] data-[state=active]:text-white transition-colors"
            >
              Dashboard Overview
            </TabsTrigger>
            <TabsTrigger
              value="addEvent"
              className="data-[state=active]:bg-[#b85c38] data-[state=active]:text-white transition-colors"
            >
              Add New Event
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="data-[state=active]:bg-[#b85c38] data-[state=active]:text-white transition-colors"
            >
              Booking Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <ActiveEventsList
              events={upcomingEvents}
              onEditEvent={handleEditEvent}
            />
          </TabsContent>

          <TabsContent value="addEvent">
            <EventForm events={allEvents} onEventAdded={handleEventAdded} />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingSummary events={upcomingEvents} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
