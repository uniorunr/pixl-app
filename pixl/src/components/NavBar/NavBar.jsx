import React, { Component, Fragment } from 'react';
import './NavBar.scss';
import PropTypes from 'prop-types';
import Logo from '../../assets/favicon.png';
import FireBase from '../../firebase/firebase';
import UserInfo from './UserInfo/UserInfo';
import ShortcutsModal from './KeyBoardShortcutsModal/KeyBoardShortcutsModal';

const updateShortcut = (shortcutObj, code, index, updateFunc, name) => {
  const currShortcutsObj = shortcutObj;
  const shortcuts = Object.keys(currShortcutsObj).map(
    id => shortcutObj[id].shortcut,
  );
  if (
    !shortcuts.includes(code)
    && !code.toLowerCase().includes('shift')
    && !code.toLowerCase().includes('alt')
  ) {
    currShortcutsObj[index].shortcut = code;
    updateFunc(currShortcutsObj);
    sessionStorage.setItem(name, JSON.stringify(currShortcutsObj));
  }
};

class NavBar extends Component {
  state = {
    modalActive: false,
    activeTool: 'pen',
    activeBlock: 'tools',
    activeFrameShortcut: 'duplicate',
    activeLayerShortcut: 'add',
  };

  componentDidMount() {
    const {
      toolsData,
      framesShortcuts,
      layersShortcuts,
      updateCurrentTool,
      updateToolsData,
      updateFrameShortcuts,
      updateLayersShortcuts,
    } = this.props;
    document.addEventListener('keydown', ({ code, shiftKey, altKey }) => {
      const {
        modalActive,
        activeTool,
        activeFrameShortcut,
        activeLayerShortcut,
        activeBlock,
      } = this.state;
      if (!modalActive && !shiftKey && !altKey) {
        const toolKeys = Object.keys(toolsData);
        const targetTool = toolKeys.find(id => toolsData[id].shortcut === code);
        if (targetTool && !shiftKey && !altKey) {
          updateCurrentTool(targetTool);
        }
      } else if (activeBlock === 'tools' && !shiftKey && !altKey) {
        updateShortcut(
          toolsData,
          code,
          activeTool,
          updateToolsData,
          'toolsData',
        );
      } else if (activeBlock === 'frames' && !altKey) {
        updateShortcut(
          framesShortcuts,
          code,
          activeFrameShortcut,
          updateFrameShortcuts,
          'framesShortcuts',
        );
      } else if (activeBlock === 'layers' && !altKey) {
        updateShortcut(
          layersShortcuts,
          code,
          activeLayerShortcut,
          updateLayersShortcuts,
          'layersShortcuts',
        );
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

  updateActiveLayerShortcut = (shortcut) => {
    this.setState({
      activeLayerShortcut: shortcut,
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

  handleLogoClick = (e) => {
    e.preventDefault();
    const { toggleSection } = this.props;
    toggleSection('landing');
    sessionStorage.setItem('section', 'landing');
  };

  render() {
    const {
      userData,
      signInState,
      toolsData,
      framesShortcuts,
      layersShortcuts,
    } = this.props;
    const { modalActive, activeBlock } = this.state;

    return (
      <Fragment>
        <div className="navbar">
          <nav className="navbar__content">
            <h1 role="presentation" className="navbar__logo">
              <a href="/" onClick={this.handleLogoClick}>
                <img src={Logo} alt="Pixl logo" />
                <span>Pixl!</span>
              </a>
            </h1>
            <div className="navbar__info">
              <button
                className="navbar__faq"
                type="button"
                onClick={this.toggleModal}
              >
                <i className="fas fa-question" />
              </button>
              <div className="navbar__tooltip">
                <span>Info</span>
              </div>
            </div>
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
            layersShortcuts={layersShortcuts}
            activeBlock={activeBlock}
            updateActiveTool={this.updateActiveTool}
            updateActiveFrameShortcut={this.updateActiveFrameShortcut}
            updateActiveBlock={this.updateActiveBlock}
            updateActiveLayerShortcut={this.updateActiveLayerShortcut}
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
  updateToolsData: PropTypes.func.isRequired,
  framesShortcuts: PropTypes.instanceOf(Object).isRequired,
  layersShortcuts: PropTypes.instanceOf(Object).isRequired,
  updateFrameShortcuts: PropTypes.func.isRequired,
  updateLayersShortcuts: PropTypes.func.isRequired,
  toggleSection: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  userData: null,
  signInState: null,
  updateSignInState: null,
};

export default NavBar;
