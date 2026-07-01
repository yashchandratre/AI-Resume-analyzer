const fs = require("fs");
const path = require("path");
const multer = require("multer");

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const safeBaseName = path
      .parse(file.originalname)
      .name.replace(/[^a-zA-Z0-9-_]/g, "-")
      .slice(0, 80);
    const extension = path.extname(file.originalname).toLowerCase();

    cb(null, `${Date.now()}-${safeBaseName || "resume"}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      return cb(new Error("Only PDF and DOCX files are allowed"));
    }

    cb(null, true);
  },
});

function handleUploadErrors(err, req, res, next) {
  if (!err) return next();

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ success: false, message: "File size must be 5MB or less" });
    }

    return res.status(400).json({ success: false, message: err.message });
  }

  return res.status(400).json({ success: false, message: err.message || "Invalid upload" });
}

module.exports = {
  upload,
  handleUploadErrors,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE,
};
