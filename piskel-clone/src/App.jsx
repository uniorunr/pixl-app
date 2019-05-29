import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar/NavBar';
import './App.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return <NavBar />;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
