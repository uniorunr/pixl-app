import React, { Component } from 'react';
import './ToolButton.scss';
import PropTypes from 'prop-types';

class ToolButton extends Component {
  makeActive = () => {
    const { updateCurrentTool, id } = this.props;
    updateCurrentTool(id);
  };

  render() {
    const {
      buttonClass, id, iconClass, shortcut,
    } = this.props;
    return (
      <div className="tools__container">
        <button
          className={buttonClass}
          id={id}
          data-listener="true"
          type="button"
          onClick={this.makeActive}
        >
          <i className={iconClass} />
        </button>
        <div className="tool__tooltip">{`${id} (${shortcut})`}</div>
      </div>
    );
  }
}

ToolButton.propTypes = {
  buttonClass: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  updateCurrentTool: PropTypes.func.isRequired,
  shortcut: PropTypes.string.isRequired,
};

export default ToolButton;
