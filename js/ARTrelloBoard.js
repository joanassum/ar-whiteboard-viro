'use strict';

import React, {Component} from 'react';
import {
  ViroText,
  ViroNode,
  ViroFlexView
} from 'react-viro';

import ARTrelloList from "./ARTrelloList.js";
import {getBoardName, getListIds} from './backend/backendController';
import {StyleSheet} from "react-native";

class ARTrelloBoard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      boardName: "Loading...",
      listIds: [],
      listLoaded: false
    };
  }

  componentDidMount() {
    getBoardName().then((response) => {
      this.setState({boardName: response._value});
    });

    getListIds().then((response) => {
      this.setState({
        listIds: response,
        listLoaded: true,
      });
    });
  }

  render() {

    const listWidth = 1.75;

    return (
      <ViroNode
        position={[2.5, -0.5, 0]}
      >
        <ViroFlexView style={styles.titleContainer} height={0.4} width={listWidth}>
          <ViroText
            style={styles.prodDescriptionText}
            text={this.state.boardName}
          />
        </ViroFlexView>
        {this.state.listLoaded ? (<ARTrelloList listIds={this.state.listIds}/>) : null}
      </ViroNode>
    );
  }
}

module.exports = ARTrelloBoard;


var styles = StyleSheet.create({
  prodDescriptionText: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'column',
    backgroundColor: "#FFFFFF",
  }
});