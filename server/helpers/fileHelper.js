// For file uploads
const multer = require('multer');
const path = require('path');

// Set up multer storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Specify the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
});

// Mount multer middleware before the route handler with a max file size of 10MB
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Set the limit to 10MB
});

module.exports = {
    upload,
}