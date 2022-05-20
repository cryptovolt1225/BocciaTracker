import axios from 'axios';
import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
// import HistoryTable from '../Components/HistoryTable';
import "./Overview.scss";



function History() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const loginState = localStorage.getItem('login');
    if (loginState !== "true") navigate('/login')
  }, [])

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    let data = await axios.get("/api/sessions");
    console.log("data:", data);
    let sessions = await Promise.all(
      data.data.map(async (i) => {
        let item = {
          value: i.player_name,
          label: i.player_name,
        };
        console.log(item);
        return item;
      })
    );
    setSessions(sessions);
  };
  return (
    <div className="session-page">
      <div className="page-header">
        <h1 className="page-title">History</h1>
      </div>
      <div className="page-container">
        <div className="session-head">
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default History