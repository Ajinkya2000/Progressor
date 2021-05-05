import createDataContext from "./createDataContext";
import progressor from "../api/progressor";

const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH":
      return { ...state, user: action.payload };
    case "ADD_AUTH_ERROR":
      return { ...state, errors: action.payload };
    case "REMOVE_AUTH_ERROR":
      return { ...state, errors: "" };
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({ email, password, name }, callback) => {
    try {
      const res = await progressor.post("register/", { email, password, name });
      localStorage.setItem("token", res.data.token);

      dispatch({
        type: "AUTH",
        payload: res.data,
      });

      if (res.status === 201 || res.status === 200) {
        callback();
      }
    } catch (err) {
      if (err.response.data) {
        dispatch({
          type: "ADD_AUTH_ERROR",
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: "ADD_AUTH_ERROR",
          payload: ["Something went wrong with signup!"],
        });
      }
    }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }, callback) => {
    try {
      const res = await progressor.post("login/", { email, password });
      localStorage.setItem("token", res.data.token);

      dispatch({
        type: "AUTH",
        payload: res.data,
      });

      if (res.status === 200) {
        callback();
      }
    } catch (err) {
      dispatch({
        type: "ADD_AUTH_ERROR",
        payload: err.response.data,
      });
    }
  };
};

const removeAuthError = (dispatch) => {
  return () => {
    dispatch({
      type: "REMOVE_AUTH_ERROR",
    });
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, removeAuthError },
  {}
);
