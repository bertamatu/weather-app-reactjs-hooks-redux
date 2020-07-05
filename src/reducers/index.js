import { combineReducers } from "redux";
import weatherReducer from "./weatherReducer";

const rootReducer = combineReducers({
  weatherReducer,
});

export default rootReducer;
