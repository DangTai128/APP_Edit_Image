import React, { useState, useEffect } from "react";
import Header from "../component/header";
import SidebarTabs from "../component/sideBar";
import "../styles/account.css";

const Account = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Bạn chưa đăng nhập. Vui lòng đăng nhập để xem thông tin.");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/auth/profile", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setUser(data);
                } else {
                    setError(data.message || "Không thể lấy thông tin tài khoản");
                }
            } catch (err) {
                setError("Lỗi kết nối đến server");
            }
        };

        fetchProfile();
    }, []);

    return (
        <>
            <Header />
            <SidebarTabs />
            <div className="account-center">
                <div className="account-box">
                    <h2>Tài khoản của tôi</h2>
                    {error ? (
                        <p style={{ color: "#ff4d4d", marginTop: "20px" }}>{error}</p>
                    ) : user ? (
                        <div className="user-details" style={{ marginTop: "20px", textAlign: "left", display: "inline-block" }}>
                            <p><strong>Tên đăng nhập:</strong> {user.username}</p>
                            <p><strong>ID người dùng:</strong> {user._id}</p>
                        </div>
                    ) : (
                        <p style={{ marginTop: "20px" }}>Đang tải thông tin...</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Account;