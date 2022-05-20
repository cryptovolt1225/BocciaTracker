import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { InputField } from "../../FormFields";

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

export default function PlayerGeneralInfo(props) {
  // console.log("coach id" , props.coach?.coach?._id);

  const classes = useStyle();
  const {
    formField: { playerFullName, playerEmail, playerPhone },
  } = props;
  return (
    <React.Fragment>
      <Typography className={classes.basicDetails}>
        General Player Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <InputField
            name={playerFullName.name}
            label={playerFullName.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={playerEmail.name}
            label={playerEmail.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={playerPhone.name}
            label={playerPhone.label}
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={12}>
          <InputField name={playerDiagnosis.name} label={playerDiagnosis.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={playerClassification.name}
            label={playerClassification.label}
            data={cities}
            fullWidth
          />
        </Grid> */}
        <Grid item xs={12}>
          {/* <CheckboxField
            name={useAddressForPaymentDetails.name}
            label={useAddressForPaymentDetails.label}
          /> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
