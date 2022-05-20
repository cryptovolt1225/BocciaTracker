import * as Yup from "yup";
import SessionStepperFormModel from "./SessionStepperFormModel";
const {
  formField: {
    playerName,
    throwType,
    ballType,
    distance,
    directionAim,
    // checkThrow,
    directionFromWhiteBall,
    distanceFromWhiteBall,
  },
} = SessionStepperFormModel;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  Yup.object().shape({
    [playerName.name]: Yup.string()
      .nullable()
      .required(`${playerName.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [throwType.name]: Yup.string()
      .nullable()
      .required(`${throwType.requiredErrorMsg}`),
    [ballType.name]: Yup.string()
      .nullable()
      .required(`${ballType.requiredErrorMsg}`),
    [distance.name]: Yup.string()
      .nullable()
      .required(`${distance.requiredErrorMsg}`),
    [directionAim.name]: Yup.string()
      .nullable()
      .required(`${directionAim.requiredErrorMsg}`),
  }),
  // Yup.object().shape({
  //   [checkThrow.name]: Yup.string()
  //     .nullable()
  //     .required(`${checkThrow.requiredErrorMsg}`),
  // }),
  Yup.object().shape({
    [directionFromWhiteBall.name]: Yup.string()
      .nullable()
      .required(`${directionFromWhiteBall.requiredErrorMsg}`),
    [distanceFromWhiteBall.name]: Yup.string()
      .nullable()
      .required(`${distanceFromWhiteBall.requiredErrorMsg}`),
  }),
];
