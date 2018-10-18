'use strict';

import React, { Component } from 'react';
import {
  ViroNode,
  ViroText
} from 'react-viro';


class ARTrelloCard extends Component {

  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {
    return (
      <ViroNode
        position={[0, -0.5, 0]}
      >
        <ViroText
          text="Card Name"
          position={[0, 0, 0]}
        />
      </ViroNode>
    );
  }
}

module.exports = ARTrelloCard;