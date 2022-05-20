/* eslint-disable import/no-anonymous-default-export */
export default {
  formId: "SessionStepperFormModel",
  formField: {
    playerName: {
      name: "playerName",
      label: "Choose a player!*",
      requiredErrorMsg: "You must choose a player to continue",
    },
    throwType: {
      name: "throwType",
      label: "Type of Throw*",
      requiredErrorMsg: "Type of throw is required",
    },
    ballType: {
      name: "ballType",
      label: "Type of Ball*",
      requiredErrorMsg: "Type of ball is required",
    },
    distance: {
      name: "distance",
      label: "Distance*",
      requiredErrorMsg: "Distance is required",
    },
    directionAim: {
      name: "directionAim",
      label: "Direction Aimed At:*",
      requiredErrorMsg: "Direction is required",
    },
    // checkThrow: {
    //   name: "checkThrow",
    //   label: "Is throw ready to be sent?*",
    //   requiredErrorMsg: "Throw video must be ready",
    // },
    directionFromWhiteBall: {
      name: "directionFromWhiteBall",
      label: "Direction from target ball*",
      requiredErrorMsg: "Please choose a direction",
    },
    distanceFromWhiteBall: {
      name: "distanceFromWhiteBall",
      label: "Distance to target ball in meters*",
      requiredErrorMsg: "Please enter a distance",
    },
  },
};
