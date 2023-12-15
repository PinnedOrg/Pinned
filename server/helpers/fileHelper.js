// For file uploads
const multer = require('multer');
const path = require('path');

// Mount multer middleware before the route handler with a max file size of 10MB
const preview = multer({
    limits: { fileSize: 10 * 1024 * 1024 }, // Set the limit to 10MB
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image.'));
        }
        cb(undefined, true)
    }
});

module.exports = {
    preview,
}