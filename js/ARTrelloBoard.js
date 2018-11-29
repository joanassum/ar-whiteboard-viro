'use strict';

import React, {Component} from 'react';
import {
  ViroText,
  ViroNode,
  ViroFlexView
} from 'react-viro';

import {StyleSheet} from "react-native";
import {getBoardName, getBoardId, setBoardID} from "./backend/backendController";

class ARTrelloBoard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      boardList: [{boardName: "Loading...", boardId: "Loading...."}],
      boardNameLoaded: false,
      boardClick: false,
      boardObj: {boardName: "Loading...", boardId: "Loading...."},
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    getBoardId(this.props.currentMemberID).then((response) => {
      this.setState({boardList: response, boardNameLoaded: true});
    });
  }

  onClick(position, source, boardObj){
    this.setState({boardClick: true, boardObj: boardObj});
    if(this.state.boardNameLoaded){
      console.log("Setting boardId: " + boardObj.boardId);
      this.props.setMenuViewName(boardObj.boardName);
      this.props.setBoardName(boardObj.boardName);
      this.props.setBoardId(boardObj.boardId);
      setBoardID(boardObj.boardId);
      this.props.setMenuOption("List Menu");
    }
  }

  render() {

    console.log(this.state.boardList);
    return (
      <ViroNode
        position={this.props.disArr}
      >
        {
          (this.state.boardNameLoaded)? (
            this.state.boardList.map((n, i) => {
              return (
                <ViroFlexView
                  position={[0, (-0.5 * (i)), 0]}
                  style={styles.titleContainer}
                  height={0.4}
                  width={1.75}
                  key={n.boardId}
                  onClick={(pos, src, boardObj = n) => this.onClick(pos, src, boardObj)}>
                  <ViroText
                    style={styles.prodDescriptionText}
                    text={n.boardName}
                    key={n.boardId}
                  />
                </ViroFlexView>);
            })
          ) : null
        }
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