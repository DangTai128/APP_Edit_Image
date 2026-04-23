import React from "react";
import { FaDoorOpen, FaEdit, FaHistory, FaHome, FaUser, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/sideBar.css";

const SidebarTabs = () => {
  return (
    <div className="sidebar">
      <div className="tab-buttons">
        <Link to="/" className="tab-button">
          <FaHome />
          <span>Home</span>
        </Link>
        <Link to="/edit" className="tab-button">
          <FaEdit />
          <span>Edit</span>
        </Link>
        <Link to="/history" className="tab-button">
          <FaHistory />
          <span>History</span>
        </Link>
        <Link to="/account" className="tab-button">
          <FaUser/>
          <span>Account</span>
        </Link>
        <Link to="/setting" className="tab-button">
          <FaCog/>
          <span>Setting</span>
        </Link>
      </div>
    </div>
  );
};

export default SidebarTabs;
