const mainReducer = (state = {
  test: "test",
  labelID: "none",
  labelName: "",
  labelSet: false,
  boardId: "",
  titlePicked: false,
  listID: "",
  listSet: false,
  cardId: "None",
  menuTitle: "",
  cardChosen: false,
  option: "Main Menu",
}, action) => {
  switch (action.type) {
    case "CHECK_TEST":
      return { ...state, test: "Checked test", testCheck: action.checkTest};
    case "SET_BOARD_ID":
      return { ...state, boardId: action.boardId};
    case "UNSET_CARD_ID":
      return { ...state, cardChosen: false};
    case "SET_CARD_ID":
      return { ...state, cardId: action.cardId, cardChosen: true};
    case "SET_MENU_TITLE":
      return { ...state, menuTitle: action.menuTitle, titlePicked: true};
    case "SET_LIST_ID":
      return { ...state, listID: action.listID, listSet: true};
    case "SET_LABEL_ID":
      return { ...state, labelID: action.labelID, labelSet: true};
    case "SET_LABEL_NAME":
      return { ...state, labelName: action.labelName, labelSet: true};
    case "SET_MENU_OPTION":
      return { ...state, option: action.option};
    default:
      return state;
  }
};

export default mainReducer;
