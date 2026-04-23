import React from "react";
import Header from "../component/header";
import SidebarTabs from "../component/sideBar";
import "../styles/setting.css";

const Setting = () => {
    return (
        <>
            <Header />
            <SidebarTabs />
            <div className="setting-center">
                <div className="setting-box">
                    <h2>Cài đặt</h2>
                    <p>Quản lý cài đặt ứng dụng của bạn tại đây.</p>
                </div>
            </div>
        </>
    );
}
export default Setting;