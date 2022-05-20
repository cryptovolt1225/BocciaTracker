import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { SelectField } from "../../FormFields";
import RecordVideo from "./RecordVideo.tsx";

// const checkthrow = [
//   {
//     value: undefined,
//     label: "None",
//   },
//   {
//     value: "yesP",
//     label: "Yes",
//   },
//   {
//     value: "noP",
//     label: "No",
//   },
// ];

function WebcamReady(props) {
  const {
    formField: { checkThrow },
  } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Record a throw!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <RecordVideo handleGetVideo={props.handleGetVideo} />
        </Grid>

        {/* <SelectField
          name={checkThrow.name}
          label={checkThrow.label}
          data={checkthrow}
          fullWidth
        /> */}
      </Grid>
    </React.Fragment>
  );
}

export default WebcamReady;
