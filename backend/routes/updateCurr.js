const express = require("express");
const Event = require("../models/Events");
const router = express.Router();
const mongoose = require("mongoose");

router.put("/updateEvent/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Event ID" });
    }

    const updateData = { ...req.body };

    if (updateData.photos) {
      delete updateData.photos;
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.status(200).json(
      {
        message: "Event successfully updated!",
        event: updatedEvent,
      },
      console.log("updated Successfully")
    );
  } catch (error) {
    console.error("Error updating event:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Server error.", error: error.message });
  }
});

module.exports = router;
