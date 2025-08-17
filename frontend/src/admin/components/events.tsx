import axios from "axios";

// Backend server ka base URL. Isse apne actual server URL se replace kar dena.
// Jaise agar tumhara server 'http://localhost:5000' par chal raha hai.
const API_BASE_URL = "http://localhost:3000/admin";

/**
 * Adds a new event to the backend server, including event details and image files.
 *
 * @param {FormData} formData - FormData object containing event details and image files.
 * - Event details (e.g., eventName, date, time, priceMale, priceFemale, etc.)
 * should be appended as key-value pairs.
 * - Image files should be appended with the key 'images' (matching backend's `upload` middleware).
 * @param {function(number): void} onUploadProgress - Callback function to track upload progress.
 * It receives a number (0-100) representing the percentage completed.
 * @returns {Promise<object>} - A Promise that resolves with the response data from the server
 * upon successful event creation, or rejects with an error.
 */
export const addEvent = async (formData, onUploadProgress) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/addEvent`, // Tumhara server route for adding events
      formData, // FormData object containing all data, including files
      {
        headers: {
          // 'multipart/form-data' header automatically set by Axios when sending FormData
          // but explicitly mentioning it can sometimes help clarity.
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          // Calculate upload progress percentage
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          // Call the provided callback function with the progress
          if (onUploadProgress) {
            onUploadProgress(percentCompleted);
          }
        },
      }
    );
    // Return the data received from the server (e.g., success message, new event object)
    return response.data;
  } catch (error) {
    console.error("API Error adding event:", error);
    // Re-throw the error so that the calling component (EventForm) can catch and handle it
    throw error;
  }
};

// Tum yahan future mein aur API functions add kar sakte ho, jaise:
// export const getEvents = async () => { /* ... */ };
// export const updateEvent = async (id, data) => { /* ... */ };
// export const deleteEvent = async (id) => { /* ... */ };  