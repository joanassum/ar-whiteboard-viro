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

class ViroEntry extends Component {

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

import { QRScannerView } from 'ac-qrcode';

class DefaultScreen extends Component {
    render() {
        return (

            < QRScannerView
                onScanResultReceived={this.barcodeReceived.bind(this)}

                renderTopBarView={() => this._renderTitleBar()}

                renderBottomMenuView={() => this._renderMenu()}
            />
        )
    }

    _renderTitleBar(){
        return(
            <Text
                style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
            >Here is title bar</Text>
        );
    }

    _renderMenu() {
        return (
            <Text
                style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
            >Here is bottom menu</Text>
        )
    }

    barcodeReceived(e) {
        Toast.show('Type: ' + e.type + '\nData: ' + e.data);
        //console.log(e)
    }
}

export default class MainComponent extends Component {
    render () {
        return <div>
            <DefaultScreen />
            <ViroEntry />
        </div>;
    }
};

module.exports = ViroEntry;
