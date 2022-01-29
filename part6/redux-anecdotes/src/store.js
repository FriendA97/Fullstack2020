import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as anecdoteReducer } from "./reducers/anecdoteReducer";
import { reducer as notiReducer } from "./reducers/notificationReducer";
import { reducer as filterReducer } from "./reducers/filterReducer";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  noti: notiReducer,
  filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
