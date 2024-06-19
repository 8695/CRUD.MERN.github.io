
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadFile = () => {
    try {
        // Ensure the upload directory exists
        const uploadDir = path.join(__dirname,  'uploads',); // Adjust the path as necessary
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, uploadDir);
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname);
            }
        });

        // Return multer instance configured with storage
        return multer({ storage });

    } catch (error) {
        console.error('Error in multer:', error);
        throw error;
    }
}

module.exports = { uploadFile };
