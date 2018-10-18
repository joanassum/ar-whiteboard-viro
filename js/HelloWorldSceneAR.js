'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroARTrackingTargets,
  ViroARImageMarker,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  componentDidMount() {
    return fetch('http://ec2-35-178-8-185.eu-west-2.compute.amazonaws.com:8080/data')
     .then((response) => {
       response.json().then(body => this.setState({
         text: body[0],
       }));
     })
     .catch((error) =>{
       console.error(error);
     });
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
      <ViroARImageMarker target={"poster"}>
         <ViroBox position={[0, .25, 0]} scale={[.5, .5, .5]} />
       </ViroARImageMarker>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    // if (state == ViroConstants.TRACKING_NORMAL) {
    //   this.setState({
    //     text : "Hello World!"
    //   });
    // } else if (state == ViroConstants.TRACKING_NONE) {
    //   // Handle loss of tracking
    // }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroARTrackingTargets.createTargets({
    poster : {
        source : require('./res/trello-logo.png'),
        orientation : "Up",
        physicalWidth : 0.3 // real world width in meters
    }
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});

module.exports = HelloWorldSceneAR;
