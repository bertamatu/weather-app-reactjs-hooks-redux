import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import weatherReducer from "../reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

//---middleware
const middleware = applyMiddleware(thunk);

const composeEnhancers = composeWithDevTools(middleware);

//---store
const store = createStore(weatherReducer, composeEnhancers);

export default store;

//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
