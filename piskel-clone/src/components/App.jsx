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
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userData: user,
        });
      }
    });
  };

  render() {
    const { userData } = this.state;

    return (
      <Fragment>
        <NavBar userData={userData} />
        <Main />
      </Fragment>
    );
  }
}

export default App;
