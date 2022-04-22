import * as actionType from "./authTypes";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
const initialStates = {
  token: localStorage.getItem("token"),
  names: null,
  email: null,
  id: null,
};

export const authReducer = (state = initialStates, action) => {
  switch (action.type) {
    case actionType.SIGNUP_SUCCESS:
    case actionType.SIGNIN_SUCCESS:
      const user = jwtDecode(action.token);
      return {
        ...initialStates,
        token: action.token,
        email: user.email,
        id: user.id,
      };
    case actionType.SIGN_OUT:
      localStorage.removeItem("token");
      toast("Signed Out!!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      return {
        ...initialStates,
        token: null,
        names: null,
        email: null,
      };
    default:
      return state;
  }
};
