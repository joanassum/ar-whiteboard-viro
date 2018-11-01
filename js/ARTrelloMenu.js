'use strict';

import React, {Component} from 'react';
import {getLabels, getListIds} from './backend/backendController';
import ARTrelloBoard from "./ARTrelloBoard.js";

import {
  ViroText,
  ViroNode,
  ViroFlexView,
  ViroButton
} from 'react-viro';
import {StyleSheet} from "react-native";


class ARTrelloMenu extends Component {

  constructor(props) {
    super(props);

    this.clickDisplayBoard = this.clickDisplayBoard.bind(this);

    this.state = {
      displayBoard : false,
      labelIds: [],
      labelsLoaded: false
    };

  }

  componentDidMount() {
    getLabels().then((response) => {
      console.log("SHOW ME LABELS: " + response);
      this.setState({
        labelIds: response,
        labelsLoaded: true,
      });
    });
  }

  clickDisplayBoard(position, source)  {
    this.setState({
      displayBoard: (!this.state.displayBoard)
    });
  }

  render() {

    let filterOption;
    let filterOptions;
    let board;

    if(this.state.displayBoard) {
      filterOption = (
        <ViroFlexView position={[0, -1.5, 0]} style={styles.titleContainer} height={0.4} width={1.5}>
          <ViroText
            style={styles.prodDescriptionText}
            text={"Filter Labels"}
          />
        </ViroFlexView>
      );

      filterOptions = this.state.labelsLoaded ? (
        <ViroFlexView position={[0, -1, 0]}>
          {
            this.state.labelIds.map ((n, i) => {
            if(n.name !== null){
              return (
                <ViroText
                  position={[0, -(i + 1) * 0.5, 0]}
                  style={styles.prodDescriptionText}
                  text={n.name}
                />);
            }
          })}
        </ViroFlexView>
      ) : null;
      board = (<ARTrelloBoard />);
    } else {
      filterOption = null;
      filterOptions = null;
      board = null;
    }

    return (
      <ViroNode
        position={[1.5,0,0]}
      >
        <ViroFlexView position={[0, -0.5, 0]} style={styles.titleContainer} height={0.4} width={1.5}>
          <ViroText
            style={styles.prodDescriptionText}
            text={"Menu Options"}
          />
        </ViroFlexView>
        <ViroFlexView position={[0, -1.0, 0]} style={styles.titleContainer} height={0.4} width={1.5}>
          <ViroText
            style={styles.prodDescriptionText}
            text={this.state.displayBoard ? "Clear Board" : "Display Board"}
            onClick={this.clickDisplayBoard}
          />
        </ViroFlexView >
        {filterOption}
        {filterOptions}
        {board}
      </ViroNode>
    );
  }
}

module.exports = ARTrelloMenu;

var styles = StyleSheet.create({
  prodDescriptionText: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    flex: 1,
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'left',
  },
  titleContainer: {
    flexDirection: 'column',
    backgroundColor: "#FFFFFF",
  }
});