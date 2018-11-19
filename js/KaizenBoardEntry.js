'use strict';

import React, {Component} from 'react';
import ARTrelloMenu from "./ARTrelloMenu.js";
import ARTrelloCardTimeline from "./ARTrelloCardTimeline.js";
import ARTrelloCardDetail from "./ARTrelloCardDetail.js";
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
          <ARTrelloMenu
            menuTitle={this.props.menuTitle}
            cardId={this.props.cardId}
            setMenuViewName={(title) => this.props.setMenuViewName(title)}
            setCardId={(cardId) => this.props.setCardId(cardId)}
            unsetCardId={() => this.props.unsetCardId()}
          />

        </ViroNode>

        {/*TODO Card Detail*/}
        <ViroNode
          position={[-3,0,-5]}
        >
            {this.props.cardChosen ? <ARTrelloCardDetail cardId={this.props.cardId} boardId={this.props.boardId}/> : null}
        </ViroNode>
        <ViroNode
          position={[-1.5,-4,-5]}
        >
          {this.props.cardChosen ? <ARTrelloCardTimeline timelinePosition={[0,0,0]} cardId={this.props.cardId} boardId={this.props.boardId}/> : null}
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
    color: '#222222',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'column',
    backgroundColor: "#ffffdd",
  },
});
