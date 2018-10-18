'use strict';

import React, { Component } from 'react';
import {
  ViroText,
  ViroNode
} from 'react-viro';
import ARTrelloCard from "./ARTrelloCard.js";


class ARTrelloBoard extends Component {

  constructor() {
    super();

    this.state = {
      text : "Loading..."
    };

  }

  componentDidMount() {
    return fetch('http://ec2-35-178-8-185.eu-west-2.compute.amazonaws.com:8080/trello/getBoardName/SkS6g4qa')
      .then((response) => {
        response.json().then(body => this.setState({
          text: body._value,
        }));
      })
      .catch((error) =>{
        console.error(error);
      })
  }

  render() {
    return (
      <ViroNode
        position={[0, -1, -5]}
        dragType="FixedToWorld"
        onDrag={()=>{}}
      >
        <ViroText
          text={"Board Name"}
          position={[0, 0, 0]}
        />
        <ARTrelloCard />
      </ViroNode>
    );
  }
}

module.exports = ARTrelloBoard;