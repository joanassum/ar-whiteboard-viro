'use strict';

import React, {Component} from 'react';
import {
  ViroNode,
  ViroText,
  ViroFlexView
} from 'react-viro';
import ARTrelloCard from "./ARTrelloCard.js";
import {StyleSheet} from "react-native";

class ARTrelloList extends Component {

  constructor() {
    super();

    this.state = {
      cardArray: [],
      listId: "",
      listName: "",
      listPosition: [0.5, -0.5, 0]
    };
  }

  componentDidMount() {

    this.setState({
      listId: this.props.listId,
      listPosition: this.props.listPosition
    });

    fetch(`http://ec2-35-178-8-185.eu-west-2.compute.amazonaws.com:8080/trello/getList/${this.props.listId}`)
      .then((response) => {
        response.json().then(body => {
          this.setState({cardArray: body})
        });
      })
      .catch((error) => {
        console.error(error);
      });

    fetch(`http://ec2-35-178-8-185.eu-west-2.compute.amazonaws.com:8080/trello/getListName/${this.props.listId}`)
      .then((response) => {
        response.json().then(body => {
          this.setState({listName: body.name})
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <ViroNode
        position={this.state.listPosition}
      >

          <ViroFlexView style={styles.titleContainer} height={0.4} width={1.75}>
            <ViroText
              style={styles.prodDescriptionText}
              text={this.state.listName}
            />
          </ViroFlexView>
          {
            this.state.cardArray.map((n, i) => {
              return <ARTrelloCard cardPosition={[0, (-0.5 * (i + 1)), 0]} cardInfo={this.state.cardArray[i]}/>
            })
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
    backgroundColor: "#00ffff",
  }
});