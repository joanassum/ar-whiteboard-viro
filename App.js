import React, { Component } from 'react';
import { Router, Scene, Modal } from 'react-native-router-flux';
import ViroEntry from "./js/ViroEntry";
import LoginContainer from "./js/containers/LoginContainer";
import CommentContainer from "./js/containers/CommentContainer";
import KaizenImprovContainer from "./js/containers/KaizenImprovContainer";

class App extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <Router>
        <Modal hideNavBar>
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
            <Scene
              key="improvement"
              component={KaizenImprovContainer}
              title="Kaizen Improvement"
            />
          </Scene>
          <Scene key="commentModal" component={CommentContainer} />
        </Modal>
      </Router>
    );
  }
}

export default App;
