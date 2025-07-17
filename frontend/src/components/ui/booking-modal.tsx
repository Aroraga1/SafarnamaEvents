import { useState } from "react";
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
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    whatsapp: "",
    people: "1",
    payAfterEvent: false,
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.gender || !formData.whatsapp) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const booking: Booking = {
      id: Date.now().toString(),
      eventId: event.id,
      name: formData.name,
      gender: formData.gender as "Male" | "Female",
      whatsapp: formData.whatsapp,
      people: parseInt(formData.people),
      payAfterEvent: formData.payAfterEvent,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const existingBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );
    existingBookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    toast({
      title: "Booking Successful!",
      description: `Your booking for ${event.name} has been confirmed. We'll contact you soon!`,
    });

    setIsOpen(false);
    setFormData({
      name: "",
      gender: "",
      whatsapp: "",
      people: "1",
      payAfterEvent: false,
    });
  };

  const fee = formData.gender === "Female" ? event.femaleFee : event.maleFee;
  const totalFee = fee * parseInt(formData.people);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            Book {event.name}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) =>
                setFormData({ ...formData, gender: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="people">Number of People</Label>
            <Select
              value={formData.people}
              onValueChange={(value) =>
                setFormData({ ...formData, people: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="payAfter"
              checked={formData.payAfterEvent}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, payAfterEvent: checked as boolean })
              }
            />
            <Label htmlFor="payAfter" className="text-sm">
              Are you willing to pay mention after event?
            </Label>
          </div>

          {formData.gender && (
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium">
                Total Fee: ₹{totalFee.toLocaleString()}
                {formData.payAfterEvent && (
                  <span className="text-xs text-muted-foreground">
                    {" "}
                    + ₹100 after event
                  </span>
                )}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Fee per person: ₹{fee.toLocaleString()}
              </p>
            </div>
          )}

          <div className="flex space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="adventure" className="flex-1">
              Confirm Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
