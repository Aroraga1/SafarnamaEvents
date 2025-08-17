const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
dotenv.config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const adminRoutes = require("./routes/adminRoutes");
const eventRoutes = require("./routes/eventRoutes");
const bookingsRoutes = require("./routes/bookings");
const allBookings = require("./routes/allBookings");
const eachBooking = require("./routes/EachData");
const patchEvent = require("./routes/pathEvent");
const updateCurr = require("./routes/updateCurr");
const connectDB = require("./config/db");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // Replace with your React app's actual URL/port
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // If you're sending cookies or authorization headers
  })
);
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log(`Created 'uploads' directory at ${uploadDir}`);
}
app.use("/admin", adminRoutes);
app.use("/admin", allBookings);
app.use("/admin", patchEvent);
app.use("/admin", updateCurr);
app.use("/admin", eachBooking);
app.use("/api", eventRoutes);
app.use("/api", bookingsRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the Event Management API!");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `Access event upload at: http://localhost:${PORT}/admin/addEvent`
  );
});
