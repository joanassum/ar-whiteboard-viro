'use strict';

import React, {Component} from 'react';
import {
  ViroText,
  ViroNode,
  ViroFlexView
} from 'react-viro';
import ARTrelloList from "./ARTrelloList.js";
import {StyleSheet} from "react-native";
import * as GetDummyData from "./GetDummyData.js";


class ARTrelloBoard extends Component {

  constructor() {
    super();

    this.state = {
      text: "Loading...",
      listIds: []
    };

  }

  componentDidMount() {
    let body1 = GetDummyData.getBoardName();
    this.setState({
        text: body1._value
    });
    // fetch('http://ec2-35-178-8-185.eu-west-2.compute.amazonaws.com:8080/trello/getBoardName/SkS6g4qa')
    //   .then((response) => {
    //     response.json().then(body => this.setState({
    //       text: body._value,
    //     }));
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    let body2 = GetDummyData.getListIds();
    this.setState({ listIds: body2 });
    // fetch('http://ec2-35-178-8-185.eu-west-2.compute.amazonaws.com:8080/trello/getListIds/SkS6g4qa')
    //   .then((response) => {
    //     response.json().then(body => this.setState({ listIds: body }));
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  render() {
    return (
      <ViroNode position={[0.5, 0, -5]}>
        <ViroFlexView style={styles.titleContainer} height={0.4} width={1.75} position={[2, 0, 0]}>
          <ViroText
            style={styles.prodDescriptionText}
            text={this.state.text}
          />
        </ViroFlexView>
        {
          this.state.listIds.map ( (n, i) => {
            return <ARTrelloList listPosition={[(2 *(i + 1)), -0.5, 0]} listId={this.state.listIds[i]}/>
          })
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
    backgroundColor: "#0abc01",
  }
});