import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Canvas.scss';
import connectTwoPoints from './canvasUtils';

class Canvas extends Component {
  constructor() {
    super();

    this.state = {
      canvas: null,
      context: null,
      paint: null,
      currX: null,
      lastY: null,
    };
  }

  draw = (x, y, lastX, lastY) => {
    const { context, paint } = this.state;
    const { pixelsPerCanvas, width } = this.props;
    const pixelSize = width / pixelsPerCanvas;
    context.strokeStyle = 'black';

    if ((Math.abs(x - lastX) > 1 || Math.abs(y - lastY) > 1) && !!paint) {
      connectTwoPoints(x, y, lastX, lastY, pixelSize, context);
    } else {
      const rectangle = new Path2D();
      rectangle.rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      context.fill(rectangle);
    }
  };

  move = (pageX, pageY) => {
    const { canvas, currX, lastY } = this.state;
    const { pixelsPerCanvas, width } = this.props;
    const pixelSize = width / pixelsPerCanvas;

    const x = Math.floor((pageX - canvas.offsetLeft) / pixelSize);
    const y = Math.floor((pageY - canvas.offsetTop) / pixelSize);
    this.draw(x, y, currX, lastY);
    this.updateLastCoordinates(x, y);
  };

  deactivatePainting = () => {
    this.setState({
      paint: false,
    });
  };

  handleMouseDown = ({ pageX, pageY }) => {
    this.setState({
      paint: true,
    });
    this.move(pageX, pageY);
  };

  handleMouseMove = ({ pageX, pageY }) => {
    const { paint } = this.state;

    if (paint) {
      this.move(pageX, pageY);
    }
  };

  updateLastCoordinates = (x, y) => {
    this.setState({
      currX: x,
      lastY: y,
    });
  };

  componentDidMount = () => {
    this.setState({
      canvas: document.getElementById('canvas'),
      context: document.getElementById('canvas').getContext('2d'),
    });
  };

  render() {
    const { width, height } = this.props;

    return (
      <section className="canvas-section">
        <canvas
          className="canvas-section__canvas"
          id="canvas"
          width={width}
          height={height}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.deactivatePainting}
          onMouseLeave={this.deactivatePainting}
        />
      </section>
    );
  }
}

Canvas.propTypes = {
  pixelsPerCanvas: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Canvas;
