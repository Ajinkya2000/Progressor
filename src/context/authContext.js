import createDataContext from "./createDataContext";
import progressor from "../api/progressor";

const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP":
      return action.payload;
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({ email, password, name }) => {
    try {
      const res = await progressor.post("register/", { email, password, name });
      localStorage.setItem("token", res.data.token);

      dispatch({
        type: "SIGNUP",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup },
  {}
);
