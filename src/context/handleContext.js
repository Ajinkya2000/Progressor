import createDataContext from "./createDataContext";
import progressor from "../api/progressor";

const handleReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const getHandleData = (dispatch) => {
    return async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        const res = await progressor.get('leetcode/', )
    }
}

export const { Provider, Context } = createDataContext(
  handleReducer,
  {},
  { handleData: null }
);
