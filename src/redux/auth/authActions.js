import axios from "axios";
import * as actionType from "./authTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../index";

export const signUpAction = (user) => {
  return (dispatch) => {
    axios
      .post(`${API_URL}/auth/signup`, user)
      .then((token) => {
        localStorage.setItem("token", token.data);

        dispatch({
          type: actionType.SIGNUP_SUCCESS,
          token: token.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const signInAction = (username, password) => {
  return (dispatch) => {
    axios
      .post(`${API_URL}/auth/login`, { username, password })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", JSON.stringify(response.data));
          window.location.href = "/addTask";
        }
        dispatch({
          type: actionType.SIGNIN_SUCCESS,
          token: response.data,
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          toast.error("Incorect UserName or Password");
        } else if (error.response.status === 400) {
          window.alert("Login Failed");
        }
      });
  };
};
export const signOut = () => {
  window.location.href = "/";
  return {
    type: actionType.SIGN_OUT,
  };
};
