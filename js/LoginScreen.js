import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {getBoardIdMapping, setBoardID} from "./backend/backendController";

class LoginScreen extends Component {

    disabled = true;

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
    this.setState({ board_pin: text });
    this.disabled = false;
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
        <View style={styles.container}>
            <Text style={styles.description}>
                Kaizen AR
            </Text>
            <Text style={styles.description}>
                Augmenting Efficiency
            </Text>

                <TouchableOpacity activeOpacity={this.disabled ? 1 : 0.7} onPress={!this.disabled && this.onPress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>ENTER AR</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPressKaizenImprov}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>KAIZEN IMPROVEMENT</Text>
                    </View>
                </TouchableOpacity>
                <TextInput
                    underlineColorAndroid={'transparent'}
                    style={styles.searchInput}
                    value={this.state.searchString}
                    onChange={this._onSearchTextChanged}
                    placeholder='Enter Username'/>
            <TextInput
                underlineColorAndroid={'transparent'}
                style={styles.searchInput}
                value={this.state.searchString}
                onChange={this._onSearchTextChanged}
                secureTextEntry={true}
                placeholder='Enter Password'/>
            <TouchableOpacity onPress={this.handlePin}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </View>
            </TouchableOpacity>

            <Image source={require('./res/Logo.png')} style={styles.image}/>
        </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 20,
        marginTop: 30,
        alignItems: 'center',
    },
    searchInput: {
        height: 36,
        width: 150,
        padding: 4,
        marginRight: 5,
        marginBottom: 15,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    image: {
        resizeMode: 'contain',
        width: 333,
        height: 249,
    },
    button: {
        marginBottom: 15,
        alignItems: 'center',
        backgroundColor: '#48BBEC',
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 4, // Android
        justifyContent: 'center',
        borderRadius: 2,
        padding: 0
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        padding: 8,
        fontWeight: '500',
    },
});
