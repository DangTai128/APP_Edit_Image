// import React from "react";
// import Header from "../component/header";
// import SidebarTabs from "../component/sideBar";
// import "../styles/login.css";
// import loginImage from "../assets/login-image.jpg";

// const Login = () => {
//   return (
//     <>
//       <Header />
//       <div className="login-center">
//         <div className="login-box">
//           <div className="login-image">
//             <img src={loginImage} alt="Login" />
//           </div>
//           <div className="login-form">
//             <h2>Đăng nhập</h2>
//             <form className="login-form-inner">
//               <input type="email" name="your-email" placeholder="Email" required />
//               <input type="tel" name="your-pass" placeholder="Mật khẩu" />
//               <input type="number" name="your-otp" placeholder="OTP" />
//               <button type="submit" className="button primary">
//                 Đăng nhập
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import React, { useState } from "react";
import Header from "../component/header";
import "../styles/login.css";
import loginImage from "../assets/login-image.jpg";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Đăng nhập thành công!");
        navigate("/");
      } else {
        alert(data.message || "Sai thông tin đăng nhập");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Lỗi kết nối server.");
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
            <img src={loginImage} alt="Login" />
          </div>
          <div className="login-form">
            <h2>Đăng nhập</h2>
            <form onSubmit={handleLogin}>
              <label htmlFor="username">Tên đăng nhập:</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <label htmlFor="password">Mật khẩu:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit" disabled={loading}>
                {loading ? "Đang xác thực..." : "Đăng nhập"}
              </button>
            </form>
            <p>Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;