export const dataReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return { ...state, profile: action.playload };
    default:
      return state;
  }
};
