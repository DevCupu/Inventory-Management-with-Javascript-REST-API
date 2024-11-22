// config/multerConfig.js
import multer from 'multer';
import path from 'path';

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // name for the file
  }
});

// Optional file filter to accept only specific file types (images in this case)
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/; // Allowed extensions
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Optional file size limit (5MB)
  fileFilter,
});

export default upload;
