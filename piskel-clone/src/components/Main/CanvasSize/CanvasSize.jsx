import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CanvasSize.scss';

class CanvasSize extends Component {
  render() {
    const { handleCanvasSize } = this.props;
    return (
      <form name="canvas-size-controls">
        <label htmlFor="canvas-32">
          32
          <input
            type="radio"
            id="canvas-32"
            name="radio"
            value="32"
            onChange={handleCanvasSize}
            defaultChecked
          />
        </label>

        <label htmlFor="canvas-64">
          64
          <input
            type="radio"
            id="canvas-64"
            name="radio"
            value="64"
            onChange={handleCanvasSize}
          />
        </label>

        <label htmlFor="canvas-128">
          128
          <input
            type="radio"
            id="canvas-128"
            name="radio"
            value="128"
            onChange={handleCanvasSize}
          />
        </label>
      </form>
    );
  }
}

CanvasSize.propTypes = {
  handleCanvasSize: PropTypes.func.isRequired,
};

export default CanvasSize;
