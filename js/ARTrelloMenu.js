'use strict';

import React, {Component} from 'react';
import {getLabels, getListIds} from './backend/backendController';
import ARTrelloBoard from "./ARTrelloBoard.js";
import ARTrelloLabel from "./ARTrelloLabel.js";

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
    this.labelClick = this.labelClick.bind(this);
    this.child = React.createRef();

    this.state = {
      displayBoard : false,
      labelIds: [],
      labelsLoaded: false,
      filter: {id: "none", name: "None", color: "white"},
      labelObjs: []
    };
  }

  componentDidMount() {
    getLabels().then((response) => {
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

  labelClick(id){
    let returnObj = this.state.labelIds.filter( (obj) => {

      console.log("LABEL CLICK: " + id);

      if(id === "none"){
        console.log("none filter");
        return {id: "none", name: "None", color: "white"};
      }

      if(obj.id === id){
        console.log("Obj filter");
        obj["clicked"] = true;
        return obj;
      }
    });
    console.log("RETURN OBJEC IS; " + returnObj);
    this.setState({filter: returnObj[0]}, () => this.child.current.cascadeClick());
  }

  render() {

    let filterOption;
    let filterOptionNone;
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

      filterOptionNone = (
        <ViroFlexView position={[0, -2.0, 0]} style={styles.titleContainer} height={0.4} width={1.5}>
          <ARTrelloLabel n={{id: "none", name: "None", color: "grey"}} i={0} labelClick={this.labelClick}/>
        </ViroFlexView>
      );

      filterOptions = this.state.labelsLoaded ? (
        this.state.labelIds.map ((n, i) => {
            return <ARTrelloLabel n={n} i={i} labelClick={this.labelClick}/>;
        })
      ) : null;

      board = (<ARTrelloBoard filter={this.state.filter} ref={this.child}/>);
    } else {
      filterOption = null;
      filterOptionNone = null;
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
        {/*{filterOptionNone}*/}
        <ViroNode position={[0, -2.0, 0]}>
          {filterOptions}
        </ViroNode>
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