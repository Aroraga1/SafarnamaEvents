import axios from "axios";

const API_BASE_URL = "https://safarnama-events.vercel.app/admin";

export const addEvent = async (formData, onUploadProgress) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addEvent`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (onUploadProgress) {
          onUploadProgress(percentCompleted);
        }
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error adding event:", error);
    throw error;
  }
};
