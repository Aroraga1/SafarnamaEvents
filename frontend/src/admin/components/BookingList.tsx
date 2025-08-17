import React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, CheckCircle, XCircle } from "lucide-react";

const BookingList = ({ bookings, events }) => {
  const { id } = useParams();

  const filteredBookings = id
    ? bookings.filter((booking) => String(booking.eventId) === String(id))
    : bookings;

  return (
    <Card className="rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Booking Details</CardTitle>
        <CardDescription className="text-muted-foreground">
          View and manage customer bookings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {filteredBookings.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No bookings yet.
            </p>
          ) : (
            filteredBookings.map((booking) => {
              const event = events.find(
                (e) => String(e._id) === String(booking.eventId)
              );
              let totalFee = 0;
              if (event) {
                totalFee = (event.priceMale + event.priceFemale) / 2 * booking.people;
              }

              return (
                <div
                  key={booking._id}
                  className="border border-gray-200 rounded-lg p-4 space-y-2 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{booking.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Event: {event?.eventName || "Unknown Event"}
                      </p>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1 text-base rounded-full">
                      ₹{totalFee.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-700">
                    <p className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Gender:</span>{" "}
                      {booking.gender}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">People:</span>{" "}
                      {booking.people}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">WhatsApp:</span>{" "}
                      <a href={`https://wa.me/${booking.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {booking.whatsapp}
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      {booking.payAfterEvent ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      <span className="font-medium">Payment:</span>{" "}
                      {booking.payAfterEvent ? "Pay After Event" : "Paid"}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Booked On:{" "}
                    {new Date(booking.createdAt).toLocaleString()}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingList;