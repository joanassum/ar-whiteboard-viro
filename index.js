import { AppRegistry } from 'react-native';
import React from 'react';
import MainContainer from './js/containers/MainContainer';
import configureStore from "./js/store/configureStore";
import { Provider } from "react-redux";

const store = configureStore({
  mainReducer: {boardId: "SkS6g4qa"}
});

const ReduxApp = () => (
  <Provider store={store}>
    <MainContainer />
  </Provider>
);

AppRegistry.registerComponent('ViroSample', () => ReduxApp);

// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent('ViroSample', () => ReduxApp);
