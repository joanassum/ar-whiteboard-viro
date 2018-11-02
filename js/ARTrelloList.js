'use strict';

import React, {Component} from 'react';
import {
  ViroNode,
  ViroText,
  ViroFlexView
} from 'react-viro';
import ARTrelloCard from "./ARTrelloCard.js";
import {getFilteredList, getListName} from './backend/backendController';
import {StyleSheet} from "react-native";

class ARTrelloList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cardArray: [],
      listIds: this.props.listIds,
      listIndex: 0,
      listFilterLoad: true
    };

    this.clickList = this.clickList.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {

    Promise.all([
      getFilteredList(this.props.filter, this.props.listIds[this.state.listIndex]),
      getListName(this.props.listIds[this.state.listIndex])
    ]).then(([listResponse, listNameResponse]) => {
      this.setState({listName: listNameResponse.name, cardArray: listResponse, listLoaded: true});
    }).catch((err) => {
      console.log(err);
    });
  }

  clickList(position, source) {
    let curIndex = this.state.listIndex + 1;
    if(curIndex >= this.state.listIds.length){
      curIndex = 0;
    }

    this.setState({listLoaded: false, listIndex: curIndex});


    Promise.all([
      getFilteredList(this.props.filter, this.props.listIds[curIndex]),
      getListName(this.props.listIds[curIndex])
    ]).then(([listResponse, listNameResponse]) => {
      this.setState({listName: listNameResponse.name, cardArray: listResponse, listLoaded: true});
    }).catch((err) => {
      console.log(err);
    });
  }

  refresh(){
    Promise.all([
      getFilteredList(this.props.filter, this.props.listIds[this.state.listIndex]),
      getListName(this.props.listIds[this.state.listIndex])
    ]).then(([listResponse, listNameResponse]) => {
      this.setState({listName: listNameResponse.name, cardArray: listResponse, listLoaded: true});
    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidUpdate(){

  }

  render() {

    return (
      <ViroNode
        position={[0, -0.5, 0]}
      >
          <ViroFlexView style={styles.titleContainer} height={0.4} width={1.75} onClick={this.clickList}>
            <ViroText
              style={styles.prodDescriptionText}
              text={this.state.listLoaded ? this.state.listName : "Loading..."}
            />
          </ViroFlexView>
        {
          this.state.listLoaded ? (
            this.state.cardArray.map((n, i) => {
              return <ARTrelloCard cardPosition={[0, (-0.5 * (i + 1)), 0]} cardInfo={this.state.cardArray[i]}/>;
            })
          ) : null
        }
      </ViroNode>
    );
  }
}

module.exports = ARTrelloList;

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