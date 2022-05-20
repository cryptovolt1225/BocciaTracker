import React from "react";
import { Typography } from "@material-ui/core";

function AddPlayedFailed(props) {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
      {`${props?.values.playerFullName} was not successfully added to the system! A player with this email exists already.`}
      </Typography>
    </React.Fragment>
  );
}

export default AddPlayedFailed;
