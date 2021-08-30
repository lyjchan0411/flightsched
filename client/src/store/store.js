import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
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

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
