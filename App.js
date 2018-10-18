/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

const sharedProps = {
  apiKey:"2960EB0C-18D5-49A0-9BE2-D418371F615D",
};

// Sets the default scene you want for AR and VR
const InitialARScene = require('./js/KaizenBoardEntry');

export default class ViroEntry extends Component {

  constructor() {
    super();
    this.state = {
      sharedProps : sharedProps
    };
  }

  render() {
    return (<ViroARSceneNavigator {...this.state.sharedProps}
                                  initialScene={{scene: InitialARScene}} />);
  }
}

module.exports = ViroEntry;
