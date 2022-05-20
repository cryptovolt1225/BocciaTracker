import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router";

export default function Video() {
  const navigate = useNavigate();
  useEffect(() => {
    const loginState = localStorage.getItem('login');
    if (loginState !== "true") navigate('/login')
  }, [])
  useEffect(() => {
    var myVid = document.getElementById("vidObj");
    const myUrl = "http://localhost:5000/api/videos/output.mp4 ";
    myVid.setAttribute("src", myUrl);
  });

  return (
    <div>
      <video id="vidObj" width="640" height="480" controls loop muted autoplay>
        <source src="" type="video/mp4" />
      </video>
    </div>
  );

  // <Button onClick={() => handleStartRecording()}>add throw</Button>
  // <Button onClick={() => handleStartRecording()}>add session</Button>

  //add tow buttons - 1. go back to step 3 in the setion .
  //                  2. go to beginning of new ssetion .
}
