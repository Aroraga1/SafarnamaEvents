import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Help from "./pages/Help";
import Admin from "./pages/Admin";
import BookingDetailPage from "./admin/components/BookingDetailPage";
import NotFound from "./pages/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EventDetailPage from "@/components/ui/EventDetailPage";
// Import useState and useEffect hooks for managing state and side effects
import { useState, useEffect } from "react";
// Import axios for making HTTP requests
import axios from "axios";
import moment from "moment";

const queryClient = new QueryClient();

// The main App component
const App = () => {
  // State to store the events data
  const [events, setEvents] = useState([]);
  // State to track the current page for chunking/pagination
  const [page, setPage] = useState(1);
  // State for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  // useEffect hook to fetch data whenever the 'page' state changes
  useEffect(() => {
    // Async function to fetch events from the API
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        // Make a GET request to the API with pagination parameters
        // The backend should be configured to handle 'page' and 'limit' query params
        const response = await axios.get(
          `${import.meta.env.REACT_BACKENDURL}/api/events?page=${page}&limit=10`
        );
        // Append the new events to the existing events array
        setEvents((prevEvents) => [...prevEvents, ...response.data]);
      } catch (err) {
        // Handle any errors that occur during the fetch
        setError("Failed to fetch events.");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page]); // The dependency array ensures this effect runs only when 'page' changes

  useEffect(() => {
    const fetchAndManageEvents = async () => {
      console.log("Fetching events from server and running management job...");
      try {
        const now = moment();
        const newPastEvents = [];
        const newUpcomingEvents = [];

        events.forEach((event) => {
          const hasDateTime = event.date && event.time;
          let eventIsPast = false;

          if (hasDateTime) {
            const eventDateTime = moment(
              `${event.date} ${event.time}`,
              "YYYY-MM-DD HH:mm"
            );
            eventIsPast = now.diff(eventDateTime, "hours") >= 5;
          } else {
            eventIsPast = true;
          }

          if (eventIsPast) {
            if (event.priceMale > 1000 || event.priceFemale > 1000) {
              newPastEvents.push(event);
            }
          } else {
            newUpcomingEvents.push(event);
          }
        });

        // Sort and limit past events
        const sortedPastEvents = [...newPastEvents, ...pastEvents].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setPastEvents(sortedPastEvents.slice(0, 2));

        // Set upcoming events
        setUpcomingEvents(newUpcomingEvents);
      } catch (error) {
        console.error("Failed to fetch events from server:", error);
      }
    };

    fetchAndManageEvents();
  }, [events]); // If props.events change, it should re-run

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Index events={{ events, upcomingEvents, pastEvents }} />
                  }
                />
                <Route path="/services" element={<Services />} />
                {/* Pass the events data to the Gallery component as a prop */}
                <Route path="/gallery" element={<Gallery events={events} />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<Help />} />
                <Route
                  path="/admin"
                  element={<Admin events={{ events, upcomingEvents }} />}
                />
                <Route
                  path="/events/:id"
                  element={<EventDetailPage events={events} />}
                />
                <Route
                  path="/bookingDetailed/:id"
                  element={<BookingDetailPage events={events} />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
              {/* Simple UI to demonstrate loading more chunks */}
              {loading && (
                <div className="text-center p-4">Loading more events...</div>
              )}
              {error && (
                <div className="text-center p-4 text-red-500">{error}</div>
              )}
              <div className="flex justify-center p-4">
                {/* <button
                  onClick={() => setPage((prevPage) => prevPage + 1)}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                >
                  Load More Events
                </button> */}
              </div>
            </main>
            <Footer />
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
