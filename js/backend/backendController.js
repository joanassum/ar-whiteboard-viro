const url = "http://ec2-35-177-195-223.eu-west-2.compute.amazonaws.com:8080";
let boardId = "SkS6g4qa";

export function setBoardID(newBoardID){
  boardId = newBoardID;
}

export function getLabels() {
  return fetch(`${url}/trello/getLabels/${boardId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getBoardName() {
  return fetch(`${url}/trello/getBoardName/${boardId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getBoard(){
    return fetch(`${url}/trello/getBoard/SkS6g4qa`)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

export function getBoardById(boardId){
    return fetch(`${url}/trello/getBoard/${boardId}`)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

export function getListIds() {
  return fetch(`${url}/trello/getListIds/${boardId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getList(listId) {
  return fetch(`${url}/trello/getList/${listId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getListName(listId) {
  return fetch(`${url}/trello/getListName/${listId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}


export function getFilteredList(labelId, listId) {
  return fetch(`${url}/trello/getFilteredList/${boardId}/${labelId}/${listId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getFilteredListMap(localBoardId, labelId) {
  return fetch(`${url}/trello/getFilteredListMap/${boardId}/${labelId}`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getFilteredCardMap(listId, labelId) {
  return fetch(`${url}/trello/getFilteredCardMap/${listId}/${labelId}`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}




export function getCardHistory(cardId){
    return fetch(`${url}/trello/getCardHistory/${cardId}`)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

export function getPerformanceGraph(boardId){
    return fetch(`${url}/trello/getPerformanceGraph/${boardId}`)
        .then((response) => response.text())
        .then((response) => `${url}/${response}`)
        .catch((error) => {
            console.error(error);
        });
}

export function getTimeLineGraph(cardId){
    return fetch(`${url}/trello/getTimelineGraph/${cardId}`)
        .then((response) => response.text())
        .then((response) => `${url}/${response}`)
        .catch((error) => {
            console.error(error);
        });
}

export function getCardMembers(cardId) {
    return fetch(`${url}/trello/getCardMembers/${cardId}`)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

export function getCheckLists(cardId) {
    return fetch(`${url}/trello/getCardChecklists/${cardId}`)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

export function getBoardIdMapping(boardPin){
  console.log("GET BoARD ID MAPPING");
  return fetch(`${url}/queriesDB/getBoardMapping/${boardPin}`)
    .then((response) => response.text())
    .catch((error) => {
      console.error(error);
    });
}
