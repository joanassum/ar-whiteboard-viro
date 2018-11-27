'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroNode,
  ViroText,
  ViroFlexView,
} from 'react-viro';

class BoardMetricGraphs extends Component {

  constructor() {
    super();
    this.state = {

    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.unsetBoardMetric();
  }

  onClick(graphType){
    this.props.setMenuOption("Main Menu");
    this.props.setGraphType(graphType)
    this.props.setBoardMetric();
  }

  render() {

    return (
      <ViroNode position={this.props.disArr}>
        <ViroFlexView
          position={[0, 0, 0]} style={styles.titleContainer} height={0.4} width={2.5}
          onClick={() => this.onClick("Column Count")}
        >
          <ViroText
            style={styles.prodDescriptionText}
            text={"Card Per Column"}
          />
        </ViroFlexView>
        <ViroFlexView
          position={[0, -0.5, 0]} style={styles.titleContainer} height={0.4} width={2.5}
          onClick={() => this.onClick("Performance")}
        >
          <ViroText
            style={styles.prodDescriptionText}
            text={"Performance"}
          />
        </ViroFlexView>
      </ViroNode>
    );
  }
}


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

module.exports = BoardMetricGraphs;
