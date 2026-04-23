<<<<<<< HEAD
# Photo Edit Application

Ứng dụng chỉnh sửa ảnh trực tuyến được xây dựng với MERN Stack (MongoDB, Express, React, Node.js). Ứng dụng cho phép người dùng đăng ký tài khoản, đăng nhập và thực hiện các thao tác chỉnh sửa ảnh như thay đổi kích thước, xoay, làm mờ, và áp dụng các bộ lọc màu.

## 🚀 Công nghệ sử dụng

### Frontend
- **React.js**: Thư viện UI.
- **React Router DOM**: Điều hướng trang.
- **React Icons**: Hệ thống icon (FontAwesome).
- **CSS3**: Giao diện người dùng.

### Backend
- **Node.js & Express**: Máy chủ xử lý API.
- **MongoDB & Mongoose**: Cơ sở dữ liệu và quản lý Schema.
- **JWT (JSON Web Token)**: Xác thực người dùng.
- **Bcryptjs**: Mã hóa mật khẩu.
- **Multer & Sharp**: Tải lên và xử lý hình ảnh.
- **Python**: Xử lý logic chỉnh sửa ảnh nâng cao bằng OpenCV và NumPy thông qua script `process_image.py`.

## 🛠 Yêu cầu hệ thống

- **Node.js**: Phiên bản đang sử dụng là Node.js v22.21.0 hoặc Node.js từ 14.x trở lên.
- **MongoDB**: Đã được cài đặt và đang chạy tại Local (cổng 27017) hoặc MongoDB Atlas.
- **Python**: Phiên bản Python 3.11.9 có sử dụng OpenCV và NumPy.


## 📦 Hướng dẫn cài đặt

### 1. Clone dự án
```bash
git clone <url-cua-kho-luu-tru>
cd App_Edit_Images
```

### 2. Cài đặt Backend
Di chuyển vào thư mục `server` và cài đặt các thư viện cần thiết:
```bash
cd server
npm install
```

**Cấu hình biến môi trường:**
Tạo file `.env` trong thư mục `server/` (nếu chưa có) và copy nội dung sau:
## 🚀 Hướng dẫn sử dụng

### Yêu cầu hệ thống
- Node.js >= 14.x
- npm >= 6.x
- MongoDB >= 4.x
- Python 3.x

### Bước 1: Clone repository và di chuyển vào thư mục dự án
```bash
git clone (https://github.com/DangTai128/APP_Edit_Image.git)
cd ten-thu-muc-du-an
```

### Bước 2: Cấu hình môi trường
Tạo file `.env` trong thư mục `server/` với nội dung:
>>>>>>> b89ba5fbf8a3b0bf61c9e6ffea1697d848f0f97a
```env
PORT=5000
JWT_SECRET=yourSuperSecretKey
MongoURI=mongodb://localhost:27017/App_edit_image
```

<<<<<<< HEAD
### 3. Cài đặt Frontend
Di chuyển vào thư mục `client` và cài đặt:
```bash
cd ../client
npm install
```

## 🏃 Cách chạy ứng dụng

Để ứng dụng hoạt động, bạn cần chạy đồng thời cả Server và Client.

### Bước 1: Chạy Backend Server
Mở terminal và thực hiện:
```bash
cd server
node server.js
```
*Server sẽ chạy tại: `http://localhost:5000`*

### Bước 2: Chạy Frontend Client
Mở một terminal mới và thực hiện:
```bash
cd client
npm start
```
*Ứng dụng sẽ tự động mở tại: `http://localhost:3000`*

## 📝 Lưu ý quan trọng
- Đảm bảo dịch vụ **MongoDB** đã được khởi động trước khi chạy server.
- File chạy chính của server là `server/server.js`.
- Các ảnh sau khi chỉnh sửa sẽ được xử lý qua API `/api/image/edit`.
- Có thể sử dụng các chức năng chỉnh sửa ảnh mà không cần đăng nhập hay đăng ký tài khoản.
