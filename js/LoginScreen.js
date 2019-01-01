import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {getUserIdMapping} from "./backend/backendController";

class LoginScreen extends Component {

    disabled = true;

  constructor(props){

    super(props);

    this.state = {
      userName: "",
      password: "",
    };

    this.onPress = this.onPress.bind(this);
    this.onPressKaizenImprov = this.onPressKaizenImprov.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.submitPin = this.submitPin.bind(this);
  }


  handleUsername(text) {
    this.setState({ userName: text });
    this.disabled = false;
  }

  handlePassword(text) {
    this.setState({ password: text });
    this.disabled = false;
  }

  submitPin(){
    alert("Logged On User: " + this.state.userName);
    //Refactor to validate input
    if(this.state.userName !== ""){
      //fetch call
      getUserIdMapping(this.state.userName, this.state.password).then((response) => {
        this.props.setUserId(response);
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
                    value={this.state.userName}
                    onChange={this.handleUsername}
                    placeholder='Enter Username'/>
            <TextInput
                underlineColorAndroid={'transparent'}
                style={styles.searchInput}
                value={this.state.password}
                onChange={this.handlePassword}
                secureTextEntry={true}
                placeholder='Enter Password'/>
            <TouchableOpacity onPress={this.submitPin}>
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
