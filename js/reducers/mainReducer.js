const mainReducer = (state = { test: "test", boardId: "", cardId: "None", menuTitle: "", viewCard: false}, action) => {
  switch (action.type) {
    case "CHECK_TEST":
      return { ...state, test: "Checked test", testCheck: action.checkTest};
    case "SET_BOARD_ID":
      return { ...state, boardId: action.boardId};
    case "SET_CARD_ID":
      return { ...state, cardId: action.cardId, viewCard: true};
    case "SET_MENU_TITLE":
      return { ...state, menuTitle: action.menuTitle};
    default:
      return state;
  }
};

export default mainReducer;
