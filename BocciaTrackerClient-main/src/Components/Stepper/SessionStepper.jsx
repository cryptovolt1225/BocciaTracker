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
import ThrowDetailsForm from "../Forms/Session/ThrowDetailsForm";
import WebcamReady from "../Forms/Session/WebcamReady";
import PostThrowParameters from "../Forms/Session/PostThrowParameters";
import validationSchemaSession from "../FormModel/validationSchemaSession";
import SessionStepperFormModel from "../FormModel/SessionStepperFormModel";
import formInitialValuesStepper from "../FormModel/formInitialValuesStepper";
import useStyles from "./styles";
import ChoosePlayer from "../Forms/Session/ChoosePlayer";
import SessionSuccess from "./SessionSuccess";
import axios from "axios";
import Success from "../Forms/Session/Success";

function SessionStepper() {
  const [getVideo, setGetVideo] = useState(null);
  const [values, setValues] = useState(null);
  const [specNext, setSpecNext] = useState(null);

  function handleGetVideo(addVideo) {
    setGetVideo(addVideo);
  }
  console.log("getvideo", getVideo);

  const steps = [
    "Choose a Player",
    "Throw Details",
    "Record Video",
    "Throw Completed",
    "Success",
  ];
  const { formId, formField } = SessionStepperFormModel;

  function _renderStepContent(step) {
    switch (step) {
      case 0:
        return <ChoosePlayer formField={formField} />;
      case 1:
        return <ThrowDetailsForm formField={formField} />;
      case 2:
        return (
          <WebcamReady
            formField={formField}
            handleGetVideo={handleGetVideo}
            getVideo={getVideo}
          />
        );
      case 3:
        return (
          <PostThrowParameters
            formField={formField}
            handleGetVideo={handleGetVideo}
          />
        );
      case 4:
        return (
          <Success formField={formField} handleGetVideo={handleGetVideo} />
        );
      default:
        return <div>Not Found</div>;
    }
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchemaSession[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    console.log("im here");
    await _sleep(1000);
    const video_name = Date.now() + "-VideoThrow";
    console.log("video_name", video_name);
    values["video_name"] = video_name;
    setValues(values);
    let result = await axios.post("http://localhost:5000/api/sessions", values);
    console.log("result", result);
    // actions.setSubmitting(false);
    // setActiveStep(activeStep + 1);

    getVideo.append("playerName", values.playerName);
    getVideo.append("ballType", values.ballType);
    getVideo.append("throwType", values.throwType);
    getVideo.append("distance", values.distance);
    getVideo.append("directionAim", values.directionAim);
    getVideo.append("distanceFromWhiteBall", values.distanceFromWhiteBall);
    getVideo.append("directionFromWhiteBall", values.directionFromWhiteBall);
    getVideo.append("video_name", values.video_name);
    console.log("get video after append", getVideo);
    fetch("http://localhost:5000/upload_files", {
      method: "POST",
      body: getVideo,
    })
      .then((d) => console.log("after post blob :>>", d))
      .catch((e) => console.log("error in post blob :>>", e));
    console.log("im her2e");
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      actions.setTouched({});
      actions.setSubmitting(false);
      setActiveStep(activeStep - 2);
    } else if (activeStep === 3) {
      _submitForm(values, actions);
      actions.setSubmitting(false);
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  function _handleFinsih() {
    setActiveStep(activeStep + 1);
  }
  console.log("active step", activeStep);

  return (
    <React.Fragment>
      <Typography component="span" variant="h4" align="center">
        Start a Training Session
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
          <SessionSuccess values={values} />
        ) : (
          <Formik
            initialValues={formInitialValuesStepper}
            // validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep)}

                <div className={classes.wrapper}>
                  {activeStep !== 0 && (
                    <Button
                      onClick={_handleBack}
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Back
                    </Button>
                  )}
                  <div className={classes.wrapper}>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      {isLastStep ? "Add Another Throw" : "Next"}
                    </Button>

                    {activeStep === 4 ? (
                      <Button
                        disabled={isSubmitting}
                        onClick={_handleFinsih}
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        Finish
                      </Button>
                    ) : (
                      <div></div>
                    )}

                    {/* {activeStep === 4 ?
                    <Button
                    disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Finish 
                    </Button> :
                    <div></div> } */}

                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
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

export default SessionStepper;
