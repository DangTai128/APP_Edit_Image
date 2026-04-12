import React from "react";
import { Link } from "react-router-dom";
import { FaDoorOpen } from "react-icons/fa";
import "../styles/header.css";

const Header = () => {
    return (
        <div className="header">
            <div className="header-logo">
                <p>Photo Edit</p>
            </div>
            <div className="header-nav">
                <Link to="/" className="header-link">Trang chủ</Link>
                <Link to="/login" className="header-login">
                    <FaDoorOpen />
                </Link>
            </div>
        </div>
    );
}

export default Header;
