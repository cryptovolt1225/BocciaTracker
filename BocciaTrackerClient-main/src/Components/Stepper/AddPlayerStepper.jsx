import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import AddPlayerFormModel from "../FormModel/AddPlayerFormModel";
import formInitialValuesAddPlayer from "../FormModel/formInitialValuesAddPlayer";
import useStyles from "./styles";
import AddPlayerSuccess from "./AddPlayerSuccess";
import axios from "axios";
import PlayerGeneralInfo from "../Forms/Add Player/PlayerGeneralInfo";
import validationSchemaAddPlayer from "../FormModel/validationSchemaAddPlayer";
import PlayerBocciaInfo from "../Forms/Add Player/PlayerBocciaInfo";
import AddPlayedFailed from "./AddPlayerFailed";

function AddPlayerStepper(props) {
  //   console.log(props.coach);

  const [values, setValues] = useState(null);

  const steps = ["General Details", "Boccia Game Details"];
  const { formId, formField } = AddPlayerFormModel;

  function _renderStepContent(step) {
    switch (step) {
      case 0:
        return <PlayerGeneralInfo formField={formField} coach={props.coach} />;
      case 1:
        return <PlayerBocciaInfo formField={formField} coach={props.coach} />;
      default:
        return <div>Not Found</div>;
    }
  }

  const classes = useStyles();
  const [hasError, setHasError] = useState(false);

  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchemaAddPlayer[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    console.log("values", values);
    setValues(values);
    console.log("coach id", props.coach._id);
    // values.append("coach", props.coach._id);
    let result = await axios
      .post("http://localhost:5000/api/players", values)
      .then((result) => {
        console.log("success");
        console.log("result", result);
        actions.setSubmitting(false);
        setActiveStep(activeStep + 1);
      })
      .catch((error) => {
        setHasError(true);

        console.log("error", error);
      });

    // console.log("result", result);
    // actions.setSubmitting(false);
    // setActiveStep(activeStep + 1);
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <React.Fragment>
      <Typography variant="h4" align="center">
        Add Player
      </Typography>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>

        {activeStep === steps.length ? (
          <AddPlayerSuccess values={values} />
          ) : (
            <Formik
            initialValues={formInitialValuesAddPlayer}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
            >
            {({ isSubmitting }) => (
              
              <Form id={formId}>
                {_renderStepContent(activeStep)}

                {hasError === true && <div className={classes.hasError}>Player with this email exists already!</div> }
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <div className={classes.wrapper}>
                    <Button
                      // disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      {isLastStep ? "Add Player" : "Next"}
                    </Button>
                    {/* {isSubmitting && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )} */}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </React.Fragment>
  );
}

export default AddPlayerStepper;
