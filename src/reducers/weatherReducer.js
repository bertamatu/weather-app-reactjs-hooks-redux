const weatherInfo = (
  //initial state
  state = {
    info: {},
  },
  action
) => {
  switch (action.type) {
    case "FETCH_WEATHER_PENDING":
      state = { ...state, pending: true };
      break;
    case "FETCH_WEATHER_SUCCESS":
      state = { ...state, info: action.payload, error: null, pending: false };
      break;
    case "FETCH_WEATHER_ERROR":
      state = { ...state, error: action.error, pending: false, info: {} };
      break;
    default:
  }
  return state;
};

export default weatherInfo;
