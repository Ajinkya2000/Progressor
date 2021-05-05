import createDataContext from "./createDataContext";
import progressor from "../api/progressor";

const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH":
      return {...state, 'user': action.payload};
    case 'ADD_AUTH_ERROR':
      return {...state, 'error': action.payload}
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

      if (res.status === 201) {
        callback();
      }
    } catch (err) {
      console.log(err);
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
      console.log(err);
    }
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin },
  {}
);
