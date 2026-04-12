import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../component/header";
import "../styles/login.css"; // Dùng chung style với login
import loginImage from "../assets/login-image.jpg";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (username.trim().length < 3) return alert("Tên đăng nhập phải ít nhất 3 ký tự");

    if (password !== confirmPassword) {
      return alert("Mật khẩu xác nhận không khớp!");
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(data.message || "Đăng ký thành công!");
        navigate("/login");
      } else {
        alert("Thất bại: " + (data.message || "Lỗi không xác định"));
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      alert("Không thể kết nối đến server (Port 5000). Hãy kiểm tra terminal backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="login-center">
        <div className="login-box">
          <div className="login-image">
            <img src={loginImage} alt="Register" />
          </div>
          <div className="login-form">
            <h2>Đăng ký</h2>
            <form onSubmit={handleRegister}>
              <label htmlFor="username">Tên đăng nhập:</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              
              <label htmlFor="password">Mật khẩu:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              
              <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              
              <button type="submit" disabled={loading}>
                {loading ? "Đang xử lý..." : "Đăng ký"}
              </button>
            </form>
            <p>Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;