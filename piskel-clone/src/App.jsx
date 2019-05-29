import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar/NavBar';
import Main from './components/Main/Main';
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

ReactDOM.render(<App />, document.getElementById('root'));
