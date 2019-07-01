import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FrameShortcutItem.scss';

class FrameShortcutItem extends Component {
  activate = () => {
    const { index, makeActive } = this.props;
    makeActive(index);
  };

  render() {
    const {
      iconClass,
      name,
      active,
      frames,
      prefix,
      index,
      keyCode,
      id,
    } = this.props;

    return (
      <div
        role="presentation"
        className="shortcuts-modal__row"
        data-action={id}
        onClick={this.activate}
      >
        <div
          className={`shortcuts-modal__tool ${
            active ? 'shortcuts-modal__tool_active' : ''
          }`}
          data-action={id}
          ref={(ref) => {
            if (ref) {
              frames[index] = ref;
            }
          }}
        >
          <i className={iconClass} />
          <span>{name}</span>
          <span>-</span>
          <span className="shortcuts-modal__shortcut">
            <span className="shortcuts-modal__prefix">{`${prefix} + `}</span>
            {keyCode}
          </span>
        </div>
      </div>
    );
  }
}

FrameShortcutItem.propTypes = {
  iconClass: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  makeActive: PropTypes.func.isRequired,
  keyCode: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  frames: PropTypes.instanceOf(Array).isRequired,
  prefix: PropTypes.string.isRequired,
};

export default FrameShortcutItem;
