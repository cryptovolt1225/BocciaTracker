import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { SelectField, InputField } from "../../FormFields";

const directionParameters = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
  {
    value: "6",
    label: "6",
  },
  {
    value: "7",
    label: "7",
  },
  {
    value: "8",
    label: "8",
  },
  {
    value: "9",
    label: "9",
  },
  {
    value: "10",
    label: "10",
  },
  {
    value: "11",
    label: "11",
  },
  {
    value: "12",
    label: "12",
  },
];

export default function PostThrowParameters(props) {
  const {
    formField: { directionFromWhiteBall, distanceFromWhiteBall },
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Score the players throw!
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <InputField
            name={distanceFromWhiteBall.name}
            label={distanceFromWhiteBall.label}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SelectField
            name={directionFromWhiteBall.name}
            label={directionFromWhiteBall.label}
            data={directionParameters}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
