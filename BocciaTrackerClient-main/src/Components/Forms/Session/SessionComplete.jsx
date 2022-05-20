import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { SelectField } from "../../FormFields";

const isTheSessionComplete = [
  {
    value: undefined,
    label: "None",
  },
  {
    value: "yesT",
    label: "Yes",
  },
  {
    value: "noT",
    label: "No",
  },
];

export default function SessionComplete(props) {
  console.log(props.blob);

  const {
    formField: { isSessionComplete },
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Is the player finished throwing?
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={isSessionComplete.name}
            label={isSessionComplete.label}
            data={isTheSessionComplete}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
