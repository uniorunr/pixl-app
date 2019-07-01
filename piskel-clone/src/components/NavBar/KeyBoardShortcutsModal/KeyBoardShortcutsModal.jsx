import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShortcutItem from './ShortcutItem/ShortcutItem';
import './KeyBoardShortcutsModal.scss';

class ShortcutsModal extends Component {
  state = {
    tools: [],
    activeTool: 0,
  };

  makeActive = (index) => {
    const { updateActiveTool } = this.props;
    const { tools } = this.state;
    this.setState({
      activeTool: index,
    });
    updateActiveTool(tools[index].dataset.tool);
  };

  render() {
    const { toggleModal, toolsData } = this.props;
    const { tools, activeTool } = this.state;

    return (
      <section className="shortcuts-modal">
        <div className="shortcuts-modal__content">
          <h2>Keyboard shortcuts</h2>
          <p>Click on tool and press the key to change the shortcut</p>
          <div className="shortcuts-modal__shortcut-rows">
            {Object.keys(toolsData).map((id, index) => (
              <ShortcutItem
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
};

export default ShortcutsModal;
