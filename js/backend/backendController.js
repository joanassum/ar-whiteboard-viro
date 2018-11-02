const url = "http://ec2-18-130-143-129.eu-west-2.compute.amazonaws.com:8080";

export function getLabels() {
  return fetch(`${url}/trello/getLabels/SkS6g4qa`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getBoardName() {
  return fetch(`${url}/trello/getBoardName/SkS6g4qa`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getListIds() {
  return fetch(`${url}/trello/getListIds/SkS6g4qa`)
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

//getFilteredList/:boardId/:labelId/:listId
export function getFilteredList(labelId, listId) {
  return fetch(`${url}/trello/getFilteredList/SkS6g4qa/${labelId}/${listId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

//http://ec2-18-130-143-129.eu-west-2.compute.amazonaws.com:8080/trello/getFilteredList/SkS6g4qa/5bbb7e409c16fb124af1f747/5bbb7e51f0eed077f49e9454
//http://ec2-18-130-143-129.eu-west-2.compute.amazonaws.com:8080/trello/getPerformanceGraph/SkS6g4qa


// [{
//   "name": "Dummy test 2 (changed name)",
//   "desc": "description 2",
//   "id": "5bbb7e6e9eda7486d4933698",
//   "labels": [{"id": "5bbb7e409c16fb124af1f747", "idBoard": "5bbb7e4006d2af393fc53e4d", "name": "", "color": "red"}]
// }, {
//   "name": "Dummy test 3",
//   "desc": "description 3",
//   "id": "5bbb7e7179dbc3195a25b5c4",
//   "labels": [{
//     "id": "5bc639327dab8021e0a7cd30",
//     "idBoard": "5bbb7e4006d2af393fc53e4d",
//     "name": "Red ALert",
//     "color": "sky"
//   }, {"id": "5bbb7e409c16fb124af1f747", "idBoard": "5bbb7e4006d2af393fc53e4d", "name": "", "color": "red"}]
// }]
// //
// [{
//   "id": "5bbb7e6e9eda7486d4933698",
//   "name": "Dummy test 2 (changed name)",
//   "desc": "description 2",
//   "labels": [{"id": "5bbb7e409c16fb124af1f747", "idBoard": "5bbb7e4006d2af393fc53e4d", "name": "", "color": "red"}]
// }, {
//   "id": "5bbb7e7179dbc3195a25b5c4",
//   "name": "Dummy test 3",
//   "desc": "description 3",
//   "labels": [{
//     "id": "5bc639327dab8021e0a7cd30",
//     "idBoard": "5bbb7e4006d2af393fc53e4d",
//     "name": "Red ALert",
//     "color": "sky"
//   }, {"id": "5bbb7e409c16fb124af1f747", "idBoard": "5bbb7e4006d2af393fc53e4d", "name": "", "color": "red"}]
// }]