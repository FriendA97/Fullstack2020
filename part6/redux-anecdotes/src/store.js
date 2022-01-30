import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as anecdoteReducer } from "./reducers/anecdoteReducer";
import { reducer as notiReducer } from "./reducers/notificationReducer";
import { reducer as filterReducer } from "./reducers/filterReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  noti: notiReducer,
  filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
