'use strict';

import React, { Component } from 'react';
import {ViroFlexView, ViroText} from 'react-viro';
import {StyleSheet} from "react-native";


class ARTrelloLabel extends Component {

  constructor(props) {
    super(props);

    this.labelClick = this.labelClick.bind(this);

    this.state = {
      id: ""
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.n.id
    });

  }


  labelClick(){
    this.props.labelClick(this.props.n.id);
  }

  render() {

    return (
      <ViroFlexView
        position={[0, -this.props.i * 0.5, 0]}
        style={{flexDirection: "column", backgroundColor: this.props.n.color === "sky" ? "lightblue" : this.props.n.color}}
        height={0.4}
        width={1.5}
        onClick={this.labelClick}
      >
        <ViroText
          style={styles.prodDescriptionText}
          text={this.props.n.name}
        />
      </ViroFlexView>
    );
  }
}

module.exports = ARTrelloLabel;

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