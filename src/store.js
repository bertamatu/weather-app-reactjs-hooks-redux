import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

//---middleware
const middleware = applyMiddleware(thunk);

//---store
const store = createStore(rootReducer, middleware);

export default store;
