import { combineReducers } from "redux";
import weatherInfo from "./weatherReducer";

const rootReducer = combineReducers({
  weatherInfo,
});

export default rootReducer;
