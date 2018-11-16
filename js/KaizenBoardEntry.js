'use strict';

import React, {Component} from 'react';
import ARTrelloMenu from "./ARTrelloMenu.js";

import {
  ViroARScene,
  ViroConstants,
  ViroText,
  ViroFlexView,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroBox,
  ViroNode,
} from 'react-viro';
import {StyleSheet} from "react-native";


class KaizenBoardEntry extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: "Initializing AR...!"
    };
    this._setMarker();
    this._onInitialized = this._onInitialized.bind(this);
  }

  componentDidMount() {

  }

  _onInitialized(state, reason) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Kaizen Board Menu"
      });
    } else if (state === ViroConstants.TRACKING_NONE) {
      this.setState({
        text: "Lost Tracking"
      });
      // Handle loss of tracking
    }
  }

  _setMarker(){
        ViroARTrackingTargets.createTargets({
            "menu marker": {
                source: require('./res/redsquare.png'),
                orientation: "Up",
                physicalWidth: 0.2 // real world width in meters
            }
        });
  }

_onAnchorFound() {
    this.setState({
        pauseUpdates: true,
    })
}

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroARImageMarker target={"menu marker"} onAnchorFound={this._onAnchorFound} pauseUpdates={this.state.pauseUpdates}>
          <ViroNode
           position={[0, 0, -5]} //rotation={[-45, 0, 0]}
          >
            <ARTrelloMenu />
          </ViroNode>
        </ViroARImageMarker>
      </ViroARScene>
    );
  }
}

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

module.exports = KaizenBoardEntry;

