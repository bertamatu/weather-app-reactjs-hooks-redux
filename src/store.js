import thunk from "redux-thunk";
import { applyMiddleware, store, createStore } from "redux";
import reducer from "./reducers/rootReducer";

//---middleware
const middleware = applyMiddleware(thunk);

//---store
const Store = createStore(reducer, middleware);

export default Store;
