'use strict';

import React, {Component} from 'react';
import {
  ViroNode,
  ViroText
} from 'react-viro';

class ARTrelloCard extends Component {

  constructor() {
    super();

    this.state = {
      cardPosition: [0, -0.5, 0],
      cardInfo: {}
    };
  }

  componentDidMount() {

    this.setState({
      cardPosition: this.props.cardPosition,
      cardInfo: this.props.cardInfo
    });
  }

  render() {
    return (
      <ViroNode
        position={this.state.cardPosition}
      >
        <ViroText
          text={this.state.cardInfo.name}
        />
      </ViroNode>
    );
  }
}
module.exports = ARTrelloCard;