import React, { Component } from 'react';
import mainContainer from "./js/containers/mainContainer";
import configureStore from "./js/store/configureStore";
import { Provider } from "react-redux";


const store = configureStore({
  mainReducer: { test: "test" }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <mainContainer />
        </Provider>
      </div>
    );
  }
}

export default App;

