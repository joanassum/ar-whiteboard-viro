'use strict';

import React, {Component} from 'react';
import {
  ViroNode,
  ViroText
} from 'react-viro';
import ARTrelloCard from "./ARTrelloCard.js";

class ARTrelloList extends Component {

  constructor() {
    super();

    this.state = {
      cardArray: [],
      listId: "",
      listPosition: [0.5, -0.5, 0],
      listName: ""
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
                this.setState({listName: body._value})
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
        <ViroText
          text={this.state.listName}
        />
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

