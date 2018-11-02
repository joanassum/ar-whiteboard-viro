'use strict';

import React, {Component} from 'react';
import {getLabels, getList, getListName, getPerformanceGraph} from './backend/backendController';
import ARTrelloBoard from "./ARTrelloBoard.js";
import ARTrelloLabel from "./ARTrelloLabel.js";

import {
    ViroText,
    ViroNode,
    ViroFlexView,
    ViroButton, ViroImage, ViroAnimations
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
      labelObjs: [],
      performanceGraph: "",
      showPerGraph: false,
      graphAnimation: 'frontToBack',
      runAnimation: false
  };

  this._clickProjectPerformance = this._clickProjectPerformance.bind(this);
  this._onStart = this._onStart.bind(this);
  this._onAnimationFinished = this._onAnimationFinished.bind(this);

}


  componentDidMount() {
    getLabels().then((response) => {
      this.setState({
        labelIds: response,
        labelsLoaded: true});
    });

    getPerformanceGraph().then((response) => {
      this.setState({performanceGraph: response});
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

  _onStart() {
      this.setState({
          showPerGraph: !this.state.showPerGraph,
      });
  }
  _onAnimationFinished() {
      this.setState({
          runAnimation: false
      });
  }

  _clickProjectPerformance() {
      this.setState({
          graphAnimation: this.state.showPerGraph ? "backToFront" : "frontToBack",
          // if current state is to hide cards, then we want to show them
          runAnimation: true
      });
  }

  render() {

    let filterOption;
    let filterOptionNone;
    let filterOptions;
    let boardGraph;
    let board;

    if(this.state.displayBoard) {
      filterOption = (
        <ViroFlexView position={[0, -2.0, 0]} style={styles.titleContainer} height={0.4} width={1.5}>
          <ViroText
            style={styles.prodDescriptionText}
            text={"Filter Labels"}
          />
        </ViroFlexView>
      );

      boardGraph = this.state.displayBoard ? (
        <ViroNode animation={{name : this.state.graphAnimation, run : this.state.runAnimation, loop : false,
          onFinish:this._onAnimationFinished, onStart: this._onStart}}>
          <ViroFlexView position={[0, -1.5, 0]} style={styles.titleContainer} height={0.4} width={1.5}
                        onClick={this._clickProjectPerformance} ignoreEventHandling={this.state.showPerGraph}>
            <ViroText
              style={styles.prodDescriptionText}
              text={"Project Performance"}
            />
          </ViroFlexView >
          <ViroFlexView position={[0, -1.5, 0]} style={styles.titleContainer} height={2.5} width={3}
                        rotation={[0,180,0]} onClick={this._clickProjectPerformance} ignoreEventHandling={!this.state.showPerGraph}>
            <ViroImage
              style={styles.prodDescriptionText}
              source={{uri: this.state.performanceGraph}}
            />
          </ViroFlexView>
        </ViroNode>
      ) : null;

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
        {boardGraph}
        {filterOption}
        {/*{filterOptionNone}*/}
        <ViroNode position={[0, -2.5, 0]}>
          {filterOptions}
        </ViroNode>

        {board}
      </ViroNode>
    );
  }
}

module.exports = ARTrelloMenu;

ViroAnimations.registerAnimations({
    frontToBack:{
        properties:{rotateY:"+=180.0",
            positionZ: 1,
            positionX: -2,
            positionY: 2,
            opacity: 1.0},
        easing:"EaseInEaseOut",
        duration: 1000},
    backToFront:{
        properties:{rotateY:"+=180.0",
            positionZ: 0,
            positionX: 0,
            positionY: 5,
            opacity: 1.0},
        easing:"EaseInEaseOut",
        duration: 1000},

});

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