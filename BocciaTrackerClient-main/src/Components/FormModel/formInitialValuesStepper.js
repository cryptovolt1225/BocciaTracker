import SessionStepperFormModel from "./SessionStepperFormModel";
const {
  formField: {
    throwType,
    ballType,
    distance,
    playerName,
    // checkThrow,
    directionFromWhiteBall,
    distanceFromWhiteBall,
    directionAim
  },
} = SessionStepperFormModel;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [throwType.name]: null,
  [ballType.name]: null,
  [distance.name]: null,
  [directionAim.name]: null,
  [playerName.name]: null,
  // [checkThrow.name]: null,
  [directionFromWhiteBall.name]: null,
  [distanceFromWhiteBall.name]: null,
};
