import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, DollarSign, Activity, Users, CheckCircle } from "lucide-react";

// Mock event object
const EventDetailPage = ({ events }) => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (events) {
      const foundEvent = events.find((e) => e._id === id);
      setEvent(foundEvent);
    }
  }, [id, events]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Event not found.</p>
      </div>
    );
  }

  // Helper function to split facilities string into an array
  const facilitiesArray = event.facilities ? event.facilities.split(',').map(f => f.trim()) : [];
  
  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <header className="text-center mb-12">
          <Badge variant="secondary" className="mb-2 text-sm bg-purple-500 text-white hover:bg-purple-600">
            {event.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {event.eventName}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {event.eventDescription}
          </p>
        </header>

        {/* Gallery Section */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 mb-12">
          {event.photos.map((photoUrl, index) => (
            <div key={index} className="mb-6 break-inside-avoid">
              <img
                src={photoUrl}
                alt={`${event.eventName} photo ${index + 1}`}
                className="w-full rounded-2xl shadow-xl transition-transform duration-300 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Details & Action Section */}
        <div className="grid grid-cols-1 gap-0">
          <div className="md:col-span-3 bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6 flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" /> Event Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex items-center gap-4">
                <Calendar className="h-6 w-6 text-orange-500" />
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Date</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{formatDate(event.date)}</p>
                </div>
              </div>
              {/* <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-red-500" />
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Meeting Point</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{event.meetingPointLocationName}</p>
                </div>
              </div> */}
              <div className="flex items-center gap-4">
                <DollarSign className="h-6 w-6 text-green-500" />
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Price</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    ₹{event.priceMale} (M) / ₹{event.priceFemale} (F)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Activity className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Difficulty</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{event.type}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" /> What's Included
              </h3>
              <div className="flex flex-wrap gap-2">
                {facilitiesArray.map((facility, idx) => (
                  <Badge key={idx} variant="outline" className="text-base py-1 px-3 border-green-500 text-green-700 dark:text-green-300">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {facility}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;