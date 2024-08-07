import express from "express";
import cors from "cors";
import multer from "multer";
import { join } from "path";

const app = express();

app.use(cors());
app.use(express.static(join(import.meta.dirname, "uploads")));

const port = process.env.PORT || 3000;

const allowedMimeTypes = ["image/jpeg", "image/png"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const filename = `${new Date().getTime()}-${file.originalname}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File Type nicht erlaubt!"));
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 100000000 } });

app.post("/file-upload", upload.single("image"), (req, res) => {
  res.send({
    ...req.file,
    destination: `http://localhost:${port}/${req.file.filename}`,
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
