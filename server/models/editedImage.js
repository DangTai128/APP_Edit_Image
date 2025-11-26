const mongoose = require("mongoose");

const EditedImageSchema = new mongoose.Schema({
  originalName: String,
  editedUrl: String,        
  edits: {
    resize: Object,
    rotate: Number,
    blur: Number,
    brightness: Number,
    contrast: Number,
    filter: String,
    textOverlay: Object,
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("EditedImage", EditedImageSchema);