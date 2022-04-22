import * as actionType from "./projectTypes";

export const fetchProjectReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case actionType.GET_PROJECT_REQUEST:
      return {
        loading: true,
        projects: [],
      };
    case actionType.GET_PROJECT_SUCESS:
      return {
        loading: false,
        projects: action.payload,
      };
    case actionType.GET_PROJECT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
