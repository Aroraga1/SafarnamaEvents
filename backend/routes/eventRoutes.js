const express = require("express");
const Event = require("../models/Events");
const router = express.Router();
// const nodeCron = require("node-cron");

// // Cloudinary config for deletion (agar zaroorat ho to)
// const cloudinary = require("cloudinary").v2;
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // A simple middleware to check for a valid admin password.
// const adminAuth = (req, res, next) => {
//   const password = req.header('x-admin-password');
//   if (password === "safarnama123") {
//     next();
//   } else {
//     res.status(401).json({ message: "Authentication failed. Invalid password." });
//   }
// };

// // Function to handle the automated event management logic
// const automateEventManagement = async () => {
//   console.log('Running automated event management job...');
//   const now = new Date();
  
//   try {
//     // Step 1: Find events to be moved to pastEvents
//     // An event is considered 'past' if its date is today and its time has passed by more than 5 hours.
//     // Or if its date is in the past.
//     const pastEventsCriteria = {
//       $or: [
//         { date: { $lt: now.toISOString().split('T')[0] } },
//         {
//           date: now.toISOString().split('T')[0],
//           // Time check logic (current time is greater than event time + 5 hours)
//           // This assumes `time` is a string like "HH:mm"
//           $expr: {
//             $gt: [
//               { $dateFromString: { dateString: { $concat: [now.toISOString().split('T')[0], "T", "$time", ":00.000Z"] } } },
//               { $dateAdd: { startDate: now, unit: "hour", amount: -5 } }
//             ]
//           }
//         }
//       ]
//     };
    
//     // Find past events with price > 1000
//     const eventsToMove = await Event.find({ ...pastEventsCriteria, priceMale: { $gt: 1000 } });
    
//     // Move to past events (this is a conceptual step, in MongoDB you would store it in a different collection)
//     if (eventsToMove.length > 0) {
//       console.log(`Found ${eventsToMove.length} events to move to past.`);
//       // Logic to move to a 'PastEvent' collection would go here.
//       // For now, we'll just log and then delete.
//     }

//     // Step 2: Delete old past events (if there are more than 2)
//     // For this to work, you would need a separate 'PastEvent' collection.
//     // Here's a conceptual approach:
//     // const pastEventsCount = await PastEvent.countDocuments();
//     // if (pastEventsCount > 2) {
//     //   const oldestEvent = await PastEvent.findOne().sort({ createdAt: 1 });
//     //   await oldestEvent.remove();
//     //   console.log(`Deleted oldest past event: ${oldestEvent.eventName}`);
//     // }

//     // Step 3: Delete events that are past but do not meet the criteria for 'past events' section
//     const eventsToDelete = await Event.find({ ...pastEventsCriteria, priceMale: { $lte: 1000 } });
//     if (eventsToDelete.length > 0) {
//       console.log(`Found ${eventsToDelete.length} events to delete permanently.`);
//       for (const event of eventsToDelete) {
//         // Optional: Delete media from Cloudinary
//         // for (const photoUrl of event.photos) {
//         //   const publicId = getPublicIdFromUrl(photoUrl); // You would need to implement this helper function
//         //   await cloudinary.uploader.destroy(publicId);
//         // }
//         await Event.deleteOne({ _id: event._id });
//       }
//     }
    
//   } catch (error) {
//     console.error("Error during automated event management:", error);
//   }
// };

// // Schedule the job to run every day at midnight (or any other time)
// // In a real-world app, you would use a dedicated worker process for this.
// nodeCron.schedule('0 0 * * *', automateEventManagement);
// // Or for testing: every 5 minutes
// // nodeCron.schedule('*/5 * * * *', automateEventManagement);


// // New route to get all active events
// router.get("/active-events", async (req, res) => {
//   const now = new Date();
//   try {
//     const activeEvents = await Event.find({ date: { $gte: now.toISOString().split('T')[0] } }).sort({ date: 1, time: 1 });
//     res.status(200).json(activeEvents);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch active events." });
//   }
// });

// // New route to get all past events (for the frontend to display)
// // This assumes you have a separate 'PastEvent' collection.
// router.get("/past-events", async (req, res) => {
//   // This is a placeholder. You would query your 'PastEvent' collection here.
//   // const pastEvents = await PastEvent.find().sort({ createdAt: -1 }).limit(2);
//   const mockPastEvents = [
//     { id: '1', eventName: 'Goa Trip', photos: ['...'], location: 'Goa', date: '2024-01-01', description: 'Fun times!', trekType: 'Party' },
//     { id: '2', eventName: 'Kerala Backwaters', photos: ['...'], location: 'Kerala', date: '2023-11-20', description: 'Relaxing boat ride.', trekType: 'Tour' }
//   ];
//   res.status(200).json(mockPastEvents);
// });

// module.exports = router;


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