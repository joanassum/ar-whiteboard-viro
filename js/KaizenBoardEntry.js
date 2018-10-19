'use strict';

import React, { Component } from 'react';
import ARTrelloBoard from "./ARTrelloBoard.js";
import {
  ViroARScene,
  ViroConstants,
  ViroText,
  ViroFlexView
} from 'react-viro';
import {StyleSheet} from "react-native";


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
        <ViroFlexView style={styles.titleContainer} height={6} width={4} position={[-1, 0, -5]}>
          <ViroText
            style={styles.prodDescriptionText}
            text="Kaizen Board"
            position={[0,0,0]}
          />
        </ViroFlexView>
        <ARTrelloBoard />
      </ViroARScene>
    );
  }
}

module.exports = KaizenBoardEntry;

var styles = StyleSheet.create({
  prodDescriptionText: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'center',
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'column',
    backgroundColor: "#ffff00",
  }
});