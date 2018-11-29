'use strict';

import React, {Component} from 'react';
import ARTrelloBoard from "./ARTrelloBoard.js";
import ARTrelloLabel from "./ARTrelloLabel.js";
import BoardMetricGraphs from "./BoardMetricGraphs.js";
import MenuCardContainer from "./containers/MenuCardContainer.js";
import ARTrelloList from "./ARTrelloList.js";

import {
    ViroText,
    ViroNode,
    ViroFlexView,
} from 'react-viro';
import {StyleSheet} from "react-native";


class ARTrelloMenu extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      index: 0,
      displayBoard : false,
    };
}

  componentDidMount() {

  }

  onClick(option){
    if(option === "Board Menu" || option === "Board Metric"){
      this.props.unsetCardId();
    }
    this.props.setMenuOption(option);
  }


  render() {
    let mainMenu = (
      <ViroNode
        position={[0,0,0]}
      >
        <ViroFlexView
          position={[0, -0.5, 0]} style={styles.titleContainer} height={0.4} width={2.5}
          onClick={() => this.onClick("Filter Menu")}
        >
          <ViroText
            style={styles.prodDescriptionText}
            text={`${(this.props.labelSet) ? "Filter: " + this.props.labelName : "Filter Options"}`}
          />
        </ViroFlexView>
        <ViroFlexView
          position={[0, -1.0, 0]} style={styles.titleContainer} height={0.4} width={2.5}
          onClick={() => this.onClick("Board Menu")}
        >
          <ViroText
            style={styles.prodDescriptionText}
            text={`${(this.props.titlePicked) ? "Search: " + this.props.menuTitle : "Search Options"}`}
          />
        </ViroFlexView>
        <ViroFlexView
          position={[0, -1.5, 0]} style={styles.titleContainer} height={0.4} width={2.5}
          onClick={() => this.onClick("Board Metric")}
        >
          <ViroText
            style={styles.prodDescriptionText}
            text={"Board Metric"}
          />
        </ViroFlexView>
      </ViroNode>
    );

    const mainComponent = (component => {
      switch (component) {
        case "Board Menu":
          return <ARTrelloBoard
            disArr={[0,-0.5,0]}
            boardId={this.props.boardId}
            setMenuViewName={(title) => this.props.setMenuViewName(title)}
            setBoardName={(boardName) => this.props.setBoardName(boardName)}
            setMenuOption={(option) => this.props.setMenuOption(option)}
          />;
        case "List Menu":
          return <ARTrelloList
            disArr={[0,-0.5,0]}
            boardId={this.props.boardId}
            setListID={(listID) => this.props.setListID(listID)}
            setMenuViewName={(title) => this.props.setMenuViewName(title)}
            setOverDueFlag={(flag) => this.props.setOverDueFlag(flag)}
            setMenuOption={(option) => this.props.setMenuOption(option)}
          />;
        case "Card Menu":
          return <MenuCardContainer
            listSet={this.props.listSet}
            disArr={[0,-0.5,0]}
            listID={this.props.listID}
          />;
        case "Board Metric":
          return <BoardMetricGraphs
            setMenuOption={(option) => this.props.setMenuOption(option)}
            setOverDueFlag={(flag) => this.props.setOverDueFlag(flag)}
            setBoardMetric={() => this.props.setBoardMetric()}
            unsetBoardMetric={() => this.props.unsetBoardMetric()}
            setGraphType={(graphType) => this.props.setGraphType(graphType)}
            disArr={[0,-0.5,0]}
          />;
        case "Filter Menu":
          console.log("Filter Menu");
          return <ARTrelloLabel
            disArr={[0,-0.5,0]}
            setLabelID={(labelID) => this.props.setLabelID(labelID)}
            setLabelName={(labelName) => this.props.setLabelName(labelName)}
            setMenuOption={(option) => this.props.setMenuOption(option)}
          />;
        case "Main Menu":
          //Fall Through
        default:
          return mainMenu;
      }
    })(this.props.option);


    return (
      <ViroNode
        position={[1.5,0,0]}
      >

        <ViroFlexView position={[0, 0, 0]} style={styles.titleContainer} height={0.4} width={2.5}>
          <ViroText
            style={styles.prodDescriptionText}
            text={(this.props.option === "Main Menu") ? "Menu" : "Back"}
            onClick={() => this.onClick("Main Menu")}
          />
        </ViroFlexView>
        {mainComponent}
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