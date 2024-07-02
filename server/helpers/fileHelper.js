// For file uploads
const multer = require('multer');
const path = require('path');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// Mount multer middleware before the route handler with a max file size of 10MB
const preview = multer({
    limits: { fileSize: 10 * 1024 * 1024 }, // Set the limit to 10MB

    // File Filter to control the types of files uploaded
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb('Please upload an image with a valid format (jpg, jpeg, or png).', false);
        }
        cb(null, true);
    }
});

// Error handling middleware
const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Multer errors (e.g., file size exceeded)
        return res.status(400).json({ error: 'File upload error.' });
    } else if (err) {
        // Custom error message from fileFilter
        return res.status(400).json({ error: err });
    }
    // If no error occurred, proceed to the next middleware or route handler
    next();
};

// Use the ClerkExpressRequireAuth middleware to require authentication for a route
const customRequireAuth = (req, res, next) => {
    ClerkExpressRequireAuth()(req, res, (err) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized: Please sign-in." });
      }
      next();
    });
};

module.exports = {
    preview,
    handleUploadError,
    customRequireAuth,
};