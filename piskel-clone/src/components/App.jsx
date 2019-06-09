import React, { Component, Fragment } from 'react';
import NavBar from './NavBar/NavBar';
import Main from './Main/Main';
import './App.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <NavBar />
        <Main />
      </Fragment>
    );
  }
}

export default App;
