import React from "react";
import Header from "../component/header";
import "../styles/home.css";
import SidebarTabs from "../component/sideBar";

const Home = () => {
  return (
    <>
        <Header />
        <SidebarTabs />
        <div className="intro-box">
          <h1>Giới thiệu về Photo Edit</h1>
          <p>
            Đây là ứng dụng chỉnh sửa ảnh đơn giản và mạnh mẽ. Bạn có thể cắt ảnh, thêm bộ lọc,
            chèn văn bản và quản lý thư viện ảnh dễ dàng. Hãy chọn công cụ từ thanh bên trái để bắt đầu.
          </p>
        </div>
    </>
  );
};

export default Home;
