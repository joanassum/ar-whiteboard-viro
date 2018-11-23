'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroNode,
  ViroText,
  ViroFlexView,
  ViroImage,
} from 'react-viro';
import {getCardMembers, getCheckLists, getTimeLineGraph} from "./backend/backendController";

class Checkbox extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(){

  }

  render(){

    let ret = null;
    if(this.props.state === "complete"){
      ret =  (
        <ViroImage
          style={styles.prodDescriptionText}
          source={require("./res/complete.jpg")}
          onClick={this.onClick}
          scale= {[0.5, 0.5, 0.5]}
        />);
    } else {
      ret = ((
        <ViroImage
          style={styles.prodDescriptionText}
          source={require("./res/incomplete.jpg")}
          onClick
          scale= {[0.5, 0.5, 0.5]}
        />));
    }
    return (ret);
  }
}

class ARTrelloCardDetail extends Component {

  constructor() {
    super();
    this.state = {
      cardPosition: [-4, -0.5, 0],
      members:[],
      membersLoaded: false,
      checkLists: [],
      checkListsLoaded: false,
      timeLineGraph: "Loading...",
      timeLineGraphLoaded: false,
    };
  }

  componentDidMount() {
    getCardMembers(this.props.cardId).then((response) => {
      this.setState({
        members: response,
        membersLoaded: true
      });
    });

    getCheckLists(this.props.cardId).then((response) => {
      this.setState({
        checkLists: response,
        checkListsLoaded: true
      });
    });

    getTimeLineGraph(this.props.cardId).then((response) => {
      this.setState({
        timeLineGraph: response,
        timeLineGraphLoaded: true
      });
    });
  }

  render() {

    let checkLists = (
      this.state.checkLists.map ((n, i) => {
        return(
          <ViroFlexView style={{flexDirection: 'column'}} height={4} width={3}>
            <ViroFlexView style={{flexDirection: 'column'}} height={0.7} width={3}>
              <ViroText style={styles.prodDescriptionText} text={n.name + ": "}/>
            </ViroFlexView>
            {this.state.checkLists[i].checkItems.map((m, j) => {
              return (
                <ViroFlexView style={{flexDirection: 'row'}} height={0.7} width={3}>
                  <Checkbox state={m.state} />
                  <ViroText style={styles.prodDescriptionText} text={
                    m.name
                  }/>
                </ViroFlexView>
              );
            })}
          </ViroFlexView>
        );
      })
    );


    return (
      <ViroNode position={this.props.cardViewPosition}>
        <ViroFlexView style={styles.titleContainer} height={6} width={3}>
          <ViroFlexView style={{flexDirection: 'column'}} >
            <ViroImage
              height={3}
              width={3}
              source={(this.state.timeLineGraphLoaded) ? {uri: this.state.timeLineGraph} : require("./res/Logo.png")}
            />
          </ViroFlexView>
          <ViroFlexView style={{flexDirection: 'column'}} height={1} width={3}>
            <ViroFlexView style={{flexDirection: 'row'}} height={0.7} width={3}>
              <ViroText
                style={styles.prodDescriptionText}
                text="Members: "
              />
              <ViroFlexView style={{flexDirection: 'row'}} height={0.7} width={2}>{
                (this.state.membersLoaded) ? (
                  this.state.members.map((n, i) => {
                      return (<ViroText style={styles.memberNameText} text={this.state.members[i].fullName}/>);
                  })
                ) : null
              }
              </ViroFlexView>
            </ViroFlexView>
            {(this.state.checkListsLoaded) ? checkLists : null}
          </ViroFlexView>
        </ViroFlexView>
      </ViroNode>
    );
  }
}


var styles = StyleSheet.create({
  prodDescriptionText: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    color: '#222222',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'column',
    backgroundColor: "#ffffdd",
  },
  memberNameText: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    color: '#222222',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 0.2,
  },
  cardBack: {
    flexDirection: 'column',
    backgroundColor: "#ffffdd",
    display: 'none',
  }
});

module.exports = ARTrelloCardDetail;
