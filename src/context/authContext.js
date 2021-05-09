import createDataContext from "./createDataContext";
import progressor from "../api/progressor";

const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH":
      return { ...state, user: action.payload };
    case "SIGN_OUT":
      return { ...state, user: null };
    case "ADD_AUTH_ERROR":
      return { ...state, errors: action.payload };
    case "REMOVE_AUTH_ERROR":
      return { ...state, errors: "" };
    case "ADD_HANDLE_DATA":
      return { ...state, handleData: action.payload };
    case "GET_USER_FROM_TOKEN":
      return { ...state, user: action.payload };
    case "UPDATE_USER_HANDLE_STATUS":
      return { ...state, user: { handle_verified: true } };
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

const signout = (dispatch) => {
  return (callback) => {
    localStorage.removeItem("token");
    dispatch({
      type: "SIGN_OUT",
    });
    callback();
  };
};

const removeAuthError = (dispatch) => {
  return () => {
    dispatch({
      type: "REMOVE_AUTH_ERROR",
    });
  };
};

const addHandleData = (dispatch) => {
  return async ({ platform, handle }, callback) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      let res;
      if (platform === "gfg") {
        res = await progressor.post("gfg/", { gfg_handle: handle }, config);
      } else {
        res = await progressor.post(
          "leetcode/",
          { leetcode_handle: handle },
          config
        );
      }
      dispatch({
        type: "ADD_HANDLE_DATA",
        payload: res.data.data,
      });

      dispatch({
        type: "UPDATE_USER_HANDLE_STATUS",
      });

      callback();
    } catch (err) {
      dispatch({
        type: "ADD_AUTH_ERROR",
        payload: err.response.data,
      });
    }
  };
};

const getUserFromToken = (dispatch) => {
  return async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await progressor.get("user/", config);
      dispatch({
        type: "GET_USER_FROM_TOKEN",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "ADD_AUTH_ERROR",
        payload: { error: [`${err.response.data.detail}, Please Sign in Again!!`] },
      });
    }
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, removeAuthError, addHandleData, getUserFromToken },
  { user: null, errors: "", handleData: null },
  "Auth Context"
);
