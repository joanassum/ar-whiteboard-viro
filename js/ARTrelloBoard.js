'use strict';

import React, {Component} from 'react';
import {
  ViroText,
  ViroNode,
  ViroFlexView
} from 'react-viro';

import {StyleSheet} from "react-native";
import {getBoardName} from "./backend/backendController";

class ARTrelloBoard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      boardName: "Loading...",
      boardNameLoaded: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    console.log("GET BOARD ID");
    getBoardName(this.props.boardId).then((response) => {
      this.setState({
        boardName: response._value,
        boardNameLoaded: true,
      });
    });
  }

  onClick(){
    if(this.state.boardNameLoaded){
      this.props.setMenuViewName(this.state.boardName);
      this.props.setBoardName(this.state.boardName);
      this.props.setMenuOption("List Menu");
    }
  }

  render() {
    return (
      <ViroNode
        position={this.props.disArr}
      >
        <ViroFlexView
          style={styles.titleContainer} height={0.4} width={1.75}
          onClick={this.onClick}
        >
          <ViroText
            style={styles.prodDescriptionText}
            text={(this.state.boardNameLoaded) ? this.state.boardName : "Loading..."}
          />
        </ViroFlexView>
      </ViroNode>
    );
  }
}

module.exports = ARTrelloBoard;

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