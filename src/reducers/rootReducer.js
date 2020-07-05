import { combineReducers } from "redux";
// import { weatherInfo } from "./weatherReducer";
import weatherInfo from "./weatherReducer";

const rootReducer = combineReducers({
  WeatherInfo: weatherInfo,
});

export default rootReducer;
