import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToolShortcutItem from './ToolShortcutItem/ToolShortcutItem';
import FrameShortcutItem from './FrameShortcutItem/FrameShortcutItem';
import './KeyBoardShortcutsModal.scss';

class ShortcutsModal extends Component {
  state = {
    tools: [],
    activeTool: 0,
    frames: [],
    activeFrameShortcut: 0,
  };

  makeActive = (index) => {
    const {
      updateActiveTool,
      updateActiveFrameShortcut,
      activeBlock,
    } = this.props;
    const { tools, frames } = this.state;
    if (activeBlock === 'tools') {
      this.setState({
        activeTool: index,
      });
      updateActiveTool(tools[index].dataset.tool);
    } else if (activeBlock === 'frames') {
      this.setState({
        activeFrameShortcut: index,
      });
      updateActiveFrameShortcut(frames[index].dataset.action);
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
      toggleModal, toolsData, framesShortcuts, activeBlock,
    } = this.props;
    const {
      tools, activeTool, frames, activeFrameShortcut,
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
  activeBlock: PropTypes.string.isRequired,
  framesShortcuts: PropTypes.instanceOf(Object).isRequired,
};

export default ShortcutsModal;
