import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin } from "lucide-react";
import axios from "axios";
const API_BASE_URL = "https://safarnama-events.vercel.app/admin";

const ActiveEventsList = ({ events, onEditEvent }) => {
  const [editingEvent, setEditingEvent] = useState(null);
  const { toast } = useToast();

  const getActiveEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    });
  };

  const activeEvents = getActiveEvents();

  const handleSaveEdit = async () => {
    if (!editingEvent) return;

    try {
      const eventId = editingEvent._id || editingEvent.id;

      const {
        _id,
        __v,
        id,
        ...payload // all other editable fields
      } = editingEvent;

      const response = await axios.put(
        `${API_BASE_URL}/updateEvent/${eventId}`,
        payload
      );
      if (response.status !== 200) {
        throw new Error("Failed to update event");
      }

      const updatedEventData = response.data?.event || response.data;

      onEditEvent(updatedEventData);
      setEditingEvent(null);

      toast({
        title: "Event Updated",
        description: `"${updatedEventData.eventName}" has been updated successfully.`,
        variant: "success",
      });
    } catch (error) {
      console.error("Error updating event:", error);

      // toast({
      //   title: "Update Failed",
      //   description:
      //     error?.response?.data?.message ||
      //     error?.message ||
      //     "There was an error updating the event.",
      //   variant: "destructive",
      // });
    }
  };

  return (
    <Card className="rounded-lg shadow-md bg-gray-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#2c3e50]">
          Total Active Events
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Currently {activeEvents.length} events are active. Click on an event
          name to edit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {activeEvents.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No active events found.
          </p>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {activeEvents.map((event) => (
              <Dialog
                key={event.id}
                onOpenChange={(isOpen) => !isOpen && setEditingEvent(null)}
              >
                <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-lg font-semibold text-[#b85c38] hover:text-[#f39c12]"
                        onClick={() => setEditingEvent(event)}
                      >
                        {event.eventName}
                      </Button>
                    </DialogTrigger>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{event.type}</Badge>
                      <Badge variant="outline">{event.category}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" /> Date:{" "}
                    {event.date} | <Clock className="h-4 w-4 text-gray-500" />{" "}
                    Time: {event.time}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" /> Meeting:{" "}
                    {event.meetingPointName} | Reaching:{" "}
                    {event.reachingPointLocationName}
                  </p>
                  <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-[#2c3e50]">
                        Edit Event: {event.eventName}
                      </DialogTitle>
                      <DialogDescription>
                        Make changes to the event here. Click save when you're
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    {editingEvent && (
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-event-name"
                            className="text-right text-[#2c3e50]"
                          >
                            Event Name
                          </Label>
                          <Input
                            id="edit-event-name"
                            value={editingEvent.eventName}
                            onChange={(e) =>
                              setEditingEvent({
                                ...editingEvent,
                                eventName: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-date"
                            className="text-right text-[#2c3e50]"
                          >
                            Date
                          </Label>
                          <Input
                            id="edit-date"
                            type="date"
                            value={editingEvent.date}
                            onChange={(e) =>
                              setEditingEvent({
                                ...editingEvent,
                                date: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-time"
                            className="text-right text-[#2c3e50]"
                          >
                            Time
                          </Label>
                          <Input
                            id="edit-time"
                            type="time"
                            value={editingEvent.time}
                            onChange={(e) =>
                              setEditingEvent({
                                ...editingEvent,
                                time: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-mp-name"
                            className="text-right text-[#2c3e50]"
                          >
                            Meeting Point
                          </Label>
                          <Input
                            id="edit-mp-name"
                            value={editingEvent.meetingPointName}
                            onChange={(e) =>
                              setEditingEvent({
                                ...editingEvent,
                                meetingPointName: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-mp-link"
                            className="text-right text-[#2c3e50]"
                          >
                            MP Map Link
                          </Label>
                          <Input
                            id="edit-mp-link"
                            type="url"
                            value={editingEvent.meetingPointMapLink}
                            onChange={(e) =>
                              setEditingEvent({
                                ...editingEvent,
                                meetingPointMapLink: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-rp-name"
                            className="text-right text-[#2c3e50]"
                          >
                            Reaching Point
                          </Label>
                          <Input
                            id="edit-rp-name"
                            value={editingEvent.reachingPointLocationName}
                            onChange={(e) =>
                              setEditingEvent({
                                ...editingEvent,
                                reachingPointLocationName: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-rp-link"
                            className="text-right text-[#2c3e50]"
                          >
                            RP Map Link
                          </Label>
                          <Input
                            id="edit-rp-link"
                            type="url"
                            value={editingEvent.reachPointMapLink}
                            onChange={(e) =>
                              setEditingEvent({
                                ...editingEvent,
                                reachPointMapLink: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-price-male"
                            className="text-right text-[#2c3e50]"
                          >
                            Price Male
                          </Label>
                          <Input
                            id="edit-price-male"
                            type="number"
                            value={editingEvent.priceMale}
                            onChange={(e) =>
                              setEditingEvent({
                                ...editingEvent,
                                priceMale: parseFloat(e.target.value) || 0,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-price-female"
                            className="text-right text-[#2c3e50]"
                          >
                            Price Female
                          </Label>
                          <Input
                            id="edit-price-female"
                            type="number"
                            value={editingEvent.priceFemale}
                            onChange={(e) =>
                              setEditingEvent({
                                ...editingEvent,
                                priceFemale: parseFloat(e.target.value) || 0,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-facilities"
                            className="text-right text-[#2c3e50]"
                          >
                            Facilities
                          </Label>
                          <Input
                            id="edit-facilities"
                            value={editingEvent.facilities}
                            onChange={(e) =>
                              setEditingEvent({
                                ...editingEvent,
                                facilities: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-whatsapp"
                            className="text-right text-[#2c3e50]"
                          >
                            WhatsApp Link
                          </Label>
                          <Input
                            id="edit-whatsapp"
                            type="url"
                            value={editingEvent.whatsappGroupJoiningLink}
                            onChange={(e) =>
                              setEditingEvent({
                                ...editingEvent,
                                whatsappGroupJoiningLink: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-type"
                            className="text-right text-[#2c3e50]"
                          >
                            Type
                          </Label>
                          <Select
                            value={editingEvent.type}
                            onValueChange={(value) =>
                              setEditingEvent({ ...editingEvent, type: value })
                            }
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="easy-to-moderate">
                                Easy to Moderate
                              </SelectItem>
                              <SelectItem value="moderate-to-high">
                                Moderate to High
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-distance"
                            className="text-right text-[#2c3e50]"
                          >
                            Distance
                          </Label>
                          <Input
                            id="edit-distance"
                            value={editingEvent.distance}
                            onChange={(e) =>
                              setEditingEvent({
                                ...editingEvent,
                                distance: e.target.value,
                              })
                            }
                            placeholder="e.g., 10 km"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-duration"
                            className="text-right text-[#2c3e50]"
                          >
                            Duration
                          </Label>
                          <Input
                            id="edit-duration"
                            value={editingEvent.duration}
                            onChange={(e) =>
                              setEditingEvent({
                                ...editingEvent,
                                duration: e.target.value,
                              })
                            }
                            placeholder="e.g., 5 hours"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="edit-category"
                            className="text-right text-[#2c3e50]"
                          >
                            Category
                          </Label>
                          <Select
                            value={editingEvent.category}
                            onValueChange={(value) =>
                              setEditingEvent({
                                ...editingEvent,
                                category: value,
                              })
                            }
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Trekking">Trekking</SelectItem>
                              <SelectItem value="Camping">Camping</SelectItem>
                              <SelectItem value="Cyclothon">
                                Cyclothon
                              </SelectItem>
                              <SelectItem value="Tour">Tour</SelectItem>
                              <SelectItem value="Cultural">Cultural</SelectItem>
                              <SelectItem value="Bike Ride">
                                Bike Ride
                              </SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={handleSaveEdit}
                        className="bg-[#b85c38] hover:bg-[#a15031] text-white"
                      >
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </div>
              </Dialog>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveEventsList;
