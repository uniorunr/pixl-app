import React, { Component } from 'react';
import './ToolButton.scss';
import PropTypes from 'prop-types';

class ToolButton extends Component {
  makeActive = () => {
    const { updateCurrentTool, id } = this.props;
    updateCurrentTool(id);
  };

  render() {
    const { buttonClass, id, iconClass } = this.props;
    return (
      <button
        className={buttonClass}
        id={id}
        data-listener="true"
        type="button"
        onClick={this.makeActive}
      >
        <i className={iconClass} />
      </button>
    );
  }
}

ToolButton.propTypes = {
  buttonClass: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  updateCurrentTool: PropTypes.func.isRequired,
};

export default ToolButton;
