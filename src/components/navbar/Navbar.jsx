import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookText,
  TreeDeciduous,
  CalendarCheck2,
  Newspaper,
  UserCircle,
} from "lucide-react";
import "./Navbar.scss";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" className="logo" title="Home">
          🌱
        </Link>
      </div>

      <div className="center">
        <Link to="/journal" className="icon-link" title="Journal">
          <BookText size={24} />
        </Link>
        <Link to="/emotionTree" className="icon-link" title="Emotion Tree">
          <TreeDeciduous size={24} />
        </Link>
        <Link to="/calendar" className="icon-link" title="Insight">
          <CalendarCheck2 size={24} />
        </Link>
        <Link to="/articles" className="icon-link" title="Articles">
          <Newspaper size={24} />
        </Link>
      </div>

      <div className="bottom" ref={dropdownRef}>
        <div
          className="icon-link profile-icon"
          onClick={toggleDropdown}
          title="Profile"
        >
          <UserCircle size={24} />
        </div>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/profile">My Profile</Link>
            <Link to="/settings">Settings</Link>
            <button onClick={() => alert("Logged out!")}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
