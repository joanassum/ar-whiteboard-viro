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

    this.cascadeClick = this.cascadeClick.bind(this);
    this.child = React.createRef();
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

  cascadeClick(){

    this.child.current.refresh();

  }

  componentDidUpdate(){

  }

  render() {

    const listWidth = 1.75;


    return (

      <ViroNode
        position={[2.5, -0.5, 0]}
      >
        <ViroFlexView style={{flexDirection: 'column', backgroundColor: this.props.filter.color}} height={0.4} width={listWidth}>
          <ViroText
            style={styles.prodDescriptionText}
            text={this.state.boardName}
          />
        </ViroFlexView>
        {this.state.listLoaded ? (<ARTrelloList ref={this.child} listIds={this.state.listIds} filter={this.props.filter.id} updateFilter={this.props.filter.clicked}/>) : null}
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