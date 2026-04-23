const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Route đăng ký
router.post('/register', async (req, res) => {
  try {
    let { username, password } = req.body;
    username = username?.trim();
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });

    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (error) {
    console.error("❌ Lỗi chi tiết tại Register:", error.message);
    // Xử lý lỗi trùng lặp từ MongoDB (mã 11000)
    if (error.code === 11000 || error.message.includes("E11000")) {
        return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại trong hệ thống' });
    }
    return res.status(500).json({ message: 'Lỗi server: ' + error.message });
  }
});

// Route đăng nhập
router.post('/login', async (req, res) => {
  try {
    let { username, password } = req.body;
    username = username?.trim();

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Tên đăng nhập không đúng' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Mật khẩu không đúng' });

    // Tạo JWT token (Sử dụng secret key từ .env)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
    
    res.json({ token, username: user.username });
  } catch (error) {
    console.error("❌ Lỗi đăng nhập:", error);
    res.status(500).json({ message: error.message });
  }
});

// Middleware xác thực JWT
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Quyền truy cập bị từ chối, vui lòng đăng nhập' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

// Route lấy thông tin cá nhân
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Người dùng không tồn tại' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;