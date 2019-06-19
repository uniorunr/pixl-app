import React, { Component } from 'react';
import './ToolButton.scss';
import PropTypes from 'prop-types';

class ToolButton extends Component {
  render() {
    const {
      buttonClass,
      id,
      iconClass,
      onClickHandler,
      onKeyDownHandler,
    } = this.props;
    return (
      <button
        className={buttonClass}
        id={id}
        data-listener="true"
        type="button"
        onClick={onClickHandler}
        onKeyDown={onKeyDownHandler}
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
  onClickHandler: PropTypes.func.isRequired,
  onKeyDownHandler: PropTypes.func.isRequired,
};

export default ToolButton;
