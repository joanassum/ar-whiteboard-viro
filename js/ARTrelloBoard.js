'use strict';

import React, {Component} from 'react';
import {
  ViroText,
  ViroNode,
  ViroFlexView
} from 'react-viro';

import ARTrelloList from "./ARTrelloList.js";
import {StyleSheet} from "react-native";

class ARTrelloBoard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      boardId: "",
      boardClick: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {

  }

  onClick(){
    this.setState({boardClick: true});
    this.props.setMenuViewName(this.props.boardName);
  }

  render() {

    const listWidth = 1.75;

    return (

      <ViroNode
        //[1.5, -1.5, -5]
        position={this.props.disArr}
      >
        {
          this.state.boardClick ? <ARTrelloList
              setMenuViewName={(title) => this.props.setMenuViewName(title)}
            /> :
            (
              <ViroFlexView style={{flexDirection: 'column'}} height={0.4} width={listWidth}>
              <ViroText
                style={styles.prodDescriptionText}
                text={this.props.boardName}
                onClick={this.onClick}
              />
            </ViroFlexView>
            )
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