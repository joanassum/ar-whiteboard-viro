'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroNode,
  ViroText,
  ViroFlexView,
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
        <ViroFlexView style={styles.titleContainer} height={0.4} width={1.5} >
          <ViroText
            style={styles.prodDescriptionText}
            text={this.state.cardInfo.name}
          />
        </ViroFlexView>
      </ViroNode>
    );
  }
}
module.exports = ARTrelloCard;

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
    backgroundColor: "#ffffffdd",
  }
});