import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducers";

//---middleware
const middleware = applyMiddleware(thunk);

//---store
const store = createStore(rootReducer, middleware);

export default store;

//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
