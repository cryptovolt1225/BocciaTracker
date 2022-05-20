import React from "react";
import { Typography } from "@material-ui/core";

function AddPlayerSuccess(props) {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
      {`${props?.values.playerFullName} was successfully added to the system!`}
      </Typography>
    </React.Fragment>
  );
}

export default AddPlayerSuccess;
