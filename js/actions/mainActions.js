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