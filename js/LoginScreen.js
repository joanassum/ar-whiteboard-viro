import React, { Component } from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableHighlight, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {getBoardIdMapping, setBoardID} from "./backend/backendController";

class LoginScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      board_pin : "",
    };

    this.onPress = this.onPress.bind(this);
    this.onPressKaizenImprov = this.onPressKaizenImprov.bind(this);
    this.handlePin = this.handlePin.bind(this);
    this.submitPin = this.submitPin.bind(this);
  }

  handlePin(text) {
    this.setState({ board_pin: text })
  }

  submitPin(){
    alert("Submitted: " + this.state.board_pin);
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
    Actions.viro();
  }

  onPressKaizenImprov() {
    Actions.improvement();
  }

  render() {
    return (
      <View style = {styles.container}>

     <TouchableHighlight style={styles.title}
      underlayColor={'#68a0ff'} >

          <Text style={styles.titleText}>Kaizen AR</Text>
      </TouchableHighlight>

          <TouchableHighlight style={styles.title}
      underlayColor={'#68a0ff'} >
          <Text style={styles.NontitleText}>Augment Efficiency</Text>
      </TouchableHighlight>

      <Image style={styles.stretch}
             resizeMode={"center"}
             height={200}
             width={400}
      source={require('./res/Logo.png')}
      />

      <TouchableHighlight style={styles.submitButton}
      onPress={this.onPress}
      underlayColor={'#68a0ff'} >

      <Text style={styles.submitButtonText}>Enter AR</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.submitButton}
                            onPress={this.onPressKaizenImprov}
                            underlayColor={'#68a0ff'} >

      <Text style={styles.submitButtonText}>Kaizen Improvements</Text>
      </TouchableHighlight>

        <TextInput style = {styles.input}
                   placeholder = "Board Pin"
                   autoCapitalize = "none"
                   onChangeText = {this.handlePin}/>

        <TouchableOpacity
          style = {styles.submitButton}
          onPress = {this.submitPin}>
          <Text style = {styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 0
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
    title: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    titleText: {
      color: 'white',
      fontSize: 20,
        textAlign: 'center',
    },
    NontitleText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    stretch: {
    },
  submitButtonText: {
    color: 'white'
  }
});
