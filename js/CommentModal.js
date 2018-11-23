import React, { Component } from 'react';
import {View, Text, StyleSheet,} from 'react-native';
import { Actions } from 'react-native-router-flux';

class CommentModal extends Component {

  constructor(props){
    super(props);

    this.state = {
    };

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    Actions.login();
  }

  render() {
    return (
      <View style = {styles.container}>
          <Text
            style={styles.text}
            onClick={this.onPress}
          >WeWeregonnatest</Text>
      </View>
    );
  }
}

export default CommentModal;

const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontSize: 30,
  }

});
