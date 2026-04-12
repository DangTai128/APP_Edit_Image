const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Đảm bảo MongoURI trong file .env là: 
// MongoURI=mongodb://localhost:27017/App_edit_image
mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MongoURI)
  .then(() => {
    console.log("✅ Kết nối đến MongoDB thành công");
    app.listen(PORT, () => {
      console.log(`✅ Backend đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("❌ Kết nối đến MongoDB thất bại:", err));

app.use("/api/image", require("./routes/image"));
app.use("/api/auth", require("./routes/auth"));
