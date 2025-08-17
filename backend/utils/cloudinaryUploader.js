const cloudinary = require("cloudinary").v2;
const fs = require('fs').promises; // For async file operations

// Configure Cloudinary (ensure this is done in app.js or here if not global)
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const uploadImagesSequentially = async (files) => {
  const imageUrls = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = file.path;

    try {
      console.log(`Uploading image ${i + 1}/${files.length}: ${file.filename} to Cloudinary...`);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "event_images",
      });
      imageUrls.push(result.secure_url);
      console.log(`Successfully uploaded ${file.filename}. URL: ${result.secure_url}`);
    } catch (uploadError) {
      console.error(`Failed to upload ${file.filename} to Cloudinary:`, uploadError);
      // Decide if you want to throw an error here or continue with other files
      // For now, it logs and continues. If you want strict failure, uncomment throw below.
      // throw new Error(`Cloudinary upload failed for ${file.filename}: ${uploadError.message}`);
    } finally {
      // Delete local file after attempting upload (success or failure)
      try {
        await fs.unlink(filePath);
        console.log(`Deleted local file: ${filePath}`);
      } catch (deleteError) {
        console.error(`Error deleting local file ${filePath}:`, deleteError);
      }
    }

    // Add a delay between uploads to avoid hitting rate limits or overwhelming Cloudinary
    if (i < files.length - 1) {
      console.log("Waiting 5 seconds before next upload...");
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  return imageUrls;
};

module.exports = { uploadImagesSequentially };