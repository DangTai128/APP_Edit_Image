const express = require("express");
const router = express.Router();
const { upload, editImage } = require("../controllers/imageControllers");

router.post("/edit", upload.single("image"), editImage);

module.exports = router;
