import React from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/sideBar.css";

const SidebarTabs = () => {
  return (
    <div className="sidebar">
      <div className="tab-buttons">
        {/* <Link to="/" className="tab-button">
          <FaHome />
          <span>Home</span>
        </Link> */}
        <Link to="/" className="tab-button">
          <FaEdit />
          <span>Edit</span>
        </Link>
        {/* <Link to="/history" className="tab-button">
          <FaHistory />
          <span>History</span>
        </Link>
        <Link to="/gallery" className="tab-button">
          <FaImage />
          <span>Gallery</span>
        </Link> */}
      </div>
    </div>
  );
};

export default SidebarTabs;
