export function checkTestAction(checkTest){
  return {
    type: "CHECK_TEST",
    checkTest
  };
}

export function setBoardId(boardId){
  return {
    type: "SET_BOARD_ID",
    boardId
  };
}

export function setCardId(cardId){
  return {
    type: "SET_CARD_ID",
    cardId
  };
}

export function unsetCardId(){
  return {
    type: "UNSET_CARD_ID",
  };
}
export function setBoardMetric(){
  return {
    type: "SET_BOARD_METRIC",
  };
}

export function unsetBoardMetric(){
  return {
    type: "UNSET_BOARD_METRIC",
  };
}

export function setMenuViewName(menuTitle){
  return {
    type: "SET_MENU_TITLE",
    menuTitle
  };
}

export function setListID(listID){
  return {
    type: "SET_LIST_ID",
    listID,
  };
}

export function setGraphType(graphType){
  return {
    type: "SET_GRAPH_TYPE",
    graphType,
  };
}

export function setMenuOption(option){
  return {
    type: "SET_MENU_OPTION",
    option
  };
}

export function setLabelID(labelID){
  return {
    type: "SET_LABEL_ID",
    labelID
  };
}

export function setLabelName(labelName){
  return {
    type: "SET_LABEL_NAME",
    labelName
  };
}