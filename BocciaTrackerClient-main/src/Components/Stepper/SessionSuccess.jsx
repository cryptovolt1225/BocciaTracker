import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Typography, Button, makeStyles } from "@material-ui/core";
import "./SessionSuccess.scss";

const useStyle = makeStyles((theme) => ({
  historyLink: {
    color: "#3f51b5",
  },
}));


function SessionSuccess(props) {

  const classes = useStyle();

  // useEffect(() => {
  //   var myVid = document.getElementById("vidObj");
  //   const myUrl = "http://localhost:5000/api/videos/output.mp4 ";
  //   myVid.setAttribute("src", myUrl);
  // });

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        You successfully finished your training session!
      </Typography>
      <Typography variant="subtitle1">
        {`Checkout the scores that our system gave ${props?.values.playerName}`}{" "}
        <Link className={classes.historyLink} to="/history">here</Link>.
      </Typography>
      {/* <div>
        <video
          id="vidObj"
          width="640"
          height="480"
          controls
          loop
          muted
          autoplay
        >
          <source src="" type="video/mp4" />
        </video>
      </div>

      <Button type="submit" variant="contained" color="primary">
        Another throw
      </Button> */}
    </React.Fragment>
  );
}

export default SessionSuccess;
