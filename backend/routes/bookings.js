const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");



router.post("/bookings/:eventId", async (req, res) => {
  console.log("✅ Booking POST route hit"); // ✅ Check this logyi0-/

  // const { event } = req.params;
  const { event, name, email, age, whatsapp, people, joinedWhatsappGroup, totalFee } = req.body;

  if (!event || !name || !email || !age || !whatsapp || !people || !totalFee) {
    console.log("❌ Missing fields");
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newBooking = new Booking({
      event: event,
      name,
      email,
      age,
      whatsapp,
      people,
      joinedWhatsappGroup,
      totalFee
    });

    await newBooking.save(); // 🔥 DB insert

    console.log("✅ Booking saved in DB:", newBooking);
    return res.status(200).json({ message: "Booking successful" });
  } catch (err) {
    console.error("❌ Booking error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
