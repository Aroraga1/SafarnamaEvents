const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", // ✅ important for referencing event
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    whatsapp: {
      type: String,
      required: true,
    },
    people: {
      type: Number,
      required: true,
    },
    joinedWhatsappGroup: {
      type: Boolean,
      default: false,
    },
    totalFee: {
      type: Number,
      default: 99
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
