import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ToolShortcutItem.scss';

class ShortcutItem extends Component {
  activate = () => {
    const { index, makeActive } = this.props;
    makeActive(index);
  };

  render() {
    const {
      iconClass,
      toolName,
      active,
      tools,
      index,
      keyCode,
      id,
    } = this.props;

    return (
      <div
        role="presentation"
        className="shortcuts-modal__row"
        onClick={this.activate}
      >
        <div
          className={`shortcuts-modal__tool ${
            active ? 'shortcuts-modal__tool_active' : ''
          }`}
          data-tool={id}
          ref={(ref) => {
            if (ref) {
              tools[index] = ref;
            }
          }}
        >
          <i className={iconClass} />
          <span>{toolName}</span>
          <span>-</span>
          <span className="shortcuts-modal__shortcut">{keyCode}</span>
        </div>
      </div>
    );
  }
}

ShortcutItem.propTypes = {
  iconClass: PropTypes.string.isRequired,
  toolName: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  tools: PropTypes.instanceOf(Array).isRequired,
  index: PropTypes.number.isRequired,
  makeActive: PropTypes.func.isRequired,
  keyCode: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ShortcutItem;
