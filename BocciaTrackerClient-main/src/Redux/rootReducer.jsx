const initState = {
  form: null,
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case "ADDVIDEO":
      return {
        form: action.payload,
      };
    default:
      break;
  }
  return state;
}
