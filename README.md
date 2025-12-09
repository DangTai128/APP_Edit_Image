# 🖼️ Image Editor & Upload Security Application

## 👥 Danh sách thành viên

| Họ và tên | MSSV |
|-----------|------|
| Lương Anh Quân | 22810310380 |
| Đặng Anh Tài | 22810310385 |

## 🔧 Phân chia công việc

### Lương Anh Quân
- ✅ Tìm hiểu về các cách thức bảo mật dữ liệu tải lên (File Upload Security)
- ✅ Tạo trang `editForm.js` bên phía client

### Đặng Anh Tài
- ✅ Tìm hiểu về các cách thức tấn công thông qua dữ liệu tải lên
- ✅ Tạo `imageController.js` và liên kết với Database bên phía server
- ✅ Demo tấn công thông qua dữ liệu tải lên

## 🚀 Hướng dẫn sử dụng

### Yêu cầu hệ thống
- Node.js >= 14.x
- npm >= 6.x
- MongoDB >= 4.x
- Python 3.x

### Bước 1: Clone repository và di chuyển vào thư mục dự án
```bash
git clone <link-repo-của-bạn>
cd ten-thu-muc-du-an
```

### Bước 2: Cấu hình môi trường
Tạo file `.env` trong thư mục `server/` với nội dung:
```env
PORT=5000
JWT_SECRET=yourSuperSecretKey
MongoURI=mongodb://localhost:27017/App_edit_image
```

### Bước 3: Khởi động MongoDB
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo service mongod start
```

### Bước 4: Cài đặt và chạy Backend
```bash
cd server
npm install
npm start
```
Server sẽ chạy tại: `http://localhost:5000`

### Bước 5: Cài đặt và chạy Frontend
Mở terminal mới:
```bash
cd client
npm install
npm start
```
Client sẽ chạy tại: `http://localhost:3000`

---

                        
  
