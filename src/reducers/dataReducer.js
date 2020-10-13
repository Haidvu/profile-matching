export const dataReducer = (state, action) => {
  switch (action.type) {
    case "TEST":
      return { ...state };

    default:
      return state;
  }
};
