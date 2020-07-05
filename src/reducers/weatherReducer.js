const weatherInfo = (
  //initial state
  state = {
    weatherInfo: {},
  },
  action
) => {
  //---check the action atype
  if ((action.type = "FETCH_WEATHER")) {
    state = { ...state, weatherInfo: action.payload };
  }
  return state;
};

export default weatherInfo;
