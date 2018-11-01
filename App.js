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
  TouchableHighlight,
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';

const sharedProps = {
  apiKey:"2960EB0C-18D5-49A0-9BE2-D418371F615D",
};

// Sets the default scene you want for AR and VR
// const InitialARScene = require('./js/KaizenBoardEntry');

// Sets the scene choices you want for AR and BoardIdentification
var InitialARScene = require('./js/KaizenBoardEntry');
const BoardIdentification = require('./js/HelloWorldScene');

var UNSET = "UNSET";
var BOARD_IDENTIFICATION = "BI";
var AR_NAVIGATOR_TYPE = "AR";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ViroEntry extends Component {

  constructor() {
    super();
      this.state = {
          navigatorType : defaultNavigatorType,
          sharedProps : sharedProps
      };
      this._getExperienceSelector = this._getExperienceSelector.bind(this);
      this._getARNavigator = this._getARNavigator.bind(this);
      ViroEntry._getBoardIdentifier = ViroEntry._getBoardIdentifier.bind(this);
      this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
      this._exitViro = this._exitViro.bind(this);
  }

  // render() {
  //   return (<ViroARSceneNavigator {...this.state.sharedProps}
  //                                 initialScene={{scene: InitialARScene}} />);
  // }

  render() {
    return ViroEntry._getBoardIdentifier();
  }

    // Presents the user with a choice of an AR or VR experience
    _getExperienceSelector() {
        return (
            <View style={localStyles.outer} >
                <View style={localStyles.inner} >

                    <Text style={localStyles.titleText}>
                        Choose your desired experience:
                    </Text>

                    <TouchableHighlight style={localStyles.buttons}
                                        onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
                                        underlayColor={'#68a0ff'} >

                        <Text style={localStyles.buttonText}>Enter AR</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={localStyles.buttons}
                                        onPress={this._getExperienceButtonOnPress(BOARD_IDENTIFICATION)}
                                        underlayColor={'#68a0ff'} >

                        <Text style={localStyles.buttonText}>Enter Board Pin</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    // Returns the ViroARSceneNavigator which will start the AR experience
    _getARNavigator() {
        return (
            <ViroARSceneNavigator {...this.state.sharedProps}
                                  initialScene={{scene: InitialARScene}}  />
        );
    }

    // Returns the Board Identification Scene which will set the Board Pin
    static _getBoardIdentifier() {
        return (

            <BoardIdentification />
        );
    }

    // This function returns an anonymous/lambda function to be used
    // by the experience selector buttons
    _getExperienceButtonOnPress(navigatorType) {
        return () => {
            this.setState({
                navigatorType : navigatorType
            })
        }
    }

    _exitViro() {
        this.setState({
            navigatorType : UNSET
        })
    }
}

var localStyles = StyleSheet.create({
    viroContainer :{
        flex : 1,
        backgroundColor: "black",
    },
    outer : {
        flex : 1,
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor: "black",
    },
    inner: {
        flex : 1,
        flexDirection: 'column',
        alignItems:'center',
        backgroundColor: "black",
    },
    titleText: {
        paddingTop: 30,
        paddingBottom: 20,
        color:'#fff',
        textAlign:'center',
        fontSize : 25
    },
    buttonText: {
        color:'#fff',
        textAlign:'center',
        fontSize : 20
    },
    buttons : {
        height: 80,
        width: 150,
        paddingTop:20,
        paddingBottom:20,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor:'#68a0cf',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    exitButton : {
        height: 50,
        width: 100,
        paddingTop:10,
        paddingBottom:10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor:'#68a0cf',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    }
});

module.exports = ViroEntry;
