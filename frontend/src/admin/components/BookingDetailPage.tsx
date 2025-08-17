import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Users,
  Phone,
  CheckCircle,
  XCircle,
  Mail,
  Calendar,
  DollarSign,
  ArrowLeft,
  MapPin,
  Clock,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

// XLSX library ko CDN se load karein
// Ye script tag ensures karta hai ki XLSX global object available ho
// Jab component mount ho toh ye library load ho jayegi
const loadXLSXScript = () => {
  if (typeof window.XLSX === "undefined") {
    // Agar XLSX pehle se load nahi hai
    const script = document.createElement("script");
    script.src = "https://unpkg.com/xlsx/dist/xlsx.full.min.js";
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      console.log("XLSX library loaded.");
    };
    script.onerror = (e) => {
      console.error("Failed to load XLSX script:", e);
    };
  }
};

const BookingDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [eventDetails, setEventDetails] = useState<any>(null);

  useEffect(() => {
    loadXLSXScript(); // Component mount hone par XLSX library load karein

    const fetchAndCleanBookings = async () => {
      try {
        setLoading(true);
        // Backend se saari bookings fetch karein
        const response = await axios.get(
          "http://localhost:3000/admin/bookings"
        );
        let allBookings = response.data;

        // Specific event ID ke liye bookings filter karein
        let eventBookings = allBookings.filter((b: any) => b.event === id);
        setBookings(eventBookings);

        // Event details set karein
        if (eventBookings.length > 0 && eventBookings[0].event) {
          setEventDetails(eventBookings[0].event);
        } else {
          setEventDetails(null);
        }

        // --- Booking deletion logic start ---
        const currentTime = new Date();
        const bookingsToDeleteIds: string[] = [];
        const bookingsToKeep: any[] = [];

        // Har booking ko check karein deletion ke liye
        for (const booking of eventBookings) {
          if (booking.event && booking.event.date && booking.event.time) {
            const eventDateStr = booking.event.date; // e.g., "2025-08-15T00:00:00.000Z"
            const eventTimeStr = booking.event.time; // e.g., "15:00"

            const eventDate = new Date(eventDateStr);
            const [hours, minutes] = eventTimeStr.split(":").map(Number);

            // Event date aur time ko combined karein
            eventDate.setHours(hours, minutes, 0, 0);

            // Deletion ki date calculate karein (event ke 1 din baad, same time)
            const deletionDate = new Date(eventDate);
            deletionDate.setDate(deletionDate.getDate() + 1);

            // Agar current time deletion date se aage hai, toh delete karein
            if (currentTime > deletionDate) {
              bookingsToDeleteIds.push(booking._id);
            } else {
              bookingsToKeep.push(booking);
            }
          } else {
            // Agar event details missing hain, toh booking ko keep karein
            bookingsToKeep.push(booking);
          }
        }

        if (bookingsToDeleteIds.length > 0) {
          console.log("Bookings marked for deletion:", bookingsToDeleteIds);
          for (const bookingIdToDelete of bookingsToDeleteIds) {
            try {
              // Backend se booking delete karein
              await axios.delete(
                `http://localhost:3000/admin/bookings/${bookingIdToDelete}`
              );
              console.log(`Booking ${bookingIdToDelete} deleted successfully.`);
            } catch (deleteError) {
              console.error(
                `Error deleting booking ${bookingIdToDelete}:`,
                deleteError
              );
              // Agar deletion fail ho, toh booking ko UI mein rehne dein
              const originalBooking = eventBookings.find(
                (b: any) => b._id === bookingIdToDelete
              );
              if (originalBooking) {
                bookingsToKeep.push(originalBooking);
              }
            }
          }
          // Successfully deleted bookings ko state se remove karein
          setBookings(bookingsToKeep);
        }
        // --- Booking deletion logic end ---
      } catch (error) {
        console.error("Error fetching or deleting bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAndCleanBookings();
    }
  }, [id]);

  // Excel (XLSX) download functionality
  const handleDownloadExcel = () => {
    if (bookings.length === 0) {
      console.log("No bookings to download.");
      return;
    }

    if (typeof window.XLSX === "undefined") {
      console.error(
        "XLSX library not loaded. Please try again or refresh the page."
      );
      // Optional: User ko feedback dene ke liye message display karein
      return;
    }

    // Prepare data for XLSX
    const data = bookings.map((booking) => {
      const event = booking.event || {};
      return {
        Name: booking.name || "",
        People: booking.people || "",
        Age: booking.age || "",
        Email: booking.email || "",
        WhatsApp: booking.whatsapp || "",
        "Joined WhatsApp Group": booking.joinedWhatsappGroup ? "Yes" : "No",
        "Total Fee": booking.totalFee || 0,
        "Event Name": event.eventName || "N/A",
        "Event Date": event.date
          ? new Date(event.date).toLocaleDateString()
          : "N/A",
        "Event Time": event.time || "N/A",
        "Event Location": event.reachingPointLocationName || "N/A",
      };
    });

    // Create a worksheet
    const ws = window.XLSX.utils.json_to_sheet(data);

    // Create a workbook and add the worksheet
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, "Bookings");

    // Write the workbook to an XLSX file
    window.XLSX.writeFile(wb, `bookings_for_event_${id}.xlsx`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <Button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleDownloadExcel}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2"
          disabled={loading || bookings.length === 0}
        >
          <Download className="h-4 w-4" />
          Download Bookings (XLSX)
        </Button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 mt-10">Loading...</div>
      ) : (
        <>
          {eventDetails && (
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {eventDetails.eventName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(eventDetails.date).toLocaleDateString()}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Time:</span> {eventDetails.time}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Location:</span>{" "}
                  {eventDetails.reachingPointLocationName}
                </p>
              </div>
            </div>
          )}

          {bookings.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No booking data found for this event.
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {booking.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Event: {booking.event?.eventName || "N/A"}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 text-base rounded-full flex items-center"
                  >
                    <DollarSign className="h-4 w-4 mr-1" />₹
                    {booking.totalFee?.toLocaleString?.()}
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
                    <span className="font-medium">Email:</span>
                    <a
                      href={`mailto:${booking.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {booking.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">WhatsApp:</span>
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
                    <span className="font-medium">WhatsApp Group:</span>
                    {booking.joinedWhatsappGroup ? "Joined" : "Not Joined"}
                  </p>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default BookingDetailsPage;
