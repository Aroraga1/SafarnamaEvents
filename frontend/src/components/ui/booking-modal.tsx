import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Checkbox } from "./checkbox";
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useToast } from "@/hooks/use-toast";
import { Event, Booking } from "@/types";

interface BookingModalProps {
  event: Event;
  children: React.ReactNode;
}

const BookingModal = ({ event, children }: BookingModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false); // New state for post-booking view

  const [formData, setFormData] = useState<{
    name: string;
    whatsapp: string;
    email: string;
    age: string;
    people: string;
    joinedWhatsappGroup: boolean;
  }>({
    name: "",
    whatsapp: "",
    email: "",
    age: "",
    people: "1",
    joinedWhatsappGroup: false,
  });

  const { toast } = useToast();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset state when modal is closed
      setFormData({
        name: "",
        whatsapp: "",
        email: "",
        age: "",
        people: "1",
        joinedWhatsappGroup: false,
      });
      setIsBooked(false);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.whatsapp.trim()) {
      toast({
        title: "Error",
        description: "Please enter your WhatsApp number.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.age || Number(formData.age) < 1) {
      toast({
        title: "Error",
        description: "Please enter a valid age.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const booking = {
      event: event._id || event.id,
      name: formData.name.trim(),
      email: formData.email.trim(),
      age: Number(formData.age),
      whatsapp: formData.whatsapp.trim(),
      people: Number(formData.people),
      joinedWhatsappGroup: formData.joinedWhatsappGroup,
      totalFee: event.priceMale * Number(formData.people),
    };

    try {
      await axios.post(`/api/bookings/${event._id || event.id}`, booking);

      // On successful booking, show confirmation view
      setIsBooked(true);
      toast({
        title: "Booking Successful!",
        description: `Your booking for ${event.eventName} has been confirmed.`,
      });
    } catch (error: any) {
      console.error("Booking submission failed:", error);

      let errorMessage =
        "There was an error confirming your booking. Please try again.";

      if (error.response) {
        console.error("Error response:", error.response.data);
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        console.error("Network error:", error.request);
        errorMessage =
          "Network error. Please check your connection and try again.";
      }

      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalFee = event.priceMale * Number(formData.people);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#2c3e50]">
            {isBooked ? "Booking Confirmed!" : `Book ${event.eventName}`}
          </DialogTitle>
        </DialogHeader>
        {isBooked ? (
          // Post-booking confirmation view
          <div className="space-y-6 text-center">
            <p className="text-lg font-medium text-green-600">
              Your spot is confirmed! Please join the group and find the meeting
              point.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={event.whatsappGroupJoiningLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white">
                  Join WhatsApp Group
                </Button>
              </a>
              <a
                href={event.meetingPointMapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-[#b85c38] hover:bg-[#a15031] text-white">
                  View Meeting Point
                </Button>
              </a>
            </div>
            <Button onClick={() => setIsOpen(false)} variant="outline">
              Close
            </Button>
          </div>
        ) : (
          // Pre-booking form view
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="120"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                placeholder="Enter your age"
                required
              />
            </div>

            {/* WhatsApp */}
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number *</Label>
              <Input
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData({ ...formData, whatsapp: e.target.value })
                }
                placeholder="+91 98765 43210"
                required
              />
            </div>

            {/* People Select */}
            <div className="space-y-2">
              <Label htmlFor="people">Number of People</Label>
              <Select
                value={formData.people}
                onValueChange={(value) =>
                  setFormData({ ...formData, people: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select people" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Total Fee */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm font-medium">
                Total Fee: ₹{totalFee.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Fee per person: ₹{event.priceMale.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-2 font-bold">
                Notice: The amount of the trek would be taken on the meet point.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1 text-[#2c3e50] hover:text-[#b85c38]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="adventure"
                className="flex-1"
                disabled={loading}
              >
                {loading ? "Confirming..." : "Confirm Booking"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
