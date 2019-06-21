import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CanvasSize.scss';

class CanvasSize extends Component {
  render() {
    const { handlePixelsPerCanvas } = this.props;
    return (
      <form className="canvas-size-controls" name="canvas-size-controls">
        <label htmlFor="canvas-32">
          32
          <input
            type="radio"
            id="canvas-32"
            name="radio"
            value="32"
            onChange={handlePixelsPerCanvas}
          />
        </label>

        <label htmlFor="canvas-64">
          64
          <input
            type="radio"
            id="canvas-64"
            name="radio"
            value="64"
            onChange={handlePixelsPerCanvas}
            defaultChecked
          />
        </label>

        <label htmlFor="canvas-128">
          128
          <input
            type="radio"
            id="canvas-128"
            name="radio"
            value="128"
            onChange={handlePixelsPerCanvas}
          />
        </label>
      </form>
    );
  }
}

CanvasSize.propTypes = {
  handlePixelsPerCanvas: PropTypes.func.isRequired,
};

export default CanvasSize;
