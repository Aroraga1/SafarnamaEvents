const express = require("express");
const Event = require("../models/Events");
const router = express.Router();

router.get("/events", async (req, res) => {
  try {
    const allEvents = await Event.find({});
    res.status(200).json(allEvents);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    res.status(500).json({ message: "Failed to fetch events." });
  }
});

// ✅ Correct export
module.exports = router;
