// routes/admin.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Get booking by booking ID
router.get("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("event");
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ error: "Failed to fetch booking" });
  }
});

module.exports = router;
