import React, { Component, Fragment } from 'react';
import './NavBar.scss';
import PropTypes from 'prop-types';
import Logo from '../../assets/favicon.png';
import FireBase from '../../firebase/firebase';
import UserInfo from './UserInfo/UserInfo';
import ShortcutsModal from './KeyBoardShortcutsModal/KeyBoardShortcutsModal';

class NavBar extends Component {
  state = {
    modalActive: false,
    activeTool: 'pen',
  };

  componentDidMount() {
    const { toolsData, updateCurrentTool, updateToolsData } = this.props;
    document.addEventListener('keydown', ({ code }) => {
      const { modalActive, activeTool } = this.state;
      if (!modalActive) {
        const toolKeys = Object.keys(toolsData);
        const targetTool = toolKeys.find(id => toolsData[id].shortcut === code);
        if (targetTool) {
          updateCurrentTool(targetTool);
        }
      } else {
        const shortcuts = Object.keys(toolsData).map(
          id => toolsData[id].shortcut,
        );
        if (!shortcuts.includes(code)) {
          toolsData[activeTool].shortcut = code;
          updateToolsData(toolsData);
          sessionStorage.setItem('toolsData', JSON.stringify(toolsData));
        }
      }
    });
  }

  updateActiveTool = (tool) => {
    this.setState({
      activeTool: tool,
    });
  };

  toggleModal = () => {
    const { modalActive } = this.state;
    this.setState({
      modalActive: !modalActive,
    });
  };

  handleSignIn = async () => {
    const { updateSignInState } = this.props;
    updateSignInState('Signing in...');
    await FireBase.auth();
  };

  render() {
    const { userData, signInState, toolsData } = this.props;
    const { modalActive } = this.state;

    return (
      <Fragment>
        <div className="navbar">
          <nav className="navbar__content">
            <h1 className="navbar__logo">
              <a href="/">
                <img src={Logo} alt="Pixl logo" />
                <span>Pixl!</span>
              </a>
            </h1>
            <button
              className="navbar__faq"
              type="button"
              onClick={this.toggleModal}
            >
              <i className="fas fa-question" />
            </button>
            {!userData ? (
              <button
                className="navbar__sign-in-button"
                type="button"
                onClick={this.handleSignIn}
              >
                <span>{signInState || 'Sign in'}</span>
              </button>
            ) : (
              <UserInfo src={userData.photoURL} />
            )}
          </nav>
        </div>
        {modalActive ? (
          <ShortcutsModal
            toggleModal={this.toggleModal}
            toolsData={toolsData}
            updateActiveTool={this.updateActiveTool}
          />
        ) : null}
      </Fragment>
    );
  }
}

NavBar.propTypes = {
  userData: PropTypes.instanceOf(Object),
  updateSignInState: PropTypes.func,
  signInState: PropTypes.string,
  toolsData: PropTypes.instanceOf(Object).isRequired,
  updateCurrentTool: PropTypes.func.isRequired,
  updateToolsData: PropTypes.instanceOf(Object).isRequired,
};

NavBar.defaultProps = {
  userData: null,
  signInState: null,
  updateSignInState: null,
};

export default NavBar;
