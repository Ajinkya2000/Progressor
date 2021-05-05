import createDataContext from "./createDataContext";

const utilsReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_LOADING":
      return { ...state, showAuthLoading: true };
    case "HIDE_LOADING":
      return { ...state, showAuthLoading: false };
    default:
      return state;
  }
};

const showLoading = (dispatch) => () =>
  dispatch({
    type: "SHOW_LOADING",
  });

const hideLoading = (dispatch) => () =>
  dispatch({
    type: "HIDE_LOADING",
  });

export const { Provider, Context } = createDataContext(
  utilsReducer,
  { showLoading, hideLoading },
  { showAuthLoading: false }
);
