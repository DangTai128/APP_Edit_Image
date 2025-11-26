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

mongoose.connect(process.env.MongoURI)
  .then(() => console.log("✅ Kết nối đến MongoDB thành công"))
  .catch(err => console.error("❌ Kết nối đến MongoDB thất bại:", err));

app.use("/api/image", require("./routes/image"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend đang chạy tại http://localhost:${PORT}`);
});
