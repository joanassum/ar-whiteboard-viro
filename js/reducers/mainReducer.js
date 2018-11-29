const mainReducer = (state = {
  test: "test",
  labelID: "none",
  labelName: "",
  labelSet: false,
  boardId: "5bbb7e4006d2af393fc53e4d",
  boardName: "WeWeregonnatest",
  titlePicked: false,
  listID: "",
  listSet: false,
  cardId: "None",
  menuTitle: "",
  cardChosen: false,
  boardMetricChosen: false,
  option: "Main Menu",
  overDueFlag: false,
  currentMemberID: "5a6c7351d9f2320d569e9c58",
  currentMemberName: "athi16",
}, action) => {
  switch (action.type) {
    case "CHECK_TEST":
      return { ...state, test: "Checked test", testCheck: action.checkTest};
    case "SET_BOARD_ID":
      return { ...state, boardId: action.boardId};
    case "SET_BOARD_NAME":
      return { ...state, boardName: action.boardName};
    case "UNSET_CARD_ID":
      return { ...state, cardChosen: false};
    case "SET_CARD_ID":
      return { ...state, cardId: action.cardId, cardChosen: true};
    case "SET_GRAPH_TYPE":
      return { ...state, graphType: action.graphType};
    case "UNSET_BOARD_METRIC":
      return { ...state, boardMetricChosen: false};
    case "SET_OVERDUE_FLAG":
      return { ...state, overDueFlag: action.flag};
    case "SET_BOARD_METRIC":
      return { ...state, boardMetricChosen: true};
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
