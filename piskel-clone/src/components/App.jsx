import React, { Component, Fragment } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import NavBar from './NavBar/NavBar';
import Main from './Main/Main';
import './App.scss';
import FireBase from '../firebase/firebase';
import appDataJSON from './appData.json';

FireBase.init();

class App extends Component {
  state = {
    userData: null,
    signInState: null,
    toolsData:
      JSON.parse(sessionStorage.getItem('toolsData'))
      || JSON.parse(JSON.stringify(appDataJSON)).tools,
    currToolId: 'pen',
    framesShortcuts:
      JSON.parse(sessionStorage.getItem('framesShortcuts'))
      || JSON.parse(JSON.stringify(appDataJSON)).frames,
  };

  updateCurrentTool = (tool) => {
    this.setState({
      currToolId: tool,
    });
  };

  updateToolsData = (data) => {
    this.setState({
      toolsData: data,
    });
  };

  updateFrameShortcuts = (data) => {
    this.setState({
      framesShortcuts: data,
    });
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userData: user,
          signInState: null,
        });
      }
    });
  };

  updateSignInState = (state) => {
    this.setState({
      signInState: state,
    });
  };

  render() {
    const {
      userData,
      signInState,
      toolsData,
      currToolId,
      framesShortcuts,
    } = this.state;

    return (
      <Fragment>
        <NavBar
          userData={userData}
          updateSignInState={this.updateSignInState}
          signInState={signInState}
          toolsData={toolsData}
          framesShortcuts={framesShortcuts}
          updateCurrentTool={this.updateCurrentTool}
          updateToolsData={this.updateToolsData}
          updateFrameShortcuts={this.updateFrameShortcuts}
        />
        <Main
          toolsData={toolsData}
          currToolId={currToolId}
          updateCurrentTool={this.updateCurrentTool}
          framesShortcuts={framesShortcuts}
        />
      </Fragment>
    );
  }
}

export default App;
