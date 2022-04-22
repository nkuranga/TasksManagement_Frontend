import * as actionType from "./taskTypes";
import { toast } from "react-toastify";

let initialState = {
  loading: false,
  error: false,
  succes: false,
  name: "",
  startdate: "",
  enddate: "",
  assign_id: "",
  project_id: "",
  description: "",
  priority: "",
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionType.ADD_TASK_SUCCESS:
      toast.success("TaskAdded", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return {
        ...state,
        succes: true,
        loading: false,
        error: false,
        name: "",
        startdate: "",
        enddate: "",
        assign_id: "",
        project_id: "",
        description: "",
        priority: "",
      };
    case actionType.ADD_TASK_FAIL:
      return {
        ...state,
        error: action.payload.data,
        loading: false,
        succes: false,
      };

    default:
      return state;
  }
};
export const fetchTaskReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case actionType.FETCH_TASK:
      return {
        tasks: action.payload,
      };
    default:
      return state;
  }
};
