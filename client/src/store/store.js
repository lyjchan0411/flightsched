import { createStore, combineReducers } from "redux";
import { usersReducer, selectUserReducer } from "../reducers/usersReducer";
import { planesReducer } from "../reducers/planesReducer";
import { sidebarToggleReducer } from "../reducers/toggleReducers";

const allReducer = combineReducers({
  users: usersReducer,
  user: selectUserReducer,
  planes: planesReducer,
  sidebarToggle: sidebarToggleReducer,
});

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
