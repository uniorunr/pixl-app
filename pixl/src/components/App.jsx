import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as actions from '../actions/actions';
import NavBar from './NavBar/NavBar';
import Main from './Main/Main';
import LandingPage from './LandingPage/LandingPage';
import './App.scss';
import FireBase from '../firebase/firebase';
import appDataJSON from '../reducers/appData.json';

FireBase.init();

class App extends Component {
  state = {
    layersShortcuts:
      JSON.parse(sessionStorage.getItem('layersShortcuts'))
      || JSON.parse(JSON.stringify(appDataJSON)).layers,
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
    const { layersShortcuts } = this.state;

    const { section } = this.props;

    return (
      <Fragment>
        <NavBar
          layersShortcuts={layersShortcuts}
          updateLayersShortcuts={this.updateLayersShortcuts}
        />
        {section === 'landing' ? (
          <LandingPage />
        ) : (
          <Main layersShortcuts={layersShortcuts} />
        )}
      </Fragment>
    );
  }
}

App.propTypes = {
  section: PropTypes.string.isRequired,
  updateUserData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  section: state.section,
});

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
