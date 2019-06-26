import React, { Component, Fragment } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import NavBar from './NavBar/NavBar';
import Main from './Main/Main';
import './App.scss';
import FireBase from '../firebase/firebase';

FireBase.init();

class App extends Component {
  state = {
    userData: null,
    signInState: null,
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
    const { userData, signInState } = this.state;

    return (
      <Fragment>
        <NavBar
          userData={userData}
          updateSignInState={this.updateSignInState}
          signInState={signInState}
        />
        <Main />
      </Fragment>
    );
  }
}

export default App;
