import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Canvas.scss';

class Canvas extends Component {
  render() {
    const { width, height, canvasSize } = this.props;
    console.log(canvasSize);
    return (
      <section className="canvas-section">
        <canvas
          className="canvas-section__canvas"
          id="canvas"
          width={width}
          height={height}
        />
      </section>
    );
  }
}

Canvas.propTypes = {
  canvasSize: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Canvas;
