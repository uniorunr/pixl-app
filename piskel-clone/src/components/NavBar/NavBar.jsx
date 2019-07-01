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
    activeBlock: 'tools',
    activeFrameShortcut: 'duplicate',
  };

  componentDidMount() {
    const {
      toolsData,
      framesShortcuts,
      updateCurrentTool,
      updateToolsData,
      updateFrameShortcuts,
    } = this.props;
    document.addEventListener('keydown', ({ code }) => {
      const {
        modalActive,
        activeTool,
        activeFrameShortcut,
        activeBlock,
      } = this.state;
      if (!modalActive) {
        const toolKeys = Object.keys(toolsData);
        const targetTool = toolKeys.find(id => toolsData[id].shortcut === code);
        if (targetTool) {
          updateCurrentTool(targetTool);
        }
      } else if (activeBlock === 'tools') {
        const shortcuts = Object.keys(toolsData).map(
          id => toolsData[id].shortcut,
        );
        if (!shortcuts.includes(code)) {
          toolsData[activeTool].shortcut = code;
          updateToolsData(toolsData);
          sessionStorage.setItem('toolsData', JSON.stringify(toolsData));
        }
      } else if (activeBlock === 'frames') {
        const shortcuts = Object.keys(framesShortcuts).map(
          id => framesShortcuts[id].shortcut,
        );
        if (
          !shortcuts.includes(code)
          && !code.toLowerCase().includes('shift')
        ) {
          framesShortcuts[activeFrameShortcut].shortcut = code;
          updateFrameShortcuts(framesShortcuts);
          sessionStorage.setItem(
            'framesShortcuts',
            JSON.stringify(framesShortcuts),
          );
        }
      }
    });
  }

  updateActiveBlock = (block) => {
    this.setState({
      activeBlock: block,
    });
  };

  updateActiveTool = (tool) => {
    this.setState({
      activeTool: tool,
    });
  };

  updateActiveFrameShortcut = (shortcut) => {
    this.setState({
      activeFrameShortcut: shortcut,
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
    const {
      userData, signInState, toolsData, framesShortcuts,
    } = this.props;
    const { modalActive, activeBlock } = this.state;

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
            framesShortcuts={framesShortcuts}
            activeBlock={activeBlock}
            updateActiveTool={this.updateActiveTool}
            updateActiveFrameShortcut={this.updateActiveFrameShortcut}
            updateActiveBlock={this.updateActiveBlock}
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
  framesShortcuts: PropTypes.instanceOf(Object).isRequired,
  updateFrameShortcuts: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  userData: null,
  signInState: null,
  updateSignInState: null,
};

export default NavBar;
