import React, { useState, useCallback, useRef } from "react";
import axios from "axios"; // Import Axios
// Lucide-React icons ko directly import karne ke liye path sahi karo
// Agar aapne lucide-react install kiya hai, toh yeh imports sahi kaam karenge
import {
  Upload,
  MapPin,
  Tag,
  DollarSign,
  List,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

const App = () => {
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [facilities, setFacilities] = useState("");
  const [eventType, setEventType] = useState(""); // Corresponds to 'type' in backend
  const [rupee, setRupee] = useState("");
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fileInputRef = useRef(null);

  const handleFiles = (newFiles) => {
    if (newFiles) {
      const newFilesArray = Array.from(newFiles);
      // Optional: Add a check for file size or type if needed
      setFiles((prevFiles) => [...prevFiles, ...newFilesArray]);
      setMessage({ type: "", text: "" });
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
  }, []);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData();
    formData.append("name", eventName);
    formData.append("location", location);
    formData.append("facilities", facilities);
    formData.append("type", eventType); // Ensure this matches your backend schema field name
    formData.append("rupee", rupee); // Ensure this matches your backend schema field name

    files.forEach((file) => {
      formData.append("images", file); // 'images' should match your Multer field name
    });

    try {
      // Use axios.post instead of fetch
      const response = await axios.post(
        "${import.meta.env.REACT_BACKENDURL}/admin/addEvent",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Axios sets this automatically for FormData, but good to be explicit
          },
        }
      );

      // Axios wraps the response data in `response.data`
      if (response.status === 200 || response.status === 201) {
        // Check for success status codes
        setMessage({
          type: "success",
          text: response.data.message || "Event added successfully!",
        });
        // Clear form fields
        setEventName("");
        setLocation("");
        setFacilities("");
        setEventType("");
        setRupee("");
        setFiles([]);
      } else {
        // This block might not be reached if Axios throws an error for non-2xx statuses
        // Axios handles non-2xx responses as errors, caught in the catch block
        setMessage({
          type: "error",
          text: response.data.message || "Failed to add event.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Axios error handling: `error.response` contains the server's response
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setMessage({
          type: "error",
          text: error.response.data.message || "Failed to add event.",
        });
        console.error("Server response data:", error.response.data);
        console.error("Server response status:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        setMessage({
          type: "error",
          text: "No response from server. Check network connection.",
        });
        console.error("No response received:", error.request);
      } else {
        // Something else happened in setting up the request that triggered an Error
        setMessage({ type: "error", text: "Error setting up request." });
        console.error("Request setup error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4 font-inter">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 w-full max-w-2xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Add New Event
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Name */}
          <div>
            <label
              htmlFor="eventName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Event Name
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Tag className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Concert Night"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="City Convention Center"
                required
              />
            </div>
          </div>

          {/* Facilities */}
          <div>
            <label
              htmlFor="facilities"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Facilities (e.g., Parking, Food Stalls)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <List className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="facilities"
                value={facilities}
                onChange={(e) => setFacilities(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Parking, Food, Restrooms"
              />
            </div>
          </div>

          {/* Event Type */}
          <div>
            <label
              htmlFor="eventType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Event Type
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Tag className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="eventType"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Music, Sports, Conference"
                required
              />
            </div>
          </div>

          {/* Rupee (Cost) */}
          <div>
            <label
              htmlFor="rupee"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cost (in INR)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="rupee"
                value={rupee}
                onChange={(e) => setRupee(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="500"
                required
              />
            </div>
          </div>

          {/* Drag and Drop Area */}
          <div
            className={`mt-6 flex justify-center rounded-lg border-2 border-dashed px-6 py-10 transition duration-300 ease-in-out
              ${
                isDragging
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-300 bg-gray-50"
              }`}
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
                PNG, JPG, GIF up to 5MB per file
              </p>
            </div>
          </div>

          {/* File Previews */}
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

          {/* Submission Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out transform hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Adding Event...
                </>
              ) : (
                "Add Event"
              )}
            </button>
          </div>

          {/* Message Display */}
          {message.text && (
            <div
              className={`mt-4 p-3 rounded-md text-center text-sm ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default App;
