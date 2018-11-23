import React, { Component } from 'react';
import { Router, Scene, Modal } from 'react-native-router-flux';
import ViroEntry from "./js/ViroEntry";
import LoginContainer from "./js/containers/LoginContainer";
import CommentModal from "./js/CommentModal";

class App extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <Router>
        <Modal hideNavBar >
          <Scene key="root">
            <Scene
              key="login"
              component={LoginContainer}
              title="Login"
              initial
            />
            <Scene
              key="viro"
              component={ViroEntry}
              title="Kaizen AR"

            />
          </Scene>
          <Scene key="commentModal" component={CommentModal} />
        </Modal>
      </Router>
    );
  }
}

export default App;
