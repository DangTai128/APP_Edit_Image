const express = require("express");
const router = express.Router();
const { upload, editImage } = require("../controllers/imageControllers");
const EditedImage = require("../models/editedImage");
const jwt = require("jsonwebtoken");

// Middleware xác thực nhanh
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Vui lòng đăng nhập' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    req.user = decoded;
    next();
  } catch (err) { res.status(401).json({ message: 'Token không hợp lệ' }); }
};

router.post("/edit", upload.single("image"), editImage);

// Route lấy lịch sử của tài khoản hiện tại
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const history = await EditedImage.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
