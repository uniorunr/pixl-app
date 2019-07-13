import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import NavBar from './NavBar/NavBar';
import Main from './Main/Main';
import LandingPage from './LandingPage/LandingPage';
import './App.scss';
import FireBase from '../firebase/firebase';
import appDataJSON from '../reducers/appData.json';
import * as actions from '../actions/actions';

FireBase.init();

class App extends Component {
  state = {
    framesShortcuts:
      JSON.parse(sessionStorage.getItem('framesShortcuts'))
      || JSON.parse(JSON.stringify(appDataJSON)).frames,
    layersShortcuts:
      JSON.parse(sessionStorage.getItem('layersShortcuts'))
      || JSON.parse(JSON.stringify(appDataJSON)).layers,
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
    const { updateUserData } = this.props;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        updateUserData(user);
      }
    });
  };

  render() {
    const { toolsData, framesShortcuts, layersShortcuts } = this.state;

    const { section } = this.props;

    return (
      <Fragment>
        <NavBar
          toolsData={toolsData}
          framesShortcuts={framesShortcuts}
          layersShortcuts={layersShortcuts}
          updateToolsData={this.updateToolsData}
          updateFrameShortcuts={this.updateFrameShortcuts}
          updateLayersShortcuts={this.updateLayersShortcuts}
        />
        {section === 'landing' ? (
          <LandingPage />
        ) : (
          <Main
            toolsData={toolsData}
            framesShortcuts={framesShortcuts}
            layersShortcuts={layersShortcuts}
          />
        )}
      </Fragment>
    );
  }
}

App.propTypes = {
  section: PropTypes.string.isRequired,
  updateUserData: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  const { changeSection, updateUserData } = bindActionCreators(
    actions,
    dispatch,
  );
  return {
    changeSection: (value) => {
      changeSection(value);
    },
    updateUserData: (data) => {
      updateUserData(data);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
