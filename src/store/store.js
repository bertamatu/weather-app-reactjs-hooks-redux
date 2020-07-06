import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import weatherReducer from "../reducers/index";

//---middleware
const middleware = applyMiddleware(thunk);

//---store
const store = createStore(weatherReducer, middleware);

export default store;

//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
