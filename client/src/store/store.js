import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  usersReducer,
  selectUserReducer,
  instructorRoleReducer,
} from "../reducers/usersReducer";
import { planesReducer } from "../reducers/planesReducer";
import { sidebarToggleReducer } from "../reducers/toggleReducers";

const allReducer = combineReducers({
  users: usersReducer,
  user: selectUserReducer,
  planes: planesReducer,
  instructors: instructorRoleReducer,
  sidebarToggle: sidebarToggleReducer,
});

const store = createStore(
  allReducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

export default store;
