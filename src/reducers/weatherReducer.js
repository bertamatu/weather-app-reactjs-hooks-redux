// const weatherReducer = (
//   state = {
//     weatherInfo: [],
//   },
//   action
// ) => {
//   if (action.type === "FETCH_WEATHER") {
//     state = { ...state, weatherInfo: action.payload };
//     console.log("wReducer return state >>>>>", state);
//   }

//   return state;
// };
// export default weatherReducer;

const weatherReducer = (state = { weatherInfo: [] }, action) => {
  switch (action.type) {
    case "FETCH_WEATHER_DATA":
      return (state = { ...state, weatherInfo: action.payload });
    default:
      return state;
  }
};

export default weatherReducer;
