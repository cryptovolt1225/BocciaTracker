import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { InputField, SelectField, CheckboxField } from "../../FormFields";

const useStyle = makeStyles((theme) => ({
  basicDetails: {
    color: "#303264",
    background: "#E9F0F8",
    height: "2em",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    fontWeight: "bold",
    marginBottom: "2em",
    // marginLeft: '10px',
  },
}));
const classification = [
  {
    value: undefined,
    label: "None",
  },
  {
    value: "BC1",
    label: "BC1",
  },
  {
    value: "BC2",
    label: "BC2",
  },
  {
    value: "BC3",
    label: "BC3",
  },
  {
    value: "BC4",
    label: "BC4",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export default function PlayerBocciaInfo(props) {
  const classes = useStyle();

  console.log("props.coach", props.coach);
  const {
    formField: { playerClassification, playerDiagnosis, coachName, coachID },
  } = props;
  return (
    <React.Fragment>
      <Typography className={classes.basicDetails}>
        Game Related Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={playerClassification.name}
            label={playerClassification.label}
            data={classification}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={playerDiagnosis.name}
            label={playerDiagnosis.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={coachName.name} label={coachName.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={coachID.name}
            label={coachID.label}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
