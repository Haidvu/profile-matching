export const dataReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      console.log(action.playload);
      return { ...state };

    default:
      return state;
  }
};
