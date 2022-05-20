/* eslint-disable import/no-anonymous-default-export */
export default {
  formId: "AddPlayerFormModel",
  formField: {
    playerFullName: {
      name: "playerFullName",
      label: "Enter players full name!*",
      requiredErrorMsg: "You must enter a name to continue",
    },
    playerEmail: {
      name: "playerEmail",
      label: "Enter players email address*",
      requiredErrorMsg: "You must enter an email to continue",
    },
    playerPhone: {
      name: "playerPhone",
      label: "Enter players phone number*",
      requiredErrorMsg: "You must enter a phone number to continue",
    },
    playerClassification: {
      name: "playerClassification",
      label: "What is the players classification?*",
      requiredErrorMsg: "Classification is required",
    },
    playerDiagnosis: {
      name: "playerDiagnosis",
      label: "What is the players diagnosis?*",
      requiredErrorMsg: "Diagnosis is required",
    },
    coachName: {
      name: "coachName",
      label: "Coach Name?",
      requiredErrorMsg: "Coach name is required",
    },
    coachID: {
      name: "coachID",
      label: "Use your Coach ID",
      requiredErrorMsg: "Coach ID is required",
    },
  },
};
