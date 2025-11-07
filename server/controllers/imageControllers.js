const { execFile } = require("child_process");
const path = require("path");
const mime = require("mime-types");
const fs = require("fs");

exports.editImage = (req, res) => {
  const inputPath = req.file.path;

  const outputDir = path.join(__dirname, "..", "outputs");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const outputPath = path.join(outputDir, `${req.file.filename}_edited.jpg`);

  const payload = {
    imagePath: inputPath,
    outputPath,
    resize: req.body.resize ? JSON.parse(req.body.resize) : {},
    rotate: req.body.rotate,
    blur: req.body.blur,
    brightness: req.body.brightness,
    contrast: req.body.contrast,
    textOverlay: req.body.textOverlay ? JSON.parse(req.body.textOverlay) : {},
    filter: req.body.filter,
  };
  const pythonScript = path.join(__dirname, "..", "process_image.py");
  execFile("python", [pythonScript, JSON.stringify(payload)], (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Lỗi khi gọi Python:", error);
      console.error("📄 stderr:", stderr);
      return res.status(500).json({ error: "Xử lý ảnh thất bại" });
    }

    const mimeType = mime.lookup(outputPath) || "image/jpeg";
    res.setHeader("Content-Type", mimeType);
    res.sendFile(path.resolve(outputPath), () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  });
};