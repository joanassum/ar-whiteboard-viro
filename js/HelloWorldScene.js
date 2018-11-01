'use strict';

import React, { Component } from 'react';

import {View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableHighlight} from 'react-native'
import {ViroARSceneNavigator} from "react-viro";



var InitialARScene = require('./KaizenBoardEntry');
var UNSET = "UNSET";
var AR = "AR";
var boardPin = "";
var defaultNavigatorType = UNSET;

var sharedProps = {
    apiKey:"2960EB0C-18D5-49A0-9BE2-D418371F615D",
    boardPin : boardPin
};
class BoardIdentification extends Component {

    constructor() {
        super();
        this.state = {
            sharedProps : sharedProps,
            boardPin : boardPin,
            navigatorType : defaultNavigatorType
        };
    }

    state = {
        pin: ''
    }

    handlePin = (text) => {
        this.setState({ pin: text })
    }

    login = (pin) => {
        alert(' Board Pin: ' + pin)
    }

    render() {

      if (this.state.navigatorType == UNSET) {
          return (
              <View style = {styles.container}>

                  <TextInput style = {styles.input}
                             underlineColorAndroid = "transparent"
                             placeholder = "Board Pin"
                             placeholderTextColor = "#9a73ef"
                             autoCapitalize = "none"
                             onChangeText = {this.handlePin}/>

                  <TouchableOpacity
                      style = {styles.submitButton}
                      onPress = {
                          () => this.login(this.state.pin)
                      }>
                      <Text style = {styles.submitButtonText}> Submit </Text>
                  </TouchableOpacity>

                  <TouchableHighlight style={styles.submitButton}
                                      onPress={this._getExperienceButtonOnPress(AR)}
                                      underlayColor={'#68a0ff'} >

                      <Text style={styles.submitButtonText}>Enter AR</Text>
                  </TouchableHighlight>
              </View>
          )
        } else if (this.state.navigatorType == AR) {
            return this._getARNavigator();
        }


    }

    _getExperienceButtonOnPress(navigatorType) {
        return () => {
            this.setState({
                navigatorType : navigatorType
            })
        }
    }

    // Returns the ViroARSceneNavigator which will start the AR experience
    _getARNavigator() {
        return (
            <ViroARSceneNavigator {...this.state.sharedProps}
                                  initialScene={{scene: InitialARScene}}  />
        );
    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 350
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    }
});

module.exports = BoardIdentification;
