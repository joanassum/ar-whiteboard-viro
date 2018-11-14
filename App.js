import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import ViroEntry from "./js/ViroEntry";
import LoginScreen from "./js/LoginScreen";

class App extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="login"
                 component={LoginScreen}
                 title="Login"
                 initial
          />
          <Scene
            key="viro"
            component={ViroEntry}
            title="Kaizen AR"
          />
        </Scene>
      </Router>
    );
  }
}

export default App;
