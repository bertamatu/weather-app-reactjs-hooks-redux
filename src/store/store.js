import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import weatherReducer from "../reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = applyMiddleware(thunk);
const composeEnhancers = composeWithDevTools(middleware);
const store = createStore(weatherReducer, composeEnhancers);

export default store;
