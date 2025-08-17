const multer = require("multer");
const path = require("path");
const storage = require("../utils/multerConfig");

const multerUploadInstance = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB per file
  fileFilter: (req, file, cb) => {
    // Allowed mimetypes for images
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    // Check mimetype. This is the most reliable way to check file type.
    const isMimeTypeAllowed = allowedMimeTypes.includes(file.mimetype);

    // Get file extension and convert to lowercase for consistent checking
    const fileExtension = path.extname(file.originalname).toLowerCase();

    // Check if the extension is one of the common image extensions
    // This is a fallback/additional check, as mimetype is primary
    const isExtensionCommonImage = ['.jpeg', '.jpg', '.png', '.gif'].includes(fileExtension);

    // If either mimetype is explicitly allowed OR it's a common image extension, allow it.
    // This allows for cases where compression might change mimetype but originalname retains extension.
    if (isMimeTypeAllowed || isExtensionCommonImage) {
      return cb(null, true);
    } else {
      cb(new Error("Error: Only image files are allowed! (jpeg, jpg, png, gif)"));
    }
  },
});

const uploadMiddleware = multerUploadInstance.array("images", 10);

module.exports = uploadMiddleware;