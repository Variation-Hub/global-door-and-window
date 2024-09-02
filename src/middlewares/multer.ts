import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Directory where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename the file to avoid conflicts
    }
});

const upload = multer({ storage });

export default upload;
