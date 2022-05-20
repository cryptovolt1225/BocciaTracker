import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import './Assets/bootstrap.min.css';
import Session from "./Pages/Session";
import "../src/App.scss";
import Overview from "./Pages/Overview";
import Sidebar from "./Components/SideBar/SideBar";
import History from "./Pages/History";
import Video from "./Pages/Video";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";

function App() {
  const [minimized, setMinimized] = useState(false);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const loginState = localStorage.getItem('login');
  //   if (loginState !== "true") {
  //     navigate('/login')
  //   }
  //   else {
  //     navigate('/overview')
  //   }
  // }, [])
  const onMinimized = () => {
    setMinimized(!minimized);
  };

  async function getPlayers() {
    let url = "/api/coach/622c7f1a4ab2a0506cf7f2aa/players";
    try {
      let res = await fetch(url);
      console.log(res.body);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  getPlayers();

  return (
    <div className={`App ${minimized ? "minimized" : ""}`}>
      <AppRouter onMinimized={onMinimized} minimized={minimized} />
    </div>
  );
}

function AppRouter({ onMinimized, minimized }) {
  return (
    <Router>
      <Sidebar onMinimized={onMinimized} minimized={minimized} />
      <div className="App-page">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/session" element={<Session />} />
          <Route path="/history" element={<History />} />
          <Route path="/video" element={<Video />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
