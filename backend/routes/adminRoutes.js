const express = require("express");
const Event = require("../models/Events");
const router = express.Router();

// Authentication middleware has been removed for unsigned uploads.
// The route will now accept any request without a password header.

router.post("/addEvent", async (req, res) => {
  console.log("--- Starting addEvent request processing ---");
  console.log("Request Body:", req.body);

  try {
    const {
      eventName,
      date,
      time,
      meetingPointName,
      meetingPointMapLink,
      reachingPointLocationName,
      reachPointMapLink,
      priceMale,
      priceFemale,
      facilities,
      whatsappGroupJoiningLink,
      type,
      category,
      photos
    } = req.body;

    // Validation
    if (!eventName || !date || !time || !meetingPointName || !meetingPointMapLink ||
      !reachingPointLocationName || !reachPointMapLink || priceMale === undefined ||
      priceFemale === undefined || !type || !category || !photos || photos.length === 0) {
      console.log("Missing required fields or photos.");
      return res.status(400).json({ message: "All required fields and at least one photo are needed." });
    }

    console.log("Phase 1: Creating new event document...");

    const newEvent = new Event({
      eventName,
      date,
      time,
      meetingPointName,
      meetingPointMapLink,
      reachingPointLocationName,
      reachPointMapLink,
      priceMale,
      priceFemale,
      facilities,
      whatsappGroupJoiningLink,
      type,
      category,
      photos,
    });

    console.log("Phase 2: Saving to MongoDB...");
    await newEvent.save();

    console.log("Event saved to DB successfully:", newEvent);

    res.status(201).json({
      message: "Event added successfully!",
      event: newEvent,
    });
    console.log("--- addEvent request processing completed successfully ---");

  } catch (error) {
    console.error("Critical Error in addEvent route:", error);
    res.status(500).json({
      message: "Server error during event creation.",
      error: error.message,
    });
    console.log("--- addEvent request processing failed ---");
  }
});




module.exports = router;
