// middleware/cloudinaryUploadMiddleware.js
const cloudinary = require("../utils/cloudinaryConfig");
const fs = require("fs");

const cloudinaryUploadMiddleware = async (req, res, next) => {
  
  if (!req.files || req.files.length === 0) {
    return next();
  }

  const uploadedImageUrls = [];
  const uploadPromises = [];

  for (const file of req.files) {
    uploadPromises.push(
      cloudinary.uploader
        .upload(file.path, { folder: "event_images" })
        .then((result) => {
          uploadedImageUrls.push(result.secure_url);
          fs.unlink(file.path, (err) => {
            if (err)
              console.error(`Error deleting local file ${file.path}:`, err);
          });
        })
        .catch((error) => {
          console.error(`Cloudinary upload error for ${file.path}:`, error);
          fs.unlink(file.path, (err) => {
            if (err)
              console.error(
                `Error deleting local file ${file.path} after failed upload:`,
                err
              );
          });
          throw new Error(
            `Failed to upload ${file.originalname} to Cloudinary.`
          );
        })
    );
  }

  try {
    const results = await Promise.allSettled(uploadPromises);

    const failedUploads = results.filter(
      (result) => result.status === "rejected"
    );
    if (failedUploads.length > 0) {
      const errorMessages = failedUploads.map(
        (f) => f.reason.message || "Unknown upload error"
      );
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlink(file.path, (err) => {
            if (err)
              console.error(`Error deleting residual file ${file.path}:`, err);
          });
        }
      });
      return res.status(500).json({
        message: "Some images failed to upload to Cloudinary.",
        errors: errorMessages,
        uploadedUrls: uploadedImageUrls,
      });
    }

    req.body.imageUrls = uploadedImageUrls;
    next();
  } catch (error) {
    console.error("Error during Cloudinary upload process:", error);
    res
      .status(500)
      .json({ message: "Internal server error during image upload." });
  }
};

module.exports = cloudinaryUploadMiddleware;
