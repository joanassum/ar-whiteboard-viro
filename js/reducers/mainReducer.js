
const mainReducer = (state = { test: "test" }, action) => {
  switch (action.type) {
    case "CHECK_TEST":
      return { ...state, test: "Checked test", testCheck: action.checkTest};
    default:
      return state;
  }
};

export default mainReducer;
