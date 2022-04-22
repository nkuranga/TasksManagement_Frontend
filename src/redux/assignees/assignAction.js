import * as actionType from "./assignType";
import { API_URL } from "../index";
import axios from "axios";

export const fecthAssignAction = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_ASSIGN_REQUEST,
    });
    let { data } = await axios.get(`${API_URL}/fetchAssignees`);
    dispatch({
      type: actionType.GET_ASSIGN_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_ASSIGN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
