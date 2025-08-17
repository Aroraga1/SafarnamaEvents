import React, { useState, useCallback, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import imageCompression from "browser-image-compression";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";

const EventForm = ({ handleAddEvent }) => {
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    date: "",
    time: "",
    meetingPointName: "",
    meetingPointMapLink: "",
    reachingPointLocationName: "",
    reachPointMapLink: "",
    priceMale: "",
    priceFemale: "",
    facilities: "",
    whatsappGroupJoiningLink: "",
    type: "easy", // Default event type
    category: "Trekking", // Default category
  });

  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState({ type: "", text: "" });

  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFiles = async (newFilesList) => {
    if (newFilesList) {
      setUploadLoading(true);
      setUploadMessage({
        type: "info",
        text: "Processing images for upload...",
      });

      const newFilesArray = Array.from(newFilesList);
      const processedFiles = [];
      const compressionOptions = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: "image/jpeg",
      };

      for (const file of newFilesArray) {
        if (file.type.startsWith("image/")) {
          try {
            const compressedFile = await imageCompression(
              file,
              compressionOptions
            );
            Object.defineProperty(compressedFile, "name", {
              writable: true,
              value: file.name,
            });
            processedFiles.push(compressedFile);
          } catch (error) {
            console.error("Image compression failed for:", file.name, error);
            setUploadMessage({
              type: "error",
              text: `Failed to process image: ${file.name}. Please try a smaller file.`,
            });
            setUploadLoading(false);
            return;
          }
        } else {
          toast({
            title: "File Type Not Supported",
            description: `File "${file.name}" is not an image and will be skipped.`,
            variant: "warning",
          });
        }
      }

      setFiles((prevFiles) => [...prevFiles, ...processedFiles]);
      setUploadMessage({
        type: "success",
        text: `${processedFiles.length} images ready for upload.`,
      });
      setUploadLoading(false);
    }
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]); // Add handleFiles to dependency array

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setUploadMessage({ type: "", text: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      eventName, date, time, meetingPointName, meetingPointMapLink,
      reachingPointLocationName, reachPointMapLink, priceMale, priceFemale,
      type, category,
    } = newEvent;

    if (
      !eventName || !date || !time || !meetingPointName || !meetingPointMapLink ||
      !reachingPointLocationName || !reachPointMapLink || priceMale === "" ||
      priceFemale === "" || !type || !category || !files.length
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required event details and upload at least one image.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("meetingPointName", meetingPointName);
    formData.append("meetingPointMapLink", meetingPointMapLink);
    formData.append("reachingPointLocationName", reachingPointLocationName);
    formData.append("reachPointMapLink", reachPointMapLink);
    formData.append("priceMale", priceMale);
    formData.append("priceFemale", priceFemale);
    formData.append("facilities", newEvent.facilities);
    formData.append("whatsappGroupJoiningLink", newEvent.whatsappGroupJoiningLink);
    formData.append("type", type);
    formData.append("category", category);

    files.forEach((file) => {
      formData.append("images", file);
    });

    // Call the parent's handleAddEvent function
    handleAddEvent(formData, setUploadLoading, setUploadMessage, setNewEvent, setFiles);
  };

  return (
    <Card className="rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Add New Event</CardTitle>
        <CardDescription className="text-muted-foreground">
          Create a new adventure for your community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventName">Event Name *</Label>
              <Input
                id="eventName"
                value={newEvent.eventName}
                onChange={(e) => setNewEvent({ ...newEvent, eventName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meetingPointName">Meeting Point Name *</Label>
              <Input
                id="meetingPointName"
                value={newEvent.meetingPointName}
                onChange={(e) => setNewEvent({ ...newEvent, meetingPointName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meetingPointMapLink">Meeting Point Map Link *</Label>
            <Input
              id="meetingPointMapLink"
              type="url"
              value={newEvent.meetingPointMapLink}
              onChange={(e) => setNewEvent({ ...newEvent, meetingPointMapLink: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reachingPointLocationName">Reaching Point Name *</Label>
              <Input
                id="reachingPointLocationName"
                value={newEvent.reachingPointLocationName}
                onChange={(e) => setNewEvent({ ...newEvent, reachingPointLocationName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reachPointMapLink">Reach Point Map Link *</Label>
              <Input
                id="reachPointMapLink"
                type="url"
                value={newEvent.reachPointMapLink}
                onChange={(e) => setNewEvent({ ...newEvent, reachPointMapLink: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priceMale">Price for Male (INR) *</Label>
              <Input
                id="priceMale"
                type="number"
                value={newEvent.priceMale}
                onChange={(e) => setNewEvent({ ...newEvent, priceMale: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priceFemale">Price for Female (INR) *</Label>
              <Input
                id="priceFemale"
                type="number"
                value={newEvent.priceFemale}
                onChange={(e) => setNewEvent({ ...newEvent, priceFemale: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="facilities">
              Facilities (comma-separated)
            </Label>
            <Input
              id="facilities"
              value={newEvent.facilities}
              onChange={(e) => setNewEvent({ ...newEvent, facilities: e.target.value, })}
              placeholder="Guide, Meals, Equipment, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsappGroupJoiningLink">WhatsApp Group Link</Label>
            <Input
              id="whatsappGroupJoiningLink"
              type="url"
              value={newEvent.whatsappGroupJoiningLink}
              onChange={(e) => setNewEvent({ ...newEvent, whatsappGroupJoiningLink: e.target.value })}
              placeholder="https://chat.whatsapp.com/..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type (Easy, Moderate, Hard) *</Label>
              <Select
                value={newEvent.type}
                onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={newEvent.category}
                onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Trekking">Trekking</SelectItem>
                  <SelectItem value="Camping">Camping</SelectItem>
                  <SelectItem value="Cyclothon">Cyclothon</SelectItem>
                  <SelectItem value="Tour">Tour</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Bike Ride">Bike Ride</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div
            className={`mt-6 flex justify-center rounded-lg border-2 border-dashed px-6 py-10 transition duration-300 ease-in-out
              ${isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-gray-50"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
          >
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    multiple
                    className="sr-only"
                    ref={fileInputRef}
                    onChange={(e) => handleFiles(e.target.files)}
                    accept="image/*"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF (Max 1MB per image after compression)
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Selected Files:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="relative flex items-center justify-between p-2 border border-gray-200 rounded-md bg-white shadow-sm"
                  >
                    <div className="flex items-center">
                      <ImageIcon className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="text-sm text-gray-800 truncate">
                        {file.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                      aria-label={`Remove ${file.name}`}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button
            type="submit"
            variant="adventure"
            className="w-full flex justify-center items-center h-12 text-lg rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={uploadLoading}
          >
            {uploadLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {uploadMessage.text || "Adding Event..."}
              </>
            ) : (
              "Add Event"
            )}
          </Button>

          {uploadMessage.text && (
            <div
              className={`mt-4 p-3 rounded-md text-center text-sm ${
                uploadMessage.type === "success"
                  ? "bg-green-100 text-green-800"
                  : uploadMessage.type === "error"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {uploadMessage.text}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default EventForm;