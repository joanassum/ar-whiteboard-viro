import React, { Component } from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableHighlight} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {getBoardIdMapping, setBoardID} from "./backend/backendController";

class LoginScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      board_pin : "",
    };

    this.onPress = this.onPress.bind(this);
    this.handlePin = this.handlePin.bind(this);
    this.submitPin = this.submitPin.bind(this);
  }

  handlePin(text) {
    this.setState({ board_pin: text })
  }

  submitPin(){
    if(!isNaN(this.state.board_pin) && this.state.board_pin.length === 6){
      //fetch call
      getBoardIdMapping(this.state.board_pin).then((response) => {
        //dispatch
        setBoardID(response);
        this.props.setBoardId(response);
      });
    }
  }

  onPress() {
   // console.log("Enter the APP: " + this.state.board_pin);
    Actions.viro();
  }

  render() {
    return (
      <View style = {styles.container}>

        <TextInput style = {styles.input}
                   placeholder = "Board Pin"
                   autoCapitalize = "none"
                   onChangeText = {this.handlePin}/>

        <TouchableOpacity
          style = {styles.submitButton}
          onPress = {this.submitPin}>
          <Text style = {styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>

        <TouchableHighlight style={styles.submitButton}
                            onPress={this.onPress}
                            underlayColor={'#68a0ff'} >

          <Text style={styles.submitButtonText}>Enter AR</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default LoginScreen;

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
