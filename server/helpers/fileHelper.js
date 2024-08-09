const multer = require('multer');
const path = require('path');

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
        return res.status(400).json({ error: err });
    } else if (err) {
        // Custom error message from fileFilter
        return res.status(400).json({ error: err });
    }
    // If no error occurred, proceed to the next middleware or route handler
    next();
};

module.exports = {
    preview,
    handleUploadError
};