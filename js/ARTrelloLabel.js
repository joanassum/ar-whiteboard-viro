'use strict';

import React, {Component} from 'react';
import {
  ViroNode,
  ViroText,
  ViroFlexView
} from 'react-viro';
import {getLabels} from './backend/backendController';
import {StyleSheet} from "react-native";

class ARTrelloList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      labels: [{id: "Loading..", name: "Loading..", color: "Loading.."}],
      labelsLoaded: false,
      labelClick: false,
      labelObj: {id: "Loading..", name: "Loading..", color: "Loading.."}
    };

    this.clickList = this.clickList.bind(this);
  }

  componentDidMount() {
    getLabels().then((response) => {
      console.log(response);
      this.setState({
        labels: response,
        labelsLoaded: true});
    });
  }

  clickList(position, source, labelObj) {
    this.setState({listClick: true, labelObj: labelObj});
    if(this.state.labelsLoaded){
      this.props.setLabelID(labelObj.id);
      this.props.setMenuOption("Main Menu");
      this.props.setLabelName(labelObj.name);
    }
  }

  render() {
    return (
      <ViroNode
        position={this.props.disArr}
      >
        {
          (this.state.labelsLoaded) ? (
            this.state.labels.map((n, i) => {
              return (
                <ViroFlexView
                  position={[0, (-0.5 * (i)), 0]}
                  style={{flexDirection: "column", backgroundColor: n.color === "sky" ? "lightblue" : n.color}}
                  height={0.4}
                  width={1.75}
                  key={n.id}
                  onClick={(pos, src, labelObj = n) => this.clickList(pos, src, labelObj)}>
                  <ViroText
                    style={styles.prodDescriptionText}
                    text={n.name}
                    key={n.id}
                  />
                </ViroFlexView>);
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