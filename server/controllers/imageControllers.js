
const { execFile } = require("child_process");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");
const EditedImage = require("../models/editedImage");

const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif"
];

exports.editImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Không có file được upload" });
  }

  // Kiểm tra MIME type
  const fileMime = req.file.mimetype;
  if (!allowedTypes.includes(fileMime)) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: "Chỉ cho phép file ảnh (JPG, PNG, WebP, GIF)" });
  }

  // const inputPath = req.file.path;
  // const outputDir = path.join(__dirname, "..", "outputs");
  // if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  // const outputPath = path.join(outputDir, `${Date.now()}_edited.jpg`);

  const payload = {
    imagePath: inputPath,
    outputPath,
    resize: req.body.resize ? JSON.parse(req.body.resize) : {},
    rotate: req.body.rotate || "",
    blur: req.body.blur || "",
    brightness: req.body.brightness || "",
    contrast: req.body.contrast || "",
    filter: req.body.filter || "",
    textOverlay: req.body.textOverlay ? JSON.parse(req.body.textOverlay) : {},
  };

  const pythonScript = path.join(__dirname, "..", "process_image.py");

  execFile("python", [pythonScript, JSON.stringify(payload)], async (error, stdout, stderr) => {
    if (error || stderr) {
      console.error("Lỗi Python:", error || stderr);
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      return res.status(500).json({ error: "Xử lý ảnh thất bại" });
    }

    try {
      const editedImage = new EditedImage({
        originalName: req.file.originalname,
        edits: {
          resize: payload.resize,
          rotate: payload.rotate,
          blur: payload.blur,
          brightness: payload.brightness,
          contrast: payload.contrast,
          filter: payload.filter,
          textOverlay: payload.textOverlay,
        }
      });
      await editedImage.save();
    } catch (dbErr) {
      console.error("Lỗi lưu DB:", dbErr);
    }

    // Gửi file về client
    const mimeType = mime.lookup(outputPath) || "image/jpeg";
    res.setHeader("Content-Type", mimeType);
    res.sendFile(path.resolve(outputPath), () => {
      // Dọn dẹp file tạm
      fs.unlinkSync(inputPath);
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    });
  });
};