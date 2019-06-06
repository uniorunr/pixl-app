import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Canvas.scss';

class Canvas extends Component {
  constructor() {
    super();

    this.state = {
      canvas: null,
      context: null,
      canvasState: {},
      paint: null,
    };
  }

  draw = (x, y) => {
    const { canvasState, context } = this.state;
    const { pixelsPerCanvas, width } = this.props;
    const pixelSize = width / pixelsPerCanvas;

    if (!canvasState[`${x}${y}`]) {
      const rectangle = new Path2D();
      context.strokeStyle = 'black';

      rectangle.rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      canvasState[`${x}${y}`] = 'filled';
      context.fill(rectangle);
    }
  };

  move = (pageX, pageY) => {
    const { canvas } = this.state;
    const { pixelsPerCanvas, width } = this.props;
    const pixelSize = width / pixelsPerCanvas;

    const x = Math.floor((pageX - canvas.offsetLeft) / pixelSize);
    const y = Math.floor((pageY - canvas.offsetTop) / pixelSize);
    this.draw(x, y);
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
