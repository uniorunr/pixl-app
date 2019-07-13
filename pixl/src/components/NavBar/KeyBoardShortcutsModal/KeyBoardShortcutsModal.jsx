import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ToolShortcutItem from './ToolShortcutItem/ToolShortcutItem';
import FrameShortcutItem from './FrameShortcutItem/FrameShortcutItem';
import LayerShortcutItem from './LayerShortcutItem/LayerShortcutItem';
import './KeyBoardShortcutsModal.scss';

class ShortcutsModal extends Component {
  state = {
    tools: [],
    frames: [],
    layers: [],
    activeTool: 0,
    activeFrameShortcut: 0,
    activeLayerShortcut: 0,
  };

  makeActive = (index, type) => {
    const {
      updateActiveTool,
      updateActiveFrameShortcut,
      updateActiveLayerShortcut,
      activeBlock,
    } = this.props;
    const { tools, frames, layers } = this.state;
    if (activeBlock === 'tools' && type === 'tools') {
      this.setState({
        activeTool: index,
      });
      updateActiveTool(tools[index].dataset.tool);
    } else if (activeBlock === 'frames' && type === 'frames') {
      this.setState({
        activeFrameShortcut: index,
      });
      updateActiveFrameShortcut(frames[index].dataset.action);
    } else if (activeBlock === 'layers' && type === 'layers') {
      this.setState({
        activeLayerShortcut: index,
      });
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
      toggleModal,
      toolsData,
      framesShortcuts,
      activeBlock,
      layersShortcuts,
    } = this.props;
    const {
      tools,
      activeTool,
      frames,
      layers,
      activeFrameShortcut,
      activeLayerShortcut,
    } = this.state;

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
                iconClass={toolsData[id].iconClass}
                toolName={toolsData[id].name}
                key={id}
                active={index === activeTool}
                tools={tools}
                index={index}
                makeActive={this.makeActive}
                keyCode={toolsData[id].shortcut}
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
                active={index === activeFrameShortcut}
                id={id}
                key={id}
                frames={frames}
                name={framesShortcuts[id].name}
                iconClass={framesShortcuts[id].iconClass}
                index={index}
                prefix={framesShortcuts[id].prefix}
                keyCode={framesShortcuts[id].shortcut}
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
                active={index === activeLayerShortcut}
                id={id}
                key={id}
                layers={layers}
                name={layersShortcuts[id].name}
                iconClass={layersShortcuts[id].iconClass}
                index={index}
                prefix={layersShortcuts[id].prefix}
                keyCode={layersShortcuts[id].shortcut}
                makeActive={this.makeActive}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="shortcuts-modal__close"
          onClick={toggleModal}
        >
          <span>x</span>
        </button>
      </section>
    );
  }
}

ShortcutsModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  toolsData: PropTypes.instanceOf(Object).isRequired,
  updateActiveTool: PropTypes.func.isRequired,
  updateActiveBlock: PropTypes.func.isRequired,
  updateActiveFrameShortcut: PropTypes.func.isRequired,
  updateActiveLayerShortcut: PropTypes.func.isRequired,
  activeBlock: PropTypes.string.isRequired,
  framesShortcuts: PropTypes.instanceOf(Object).isRequired,
  layersShortcuts: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  toolsData: state.tools.toolsData,
});

export default connect(mapStateToProps)(ShortcutsModal);
