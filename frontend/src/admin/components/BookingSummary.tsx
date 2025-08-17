import React, { useState, useEffect } from "react"; // useState aur useEffect import kiya
import { Link } from "react-router-dom"; // Link component import kiya
import axios from "axios";
import moment from "moment";
import BookingDetailPage from "./BookingDetailPage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Props ki zaroorat nahi hai, component khud data fetch karega
const BookingSummary = ({ events }) => {
  // const [bookings, setBookings] = useState([]);

  // useEffect(() => {
  //   const fetchBookings = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3000/admin/bookings"
  //       );
  //       setBookings(response.data);
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //     }
  //   };
  //   fetchBookings();
  // }, []);

  return (
    <Card className="rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          Current Booking Details
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          View all customer bookings and their details.
        </CardDescription>
      </CardHeader>
      <CardContent className="py-8">
        <div className="text-center">
          {/* <div className="text-5xl font-bold text-green-600 mb-4">
            {bookings.length}
          </div> */}
          <p className="text-lg text-gray-600 mb-6">Total Bookings Received</p>
        </div>

        {/* Ab bookings ko totalBookings state se iterate kar rahe hain */}
        <div className="mt-8 border-t pt-4">
          <h3 className="text-xl font-semibold mb-3">All Bookings</h3>
          <ul className="space-y-2">
            {events.map((booking) => (
              <li key={booking._id}>
                {" "}
                {/* Sahi key: booking._id */}
                <Link
                  to={`/bookingDetailed/${booking._id}`} // booking.event se id le rahe hain
                  state={booking._id}
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  <span className="font-medium text-gray-800">
                    Track: {booking.eventName}
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
