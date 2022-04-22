import * as actionType from "./taskTypes";
import axios from "axios";
import { API_URL } from "../index";

export const AddTaskAction = (inputs) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.ADD_TASK_REQUEST,
    });
    const { data } = await axios.post(`${API_URL}/addTask`, inputs);
    dispatch({
      type: actionType.ADD_TASK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.ADD_TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchTaskAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/fetchTask`);
    dispatch({
      type: actionType.FETCH_TASK,
      payload: data,
    });
  } catch (error) {
    console.error(error.response.message);
  }
};
