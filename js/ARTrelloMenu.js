'use strict';

import React, {Component} from 'react';
import {getBoardName} from './backend/backendController';
import ARTrelloBoard from "./ARTrelloBoard.js";

import {
    ViroText,
    ViroNode,
    ViroFlexView,
} from 'react-viro';
import {StyleSheet} from "react-native";


class ARTrelloMenu extends Component {

  constructor(props) {
    super(props);

    this.clickDisplayBoard = this.clickDisplayBoard.bind(this);

    this.state = {
      index: 0,
      displayBoard : false,
      boardName: "Loading...",
      boardNameLoaded: false,
    };
}

  componentDidMount() {
    getBoardName().then((response) => {
      this.setState({
        boardName: response._value,
        boardNameLoaded: true,
      });
    });
  }

  clickDisplayBoard(position, source)  {
    let tempBool = !this.state.displayBoard;
    this.setState({
      displayBoard: tempBool
    });
    if(this.state.boardNameLoaded){
      this.props.setMenuViewName("Board");
    }
    if(!tempBool){
      this.props.unsetCardId();
    }
  }


  render() {

    let board;
    const displacement = -1.5;
    let menuTitleOption = (this.props.cardId !== "None" && this.state.displayBoard) ? "Chosen " : "Search ";

    board = (<ARTrelloBoard
      disArr={[0,displacement,0]}
      boardName={this.state.boardName}
      menuTitle={this.props.menuTitle}
      setMenuViewName={(title) => this.props.setMenuViewName(title)}
    />);

    return (
      <ViroNode
        position={[1.5,0,0]}
      >
        <ViroFlexView position={[0, -0.5, 0]} style={styles.titleContainer} height={0.4} width={2.5}>
          <ViroText
            style={styles.prodDescriptionText}
            text={`${
              (this.state.boardNameLoaded && this.state.displayBoard) ? menuTitleOption + this.props.menuTitle : "Search Menu"}
              `}
          />
        </ViroFlexView>
        <ViroFlexView position={[0, -1.0, 0]} style={styles.titleContainer} height={0.4} width={1.75}>
          <ViroText
            style={styles.prodDescriptionText}
            text={`${ (this.state.displayBoard) ? "Clear" : "Search" }`}
            onClick={this.clickDisplayBoard}
          />
        </ViroFlexView >
          {this.state.displayBoard ? board : null}
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


//Legacy Code
// let filterOption;
// let filterOptionNone;
// let filterOptions;
// let boardGraph;
// let board;
//
// if(this.state.displayBoard) {
//   filterOption = (
//     <ViroFlexView position={[0, -2.0, 0]} style={styles.titleContainer} height={0.4} width={1.5}>
//       <ViroText
//         style={styles.prodDescriptionText}
//         text={"Filter Labels"}
//       />
//     </ViroFlexView>
//   );
//
//   boardGraph = this.state.displayBoard ? (
//     <ViroNode animation={{name : this.state.graphAnimation, run : this.state.runAnimation, loop : false,
//       onFinish:this._onAnimationFinished, onStart: this._onStart}}>
//       <ViroFlexView position={[0, -1.5, 0]} style={styles.titleContainer} height={0.4} width={1.5}
//                     onClick={this._clickProjectPerformance} ignoreEventHandling={this.state.showPerGraph}>
//         <ViroText
//           style={styles.prodDescriptionText}
//           text={"Project Performance"}
//         />
//       </ViroFlexView >
//       <ViroFlexView position={[0, -1.5, 0]} style={styles.titleContainer} height={2.5} width={3}
//                     rotation={[0,180,0]} onClick={this._clickProjectPerformance} ignoreEventHandling={!this.state.showPerGraph}>
//         <ViroImage
//           style={styles.prodDescriptionText}
//           source={{uri: this.state.performanceGraph}}
//         />
//       </ViroFlexView>
//     </ViroNode>
//   ) : null;
//
//   filterOptionNone = (
//     <ViroFlexView position={[0, -2.0, 0]} style={styles.titleContainer} height={0.4} width={1.5}>
//       <ARTrelloLabel n={{id: "none", name: "None", color: "grey"}} i={0} labelClick={this.labelClick}/>
//     </ViroFlexView>
//   );
//
//   filterOptions = this.state.labelsLoaded ? (
//     this.state.labelIds.map ((n, i) => {
//       return <ARTrelloLabel n={n} i={i} labelClick={this.labelClick}/>;
//     })
//   ) : null;
//
//   board = (<ARTrelloBoard filter={this.state.filter} ref={this.child}/>);
// } else {
//   filterOption = null;
//   filterOptionNone = null;
//   filterOptions = null;
//   board = null;
// }

//
// labelClick(id){
//   let returnObj = this.state.labelIds.filter( (obj) => {
//
//     console.log("LABEL CLICK: " + id);
//
//     if(id === "none"){
//       console.log("none filter");
//       return {id: "none", name: "None", color: "white"};
//     }
//
//     if(obj.id === id){
//       console.log("Obj filter");
//       obj["clicked"] = true;
//       return obj;
//     }
//   });
//   console.log("RETURN OBJEC IS; " + returnObj);
//   this.setState({filter: returnObj[0]}, () => this.child.current.cascadeClick());
//
// }
//
// labelIds: [],
//   labelsLoaded: false,
//   filter: {id: "none", name: "None", color: "white"},
// labelObjs: [],
//
// getLabels().then((response) => {
//   this.setState({
//     labelIds: response,
//     labelsLoaded: true});
// });