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

FireBase.init();

class App extends Component {
  componentDidMount = () => {
    const { updateUserData } = this.props;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        updateUserData(user);
      }
    });
  };

  render() {
    const { section } = this.props;

    return (
      <Fragment>
        <NavBar />
        {section === 'landing' ? <LandingPage /> : <Main />}
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
  const { updateUserData } = bindActionCreators(actions, dispatch);
  return {
    updateUserData: (data) => {
      updateUserData(data);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
