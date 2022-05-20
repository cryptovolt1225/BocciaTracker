import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { SelectField, InputField } from "../../FormFields";

export default function Success(props) {


  // useEffect(() => {
  //   var myVid = document.getElementById("vidObj");
  //   const myUrl = "http://localhost:5000/api/videos/output.mp4 ";
  //   myVid.setAttribute("src", myUrl);
  // });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        You have successfully added a throw to the system.
      </Typography>
      <Typography variant="h9" gutterBottom>
        Add another throw or finish your training session and view videos.
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
        </div> */}
    </React.Fragment>
  );
}
