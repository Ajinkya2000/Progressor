import createDataContext from "./createDataContext";

const utilsReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_AUTH_LOADING":
      return { ...state, showAuthLoading: true };
    case "HIDE_AUTH_LOADING":
      return { ...state, showAuthLoading: false };
    case "SHOW_LOADING":
      return { ...state, showButtonLoading: true };
    case "HIDE_LOADING":
      return { ...state, showButtonLoading: false };
    default:
      return state;
  }
};

const showLoadingButton = (dispatch) => () =>
  dispatch({
    type: "SHOW_LOADING",
  });

const hideLoadingButton = (dispatch) => () =>
  dispatch({
    type: "HIDE_LOADING",
  });

const showAuthLoadingScreen = (dispatch) => () =>
  dispatch({
    type: "SHOW_AUTH_LOADING",
  });

const hideAuthLoadingScreen = (dispatch) => () =>
  dispatch({
    type: "HIDE_AUTH_LOADING",
  });

export const { Provider, Context } = createDataContext(
  utilsReducer,
  {
    showLoadingButton,
    hideLoadingButton,
    showAuthLoadingScreen,
    hideAuthLoadingScreen,
  },
  { showButtonLoading: false, showAuthLoading: true }
);
