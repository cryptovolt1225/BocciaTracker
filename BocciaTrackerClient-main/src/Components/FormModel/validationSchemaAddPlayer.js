import * as Yup from "yup";
import AddPlayerFormModel from "./AddPlayerFormModel";
const {
  formField: {
    playerFullName,
    playerEmail,
    playerPhone,
    playerClassification,
    playerDiagnosis,
    coachName,
    coachID
  },
} = AddPlayerFormModel;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  Yup.object().shape({
    [playerFullName.name]: Yup.string()
      .nullable()
      .required(`${playerFullName.requiredErrorMsg}`),
    [playerEmail.name]: Yup.string()
      .nullable()
      .required(`${playerEmail.requiredErrorMsg}`),
    [playerPhone.name]: Yup.string()
      .nullable()
      .required(`${playerPhone.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [playerClassification.name]: Yup.string()
      .nullable()
      .required(`${playerClassification.requiredErrorMsg}`),
    [playerDiagnosis.name]: Yup.string()
      .nullable()
      .required(`${playerDiagnosis.requiredErrorMsg}`),
    [coachName.name]: Yup.string()
      .nullable()
      .required(`${coachName.requiredErrorMsg}`),
  }),
];
