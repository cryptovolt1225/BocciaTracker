// import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";


import { ReactComponent as Logo } from "../../Assets/images/logoB.svg";
import { ReactComponent as LogoMini } from "../../Assets/images/logoMiniB.svg";
import { ReactComponent as SideBarArrow } from "../../Assets/icons/sideBarArrow.svg";

import { ReactComponent as Questionnaires } from "../../Assets/icons/sideBar/questionnaires.svg";
import { ReactComponent as Add } from "../../Assets/icons/upload.svg";

import { ReactComponent as Overview } from "../../Assets/icons/sideBar/overview.svg";
import { ReactComponent as Profile } from "../../Assets/icons/sideBar/profile.svg";

import { ReactComponent as Logout } from "../../Assets/icons/sideBar/logout.svg";
import "./SideBar.scss";

export default function Sidebar({ onMinimized, minimized }) {
  const navigate = useNavigate()

  const goLogin = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("coach");
    navigate('/login')
  }
  const links = [
    { name: "Overview", icon: Overview, path: "/overview", type: "Views" },
    { name: "History", icon: Questionnaires, path: "/history", type: "Views" },
    {
      name: "Session",
      icon: Add,
      path: "/session",
      type: "Tools",
    },
    { name: "Profile", icon: Profile, path: "/settings", type: "Settings" },
  ];

  const Settings = links.filter((link) => link.type === "Settings");
  const Tools = links.filter((link) => link.type === "Tools");
  const Views = links.filter((link) => link.type === "Views");

  function SidebarOption({ option }) {
    const Icon = option.icon;
    return (
      <NavLink to={option.path} className="sidebar-option">
        <Icon />
        {!minimized && <span>{option.name}</span>}
      </NavLink>
    );
  }

  return (
    
    <div className={`sidebar ${minimized ? "minimized" : ""}`}>
      {/* <div className="sidebar-minimize" onClick={onMinimized}>
        <SideBarArrow />
      </div> */}

      <div className="sidebar-container">
        <div className="sidebar-logo">
          <NavLink to="/overview">
            {!minimized && <Logo />}
            {minimized && <LogoMini />}
          </NavLink>
        </div>

        <div className="sidebar-options">
          <div className="sidebar-options-title">Views</div>
          <div className="sidebar-options-links">
          {Views.map((option) => (
            <SidebarOption option={option} key={option.name} />
          ))}
          </div>
        </div>
        <div className="separator"></div>
        <div className="sidebar-options">
          <div className="sidebar-options-title">Tools</div>
          {Tools.map((option) => (
            <SidebarOption option={option} key={option.name} />
          ))}
        </div>
        <div className="separator"></div>
        <div className="sidebar-options">
          <div className="sidebar-options-title">Settings</div>
          {Settings.map((option) => (
            <SidebarOption option={option} key={option.name} />
          ))}
        </div>

        <div className="sidebar-options logout">
          <button onClick={() => goLogin()} className="sidebar-option button">
            <Logout />
            {!minimized && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
