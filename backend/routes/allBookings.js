const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.get("/bookings", async (req, res) => {
  console.log("✅ Bookings GET route hit");

  try {
    const allBookings = await Booking.find({}); // Sabhi bookings ko database se nikaalo
    console.log("✅ All bookings fetched from DB");
    return res.status(200).json(allBookings); // Unko JSON response mein bhejo
  } catch (err) {
    console.error("❌ Failed to fetch bookings:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
