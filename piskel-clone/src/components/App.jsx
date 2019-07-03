import React, { Component, Fragment } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import NavBar from './NavBar/NavBar';
import Main from './Main/Main';
import LandingPage from './LandingPage/LandingPage';
import './App.scss';
import FireBase from '../firebase/firebase';
import appDataJSON from './appData.json';

FireBase.init();

class App extends Component {
  state = {
    userData: null,
    signInState: null,
    section: sessionStorage.getItem('section') || 'landing',
    toolsData:
      JSON.parse(sessionStorage.getItem('toolsData'))
      || JSON.parse(JSON.stringify(appDataJSON)).tools,
    currToolId: 'pen',
    framesShortcuts:
      JSON.parse(sessionStorage.getItem('framesShortcuts'))
      || JSON.parse(JSON.stringify(appDataJSON)).frames,
    layersShortcuts:
      JSON.parse(sessionStorage.getItem('layersShortcuts'))
      || JSON.parse(JSON.stringify(appDataJSON)).layers,
  };

  toggleSection = (state) => {
    this.setState({
      section: state,
    });
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

  updateLayersShortcuts = (data) => {
    this.setState({
      layersShortcuts: data,
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
      layersShortcuts,
      section,
    } = this.state;

    return (
      <Fragment>
        <NavBar
          userData={userData}
          updateSignInState={this.updateSignInState}
          signInState={signInState}
          toolsData={toolsData}
          framesShortcuts={framesShortcuts}
          layersShortcuts={layersShortcuts}
          updateCurrentTool={this.updateCurrentTool}
          updateToolsData={this.updateToolsData}
          updateFrameShortcuts={this.updateFrameShortcuts}
          updateLayersShortcuts={this.updateLayersShortcuts}
          toggleSection={this.toggleSection}
        />
        {section === 'landing' ? (
          <LandingPage toggleSection={this.toggleSection} />
        ) : (
          <Main
            toolsData={toolsData}
            currToolId={currToolId}
            updateCurrentTool={this.updateCurrentTool}
            framesShortcuts={framesShortcuts}
            layersShortcuts={layersShortcuts}
          />
        )}
      </Fragment>
    );
  }
}

export default App;
