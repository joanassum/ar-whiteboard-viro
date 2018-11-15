const mainReducer = (state = { test: "test", boardId: "", cardId: ""}, action) => {
  switch (action.type) {
    case "CHECK_TEST":
      return { ...state, test: "Checked test", testCheck: action.checkTest};
    case "SET_BOARD_ID":
      return { ...state, boardId: action.boardId};
    case "SET_CARD_ID":
      return { ...state, cardId: action.cardId};
    default:
      return state;
  }
};

export default mainReducer;
