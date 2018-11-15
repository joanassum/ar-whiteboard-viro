import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import ViroEntry from "./js/ViroEntry";
import LoginContainer from "./js/containers/LoginContainer";

class App extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="login"
                 component={LoginContainer}
                 title="Login"

          />
          <Scene
            key="viro"
            component={ViroEntry}
            title="Kaizen AR"
            initial
          />
        </Scene>
      </Router>
    );
  }
}

export default App;
