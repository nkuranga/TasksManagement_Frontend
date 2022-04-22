import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { fetchAssigneeReducer } from "./assignees/assignReducer";
import { taskReducer, fetchTaskReducer } from "./task/taskReducer";
import { fetchProjectReducer } from "./project/projectReducer";
import { authReducer } from "./auth/authReducers";

const reducer = combineReducers({
  getAssingees: fetchAssigneeReducer,
  addTask: taskReducer,
  getProjects: fetchProjectReducer,
  auth: authReducer,
  fetchTasks: fetchTaskReducer,
});

const middleWare = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;
