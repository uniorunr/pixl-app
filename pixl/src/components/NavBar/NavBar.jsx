import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import './NavBar.scss';
import Logo from '../../assets/favicon.png';
import FireBase from '../../firebase/firebase';
import UserInfo from './UserInfo/UserInfo';
import ShortcutsModal from './KeyBoardShortcutsModal/KeyBoardShortcutsModal';

const updateShortcut = (shortcutObj, code, key, updateFunc, name) => {
  const currShortcutsObj = { ...shortcutObj };
  const shortcuts = Object.keys(currShortcutsObj).map(
    id => currShortcutsObj[id].shortcut,
  );
  if (
    !shortcuts.includes(code)
    && !code.toLowerCase().includes('shift')
    && !code.toLowerCase().includes('alt')
  ) {
    currShortcutsObj[key].shortcut = code;
    updateFunc(currShortcutsObj);
    sessionStorage.setItem(name, JSON.stringify(currShortcutsObj));
  }
};

class NavBar extends Component {
  componentDidMount() {
    const {
      layersShortcuts,
      updateCurrToolId,
      updateToolsData,
      updateFramesShortcuts,
      updateLayersShortcuts,
    } = this.props;
    document.addEventListener('keydown', ({ code, shiftKey, altKey }) => {
      const {
        modalActive,
        activeTool,
        activeFrameShortcut,
        activeLayerShortcut,
        activeBlock,
      } = this.props;
      const { toolsData, framesShortcuts } = this.props;
      if (!modalActive && !shiftKey && !altKey) {
        const toolKeys = Object.keys(toolsData);
        const targetTool = toolKeys.find(id => toolsData[id].shortcut === code);
        if (targetTool && !shiftKey && !altKey) {
          updateCurrToolId(targetTool);
        }
      } else if (activeBlock === 'tools' && !shiftKey && !altKey) {
        updateShortcut(
          toolsData,
          code,
          activeTool,
          updateToolsData,
          'toolsData',
        );
      } else if (activeBlock === 'frames' && !altKey && !shiftKey) {
        updateShortcut(
          framesShortcuts,
          code,
          activeFrameShortcut,
          updateFramesShortcuts,
          'framesShortcuts',
        );
      } else if (activeBlock === 'layers' && !altKey && !shiftKey) {
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

  handleSignIn = async () => {
    const { updateLoginStatus } = this.props;
    updateLoginStatus('Signing in...');
    await FireBase.auth();
  };

  handleLogoClick = (e) => {
    e.preventDefault();
    const { changeSection } = this.props;
    changeSection('landing');
    sessionStorage.setItem('section', 'landing');
  };

  render() {
    const {
      userData,
      signInState,
      modalActive,
      updateShortcutsModalState,
    } = this.props;

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
                onClick={updateShortcutsModalState}
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
        {modalActive ? <ShortcutsModal /> : null}
      </Fragment>
    );
  }
}

NavBar.propTypes = {
  userData: PropTypes.instanceOf(Object),
  signInState: PropTypes.string,
  toolsData: PropTypes.instanceOf(Object).isRequired,
  updateCurrToolId: PropTypes.func.isRequired,
  updateToolsData: PropTypes.func.isRequired,
  framesShortcuts: PropTypes.instanceOf(Object).isRequired,
  layersShortcuts: PropTypes.instanceOf(Object).isRequired,
  updateFramesShortcuts: PropTypes.func.isRequired,
  updateLayersShortcuts: PropTypes.func.isRequired,
  changeSection: PropTypes.func.isRequired,
  updateLoginStatus: PropTypes.func.isRequired,
  modalActive: PropTypes.bool.isRequired,
  activeTool: PropTypes.string.isRequired,
  activeFrameShortcut: PropTypes.string.isRequired,
  activeLayerShortcut: PropTypes.string.isRequired,
  activeBlock: PropTypes.string.isRequired,
  updateShortcutsModalState: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  userData: null,
  signInState: null,
};

const mapStateToProps = state => ({
  section: state.section,
  signInState: state.firebase.signInState,
  userData: state.firebase.userData,
  toolsData: state.tools.toolsData,
  framesShortcuts: state.frames.framesShortcuts,
  layersShortcuts: state.layers.layersShortcuts,
  modalActive: state.shortcuts.modalActive,
  activeTool: state.shortcuts.activeTool,
  activeBlock: state.shortcuts.activeBlock,
  activeFrameShortcut: state.shortcuts.activeFrameShortcut,
  activeLayerShortcut: state.shortcuts.activeLayerShortcut,
});

const mapDispatchToProps = (dispatch) => {
  const {
    changeSection,
    updateLoginStatus,
    updateCurrToolId,
    updateToolsData,
    updateFramesShortcuts,
    updateLayersShortcuts,
    updateShortcutsModalState,
  } = bindActionCreators(actions, dispatch);
  return {
    changeSection: (section) => {
      changeSection(section);
    },
    updateLoginStatus: (status) => {
      updateLoginStatus(status);
    },
    updateCurrToolId: (id) => {
      updateCurrToolId(id);
    },
    updateToolsData: (data) => {
      updateToolsData(data);
    },
    updateFramesShortcuts: (data) => {
      updateFramesShortcuts(data);
    },
    updateLayersShortcuts: (data) => {
      updateLayersShortcuts(data);
    },
    updateShortcutsModalState,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
