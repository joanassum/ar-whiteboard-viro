const url = "http://ec2-35-177-195-223.eu-west-2.compute.amazonaws.com:8080";
let boardId = "SkS6g4qa";

export function setBoardID(newBoardID){
  boardId = newBoardID;
}

export function getLabels() {
  //console.log("getLabels");
  return fetch(`${url}/trello/getLabels/${boardId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getBoardName(boardIdParam) {
  //console.log("getBoardName");
  return fetch(`${url}/trello/getBoardName/${boardIdParam}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getBoard(){
  //console.log("getBoard");
    return fetch(`${url}/trello/getBoard/SkS6g4qa`)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

export function getBoardById(boardId){
  //console.log("getBoardById: " + boardId);
    return fetch(`${url}/trello/getBoard/${boardId}`)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

export function getListIds() {
  //console.log("getListIds");
  return fetch(`${url}/trello/getListIds/${boardId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getList(listId) {
  //console.log("getList");
  return fetch(`${url}/trello/getList/${listId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getListName(listId) {
  //console.log("getListName");
  return fetch(`${url}/trello/getListName/${listId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}


export function getFilteredList(labelId, listId) {
  //console.log("getFilteredList");
  return fetch(`${url}/trello/getFilteredList/${boardId}/${labelId}/${listId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getFilteredListMap(localBoardId, labelId) {
  //console.log("getFilteredListMap: " + localBoardId);
  return fetch(`${url}/trello/getFilteredListMap/${boardId}/${labelId}`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getFilteredCardMap(listId, labelId) {
  console.log("getFilteredCardMap: " + listId + " labelID: " + labelId);
  return fetch(`${url}/trello/getFilteredCardMap/${listId}/${labelId}`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getCardHistory(cardId){
  //console.log("getCardHistory: " + cardId);
    return fetch(`${url}/trello/getCardHistory/${cardId}`)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

export function getPerformanceGraph(boardId){
  //console.log("getPerformanceGraph");
    return fetch(`${url}/trello/getPerformanceGraph/${boardId}`)
        .then((response) => response.text())
        .then((response) => `${url}/${response}`)
        .catch((error) => {
            console.error(error);
        });
}

export function getTimeLineGraph(cardId){
  //console.log("getTimeLineGraph");
    return fetch(`${url}/trello/getTimelineGraph/${cardId}`)
        .then((response) => response.text())
        .then((response) => `${url}/${response}`)
        .catch((error) => {
            console.error(error);
        });
}


export function getBoardIdMapping(boardPin){
  //console.log("getBoardIdMapping");
  return fetch(`${url}/queriesDB/getBoardMapping/${boardPin}`)
    .then((response) => response.text())
    .catch((error) => {
      console.error(error);
    });
}

export function getCardMembers(cardId) {
  //console.log("getCardMembers");
  return fetch(`${url}/trello/getCardMembers/${cardId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getCheckLists(cardId) {
  //console.log("getCheckLists");
  return fetch(`${url}/trello/getCardChecklists/${cardId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}