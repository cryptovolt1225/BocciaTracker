import React, { useState } from "react";
import Sidebar from "../Components/SideBar/SideBar";

function Homescreen(props) {
  const [minimized, setMinimized] = useState(false);
  const onMinimized = () => {
    setMinimized(!minimized);
  };

  return (
    <div className="page-container">
      <Sidebar onMinimized={onMinimized} minimized={minimized} />
    </div>
  );
}

export default Homescreen;
