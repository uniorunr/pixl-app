import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/actions';
import ToolShortcutItem from './ToolShortcutItem/ToolShortcutItem';
import FrameShortcutItem from './FrameShortcutItem/FrameShortcutItem';
import LayerShortcutItem from './LayerShortcutItem/LayerShortcutItem';
import './KeyBoardShortcutsModal.scss';

class ShortcutsModal extends Component {
  makeActive = (index, type) => {
    const {
      updateActiveTool,
      updateActiveToolIndex,
      updateActiveFrameShortcut,
      updateActiveFrameShortcutIndex,
      updateActiveLayerShortcut,
      updateActiveLayerShortcutIndex,
      activeBlock,
      tools,
      frames,
      layers,
    } = this.props;

    if (activeBlock === 'tools' && type === 'tools') {
      updateActiveTool(tools[index].dataset.tool);
      updateActiveToolIndex(index);
    } else if (activeBlock === 'frames' && type === 'frames') {
      updateActiveFrameShortcut(frames[index].dataset.action);
      updateActiveFrameShortcutIndex(index);
    } else if (activeBlock === 'layers' && type === 'layers') {
      updateActiveLayerShortcutIndex(index);
      updateActiveLayerShortcut(layers[index].dataset.action);
    }
  };

  clickOnBlock = ({ target }) => {
    const { updateActiveBlock } = this.props;
    let currTarget = target;
    while (!currTarget.dataset.block) {
      currTarget = currTarget.parentElement;
    }
    updateActiveBlock(currTarget.dataset.block);
  };

  render() {
    const {
      updateShortcutsModalState,
      toolsData,
      framesShortcuts,
      activeBlock,
      layersShortcuts,
      activeToolIndex,
      activeFrameShortcutIndex,
      activeLayerShortcutIndex,
    } = this.props;

    return (
      <section className="shortcuts-modal">
        <div className="shortcuts-modal__content">
          <h2>Keyboard shortcuts</h2>
          <p>Click on tool and press the key to change the shortcut</p>
          <h3>Tools</h3>
          <div
            role="presentation"
            className={`shortcuts-modal__shortcut-rows ${
              activeBlock === 'tools'
                ? 'shortcuts-modal__shortcut-rows_active'
                : ''
            }`}
            data-block="tools"
            onClick={this.clickOnBlock}
          >
            {Object.keys(toolsData).map((id, index) => (
              <ToolShortcutItem
                key={id}
                active={index === activeToolIndex}
                index={index}
                makeActive={this.makeActive}
                id={id}
              />
            ))}
          </div>
          <h3>Frames</h3>
          <div
            role="presentation"
            className={`shortcuts-modal__shortcut-rows ${
              activeBlock === 'frames'
                ? 'shortcuts-modal__shortcut-rows_active'
                : ''
            }`}
            onClick={this.clickOnBlock}
            data-block="frames"
          >
            {Object.keys(framesShortcuts).map((id, index) => (
              <FrameShortcutItem
                active={index === activeFrameShortcutIndex}
                id={id}
                key={id}
                index={index}
                makeActive={this.makeActive}
              />
            ))}
          </div>
          <h3>Layers</h3>
          <div
            role="presentation"
            className={`shortcuts-modal__shortcut-rows ${
              activeBlock === 'layers'
                ? 'shortcuts-modal__shortcut-rows_active'
                : ''
            }`}
            onClick={this.clickOnBlock}
            data-block="layers"
          >
            {Object.keys(layersShortcuts).map((id, index) => (
              <LayerShortcutItem
                active={index === activeLayerShortcutIndex}
                id={id}
                key={id}
                index={index}
                makeActive={this.makeActive}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="shortcuts-modal__close"
          onClick={updateShortcutsModalState}
        >
          <span>x</span>
        </button>
      </section>
    );
  }
}

ShortcutsModal.propTypes = {
  updateShortcutsModalState: PropTypes.func.isRequired,
  toolsData: PropTypes.instanceOf(Object).isRequired,
  updateActiveTool: PropTypes.func.isRequired,
  updateActiveToolIndex: PropTypes.func.isRequired,
  updateActiveBlock: PropTypes.func.isRequired,
  updateActiveFrameShortcut: PropTypes.func.isRequired,
  updateActiveFrameShortcutIndex: PropTypes.func.isRequired,
  updateActiveLayerShortcut: PropTypes.func.isRequired,
  updateActiveLayerShortcutIndex: PropTypes.func.isRequired,
  activeBlock: PropTypes.string.isRequired,
  framesShortcuts: PropTypes.instanceOf(Object).isRequired,
  layersShortcuts: PropTypes.instanceOf(Object).isRequired,
  activeToolIndex: PropTypes.number.isRequired,
  activeFrameShortcutIndex: PropTypes.number.isRequired,
  activeLayerShortcutIndex: PropTypes.number.isRequired,
  tools: PropTypes.instanceOf(Array).isRequired,
  frames: PropTypes.instanceOf(Array).isRequired,
  layers: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  toolsData: state.tools.toolsData,
  framesShortcuts: state.frames.framesShortcuts,
  layersShortcuts: state.layers.layersShortcuts,
  activeBlock: state.components.navBar.activeBlock,
  activeToolIndex: state.components.navBar.modalWindow.activeToolIndex,
  activeFrameShortcutIndex:
    state.components.navBar.modalWindow.activeFrameShortcutIndex,
  activeLayerShortcutIndex:
    state.components.navBar.modalWindow.activeLayerShortcutIndex,
  tools: state.components.navBar.modalWindow.toolsShortcutsRefs,
  frames: state.components.navBar.modalWindow.framesShortcutsRefs,
  layers: state.components.navBar.modalWindow.layersShortcutsRefs,
});

const mapDispatchToProps = (dispatch) => {
  const {
    updateShortcutsModalState,
    updateActiveBlock,
    updateActiveTool,
    updateActiveToolIndex,
    updateActiveFrameShortcut,
    updateActiveFrameShortcutIndex,
    updateActiveLayerShortcut,
    updateActiveLayerShortcutIndex,
  } = bindActionCreators(actions, dispatch);
  return {
    updateShortcutsModalState,
    updateActiveBlock: (block) => {
      updateActiveBlock(block);
    },
    updateActiveTool: (id) => {
      updateActiveTool(id);
    },
    updateActiveToolIndex: (index) => {
      updateActiveToolIndex(index);
    },
    updateActiveFrameShortcut: (id) => {
      updateActiveFrameShortcut(id);
    },
    updateActiveFrameShortcutIndex: (index) => {
      updateActiveFrameShortcutIndex(index);
    },
    updateActiveLayerShortcut: (id) => {
      updateActiveLayerShortcut(id);
    },
    updateActiveLayerShortcutIndex: (index) => {
      updateActiveLayerShortcutIndex(index);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShortcutsModal);
