import AddPlayerFormModel from "./AddPlayerFormModel";
const {
  formField: {
    playerFullName,
    playerEmail,
    playerPhone,
    playerClassification,
    coachName,
    playerDiagnosis,
    coachID
  },
} = AddPlayerFormModel;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [playerFullName.name]: null,
  [playerEmail.name]: null,
  [playerPhone.name]: null,
  [playerClassification.name]: null,
  [playerDiagnosis.name]: null,
  [coachName.name]: "Will H",
  [coachID.name]: "62849fbcd7ee60c47cd61910",

};
