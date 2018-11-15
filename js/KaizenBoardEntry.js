'use strict';

import React, {Component} from 'react';
import ARTrelloMenu from "./ARTrelloMenu.js";
import {getPerformanceGraph} from './backend/backendController';

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
    this.setMarker();
    this._onInitialized = this._onInitialized.bind(this);
  }

  setMarker() {
    ViroARTrackingTargets.createTargets({
      "poster": {
        source: require('./res/trello.png'),
        orientation: "Up",
        physicalWidth: 0.3 // real world width in meters
      }
    });
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

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        {/*<ViroARImageMarker target={"poster"}>*/}
        <ViroNode
           position={[0, 0, -5]} //rotation={[-45, 0, 0]}
        >
          <ARTrelloMenu />
        </ViroNode>
        <ViroNode
          position={[-1.5,-4,-5]}
        >
          <ViroFlexView
            position={[0, 0, 0]}
            style={styles.titleContainer}
            height={0.4}
            width={1.75}
          >
            <ViroText
              style={styles.prodDescriptionText}
              text={this.props.cardId}
            />
          </ViroFlexView>
        </ViroNode>
        <ViroNode
          position={[-5,0,-5]}
        >
          <ViroFlexView
            position={[0, 0, 0]}
            style={styles.titleContainer}
            height={0.4}
            width={1.75}
          >
            <ViroText
              style={styles.prodDescriptionText}
              text={this.props.cardId}
            />
          </ViroFlexView>
        </ViroNode>
        {/*</ViroARImageMarker>*/}
      </ViroARScene>
    );
  }
}

// ViroARTrackingTargets.createTargets({
//     poster : {
//         source : require('./res/trello.png'),
//         orientation : "Up",
//         physicalWidth : 0.3 // real world width in meters
//     }
// });

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

