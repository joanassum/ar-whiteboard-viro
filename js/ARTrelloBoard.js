'use strict';

import React, {Component} from 'react';
import {
  ViroText,
  ViroNode
} from 'react-viro';
import ARTrelloList from "./ARTrelloList.js";


class ARTrelloBoard extends Component {

  constructor() {
    super();

    this.state = {
      text: "Loading...",
      listIds: []
    };

  }

  componentDidMount() {
    fetch('http://ec2-35-178-8-185.eu-west-2.compute.amazonaws.com:8080/trello/getBoardName/SkS6g4qa')
      .then((response) => {
        response.json().then(body => this.setState({
          text: body._value,
        }));
      })
      .catch((error) => {
        console.error(error);
      });

    fetch('http://ec2-35-178-8-185.eu-west-2.compute.amazonaws.com:8080/trello/getListIds/SkS6g4qa')
      .then((response) => {
        response.json().then(body => this.setState({
          listIds: body,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <ViroNode
        position={[2, 0, -5]}
      >
        <ViroText
          text={"Board Name"}
        />
        {
          this.state.listIds.map ( (n, i) => {
            return <ARTrelloList listPosition={[(2 *(i + 1)), -0.5, 0]} listId={this.state.listIds[i]}/>
          })
        }
      </ViroNode>
    );
  }
}

module.exports = ARTrelloBoard;
//
// [{
//   "name": "Sprint 1",
//   "cards": [{
//     "id": "5bbb7e69a4d5a5087b15d4b9",
//     "name": "Dummy test 1",
//     "desc": "description 1",
//     "labels": []
//   }, {
//     "id": "5bbb7e7179dbc3195a25b5c4",
//     "name": "Dummy test 3",
//     "desc": "description 3",
//     "labels": [{
//       "id": "5bc639327dab8021e0a7cd30",
//       "idBoard": "5bbb7e4006d2af393fc53e4d",
//       "name": "Red ALert",
//       "color": "sky"
//     }]
//   }]
// }, {
//   "name": "Doing",
//   "cards": [{
//     "id": "5bc3bc79b5ee6e38818fa29d",
//     "name": "Hi",
//     "desc": "this is me, your inner consciousness",
//     "labels": [{
//       "id": "5bbb7e409c16fb124af1f73c",
//       "idBoard": "5bbb7e4006d2af393fc53e4d",
//       "name": "labelnameyellow",
//       "color": "yellow"
//     }]
//   }, {
//     "id": "5bbb7e6e9eda7486d4933698",
//     "name": "Dummy test 2",
//     "desc": "description 2",
//     "labels": [{
//       "id": "5bbb7e409c16fb124af1f73d",
//       "idBoard": "5bbb7e4006d2af393fc53e4d",
//       "name": "",
//       "color": "red"
//     }, {"id": "5bc639327dab8021e0a7cd30", "idBoard": "5bbb7e4006d2af393fc53e4d", "name": "Red ALert", "color": "sky"}]
//   }]
// }, {"name": "Code review", "cards": []}, {"name": "Functional review", "cards": []}, {"name": "Done", "cards": []}]