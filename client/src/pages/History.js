import React from "react";
import Header from "../component/header";
import SidebarTabs from "../component/sideBar";
import "../styles/history.css";

const History = () => {
    return (
        <>
            <Header />
            <SidebarTabs />
            <div className="history-box">
                <h1>Lịch sử chỉnh sửa ảnh</h1>
                <p>Chức năng này sẽ hiển thị lịch sử các chỉnh sửa ảnh của bạn trong tương lai.</p>
            </div>
        </>
    );
};

export default History;