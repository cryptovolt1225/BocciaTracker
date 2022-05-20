import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import SessionStepper from "../Components/Stepper/SessionStepper";
import "../Pages/Session.scss";

function Session(props) {
  const navigate = useNavigate();
  useEffect(() => {
    const loginState = localStorage.getItem('login');
    if (loginState !== "true") navigate('/login')
  }, [])
  return (
    <div className="session-page">
      <div className="page-header">
        <h1 className="page-title">Session</h1>
      </div>
      <div className="page-container">
        <SessionStepper />
        <div className="session-head">
          <div></div>
        </div>
      </div>
    </div>
  );
}
export default Session;
