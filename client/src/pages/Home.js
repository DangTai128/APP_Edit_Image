import React from "react";
import Header from "../component/header";
import SidebarTabs from "../component/sideBar";
import "../styles/home.css";
const Home = () => {
  return (
    <>  
        <Header />
        <SidebarTabs />
        <div className="home-center">
            <div className="intro-box">
                <h2>Chào mừng bạn</h2>
                <p>Hãy bắt đầu bằng cách đăng nhập hoặc đăng ký để trải nghiệm những tính năng tuyệt vời mà chúng tôi cung cấp!</p>
            </div>
        </div>
    </>
  );
}

export default Home;