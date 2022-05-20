import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { SelectField } from "../../FormFields";

const typeOfThrow = [
  {
    value: "underarm",
    label: "Underarm",
  },
  {
    value: "underarm-extension",
    label: "Underarm Extension",
  },
  {
    value: "upperarm",
    label: "Upperarm",
  },
];

const typeOfBall = [
  {
    value: "super-soft",
    label: "Super-Soft",
  },
  {
    value: "soft",
    label: "Soft",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "medium-hard",
    label: "Medium-Hard",
  },
  {
    value: "hard",
    label: "Hard",
  },
];

const distanceThrown = [
  {
    value: "short",
    label: "Short (1.5m)",
  },
  {
    value: "medium",
    label: "Medium (5m)",
  },
  {
    value: "long",
    label: "Long (9m)",
  },
];

const directionAimData = [
  {
    value: "left",
    label: "Left",
  },
  {
    value: "right",
    label: "Right",
  },
  {
    value: "center",
    label: "Center",
  },
];
export default function ThrowDetailsForm(props) {
  const {
    formField: { throwType, ballType, distance, directionAim },
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Throw Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={throwType.name}
            label={throwType.label}
            data={typeOfThrow}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={ballType.name}
            label={ballType.label}
            data={typeOfBall}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={distance.name}
            label={distance.label}
            data={distanceThrown}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={directionAim.name}
            label={directionAim.label}
            data={directionAimData}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
