import React, { useState, useEffect } from "react";
import Header from "../component/header";
import SidebarTabs from "../component/sideBar";
import "../styles/history.css";

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem("token");
            if (!token) return setLoading(false);

            try {
                const res = await fetch("http://localhost:5000/api/image/history", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setHistory(data);
                }
            } catch (error) {
                console.error("Lỗi lấy lịch sử:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    return (
        <>
            <Header />
            <SidebarTabs />
            <div className="history-center">
                <div className="history-box">
                    <h2>Lịch sử chỉnh sửa</h2>
                    <p>Xem lại các chỉnh sửa trước đây của bạn tại đây.</p>
                </div>
                <div className="history-content">
                    {loading ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : history.length > 0 ? (
                        <div className="history-grid">
                            {history.map((item) => (
                                <div key={item._id} className="history-item">
                                    <img src={`http://localhost:5000${item.editedUrl}`} alt="Edited" />
                                    <div className="history-info">
                                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                        <a href={`http://localhost:5000${item.editedUrl}`} download>Tải về</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Bạn chưa có lịch sử chỉnh sửa nào.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default History;