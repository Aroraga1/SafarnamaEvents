import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, DollarSign, List, Link } from "lucide-react";

const EventList = ({ events }) => {
  return (
    <Card className="rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Current Events</CardTitle>
        <CardDescription className="text-muted-foreground">Manage existing events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2"> {/* Added max-height and overflow for scroll */}
          {events.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No events added yet.</p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-lg p-4 space-y-2 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg text-gray-800">{event.eventName}</h3>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="px-3 py-1 text-sm rounded-full">{event.type}</Badge>
                    <Badge variant="outline" className="px-3 py-1 text-sm rounded-full border-primary text-primary">{event.category}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" /> {event.meetingPointName} to {event.reachingPointLocationName}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" /> {event.date} at <Clock className="h-4 w-4 text-gray-500" /> {event.time}
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" /> Male: ₹{event.priceMale?.toLocaleString()} / Female: ₹{event.priceFemale?.toLocaleString()}
                </p>
                {event.facilities && (
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <List className="h-4 w-4 text-gray-500" /> Facilities: {event.facilities}
                  </p>
                )}
                {event.whatsappGroupJoiningLink && (
                  <p className="text-sm text-blue-600 flex items-center gap-2">
                    <Link className="h-4 w-4" /> <a href={event.whatsappGroupJoiningLink} target="_blank" rel="noopener noreferrer" className="hover:underline">Join WhatsApp Group</a>
                  </p>
                )}
                {event.photos && event.photos.length > 0 && (
                  <img
                    src={event.photos[0]}
                    alt={event.eventName}
                    className="w-full h-40 object-cover rounded-md mt-3 border border-gray-100"
                  />
                )}
                <div className="flex justify-end gap-2 mt-3">
                  {/* Placeholder for Edit/Delete buttons */}
                  {/* <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button> */}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventList;