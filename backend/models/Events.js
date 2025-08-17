const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    meetingPointName: {
      type: String,
      required: true,
      trim: true,
    },
    meetingPointMapLink: {
      type: String,
      required: true,
      trim: true,
    },
    reachingPointLocationName: {
      type: String,
      required: true,
      trim: true,
    },
    reachPointMapLink: {
      type: String,
      required: true,
      trim: true,
    },
    priceMale: {
      type: Number,
      required: true,
    },
    priceFemale: {
      type: Number,
      required: true,
    },
    facilities: {
      type: String,
      default: "N/A",
      trim: true,
    },
    photos: [
      {
        type: String,
      },
    ],
    whatsappGroupJoiningLink: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["easy-to-moderate", "moderate-to-high"],
    },
    distance: {
      type: String,
    },
    duration: {
      type: String,
    },
    category: {
      type: String,
      enum: [
        "Trekking",
        "Camping",
        "Cyclothon",
        "Tour",
        "Cultural",
        "Bike Ride",
        "private",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
