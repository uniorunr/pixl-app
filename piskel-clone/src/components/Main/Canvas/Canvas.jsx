import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Canvas.scss';
import { moveAndPaint } from './paintTool';

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

  deactivatePainting = () => {
    this.setState({
      paint: false,
    });
  };

  handleMouseDown = ({ pageX, pageY }) => {
    this.setState({
      paint: true,
    });
    moveAndPaint(
      pageX,
      pageY,
      this.state,
      this.props,
      this.updateLastCoordinates,
    );
  };

  handleMouseMove = ({ pageX, pageY }) => {
    const { paint } = this.state;

    if (paint) {
      moveAndPaint(
        pageX,
        pageY,
        this.state,
        this.props,
        this.updateLastCoordinates,
      );
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
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Canvas;
