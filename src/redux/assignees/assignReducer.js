import * as actionType from "./assignType";

export const fetchAssigneeReducer = (state = { assigns: [] }, action) => {
  switch (action.type) {
    case actionType.GET_ASSIGN_REQUEST:
      return {
        loading: true,
        assigns: [],
      };
    case actionType.GET_ASSIGN_SUCESS:
      return {
        loading: false,
        assigns: action.payload,
      };
    case actionType.GET_ASSIGN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
