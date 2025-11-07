const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { editImage } = require("../controllers/imageControllers");

router.post("/edit", upload.single("image"), editImage);

module.exports = router;
