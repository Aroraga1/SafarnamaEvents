import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Phone,
  CheckCircle,
  XCircle,
  Mail,
  Calendar,
} from "lucide-react";

const BookingList = ({ bookings, events }) => {
  return (
    <Card className="rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          Booking Details
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          View and manage customer bookings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {bookings.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No bookings yet.
            </p>
          ) : (
            bookings.map((booking) => {
              const event = events.find((e) => e.id === booking.eventId);
              let totalFee = 0;
              if (event) {
                totalFee = event.priceMale * booking.people;
              }

              return (
                <div
                  key={booking.id}
                  className="border border-gray-200 rounded-lg p-4 space-y-2 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {booking.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Event: {event?.name || "Unknown Event"}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="px-3 py-1 text-base rounded-full"
                    >
                      ₹{totalFee.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-700">
                    <p className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">People:</span>{" "}
                      {booking.people}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Age:</span> {booking.age}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Email:</span>{" "}
                      <a
                        href={`mailto:${booking.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {booking.email}
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">WhatsApp:</span>{" "}
                      <a
                        href={`https://wa.me/${booking.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {booking.whatsapp}
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      {booking.joinedWhatsappGroup ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="font-medium">WhatsApp Group:</span>{" "}
                      {booking.joinedWhatsappGroup ? "Joined" : "Not Joined"}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Booked On: {new Date(booking.createdAt).toLocaleString()}
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
