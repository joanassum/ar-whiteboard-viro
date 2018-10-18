'use strict';

import React, { Component } from 'react';
import ARTrelloBoard from "./ARTrelloBoard.js";
import {
  ViroARScene,
  ViroConstants,
  ViroText
} from 'react-viro';


class KaizenBoardEntry extends Component {

  constructor() {
    super();

    this.state = {
      text : "Initializing AR...!"
    };

    this._onInitialized = this._onInitialized.bind(this);
  }

  componentDidMount() {

  }

  _onInitialized(state, reason) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Kaizen Board Menu"
      });
    } else if (state === ViroConstants.TRACKING_NONE) {
      this.setState({
        text : "Lost Tracking"
      });
      // Handle loss of tracking
    }
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text="Kaizen Board"
          position={[0,0,-5]}
        />
        <ARTrelloBoard />
      </ViroARScene>
    );
  }
}

module.exports = KaizenBoardEntry;
