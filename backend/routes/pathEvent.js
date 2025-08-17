const express = require("express");
const Event = require("../models/Events");
const router = express.Router();

// PATCH /admin/addEvent/:id
router.patch("/addEvent/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    console.log("done");

    res.status(200).json({ event: updatedEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
