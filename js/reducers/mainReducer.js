const mainReducer = (state = { test: "test", boardId: "" }, action) => {
  switch (action.type) {
    case "CHECK_TEST":
      return { ...state, test: "Checked test", testCheck: action.checkTest};
    case "SET_BOARD_ID":
      return { ...state, boardId: action.boardId};
    default:
      return state;
  }
};

export default mainReducer;
