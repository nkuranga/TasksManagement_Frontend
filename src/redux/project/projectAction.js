import * as actionType from "./projectTypes";
import { API_URL } from "../index";
import axios from "axios";

export const fecthProjectsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_PROJECT_REQUEST,
    });
    let { data } = await axios.get(`${API_URL}/fetchProjects`);
    dispatch({
      type: actionType.GET_PROJECT_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_PROJECT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
