const url = "http://ec2-18-130-143-129.eu-west-2.compute.amazonaws.com:8080";

export function getLabels (){
  return fetch(`${url}/trello/getLabels/SkS6g4qa`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getBoardName(){
  return fetch(`${url}/trello/getBoardName/SkS6g4qa`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getListIds(){
  return fetch(`${url}/trello/getListIds/SkS6g4qa`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getList(listId){

  return fetch(`${url}/trello/getList/${listId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getListName(listId){
  return fetch(`${url}/trello/getListName/${listId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

//http://ec2-18-130-143-129.eu-west-2.compute.amazonaws.com:8080/trello/getPerformanceGraph/SkS6g4qa
export function getPerformanceGraph(boardId){
    return fetch(`${url}/trello/getPerformanceGraph/SkS6g4qa`)
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