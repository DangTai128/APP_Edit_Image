// routes/auth.js
const express = require("express");
const router = express.Router();

// Ví dụ: route đăng nhập tạm thời
router.post("/login", (req, res) => {
  res.json({ message: "Đăng nhập thành công (giả lập)" });
});

module.exports = router;
