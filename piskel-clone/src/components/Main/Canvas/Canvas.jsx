import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Canvas.scss';
import { moveAndPaint } from './paintTool';

const activateTool = (toolId) => {
  let tool = null;
  switch (toolId) {
    case 'pen':
      tool = moveAndPaint;
      break;
    default:
      console.error("tool isn't found");
  }
  return tool;
};

class Canvas extends Component {
  constructor() {
    super();

    this.state = {
      canvas: null,
      context: null,
      cursorActive: null,
      currX: null,
      lastY: null,
    };
  }

  deactivateCursor = () => {
    this.setState({
      cursorActive: false,
    });
  };

  handleMouseDown = ({ pageX, pageY }) => {
    const { currToolId } = this.props;
    this.setState({
      cursorActive: true,
    });
    const tool = activateTool(currToolId);
    tool(pageX, pageY, this.state, this.props, this.updateLastCoordinates);
  };

  handleMouseMove = ({ pageX, pageY }) => {
    const { cursorActive } = this.state;
    const { currToolId } = this.props;

    if (cursorActive) {
      const tool = activateTool(currToolId);
      tool(pageX, pageY, this.state, this.props, this.updateLastCoordinates);
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
          onMouseUp={this.deactivateCursor}
          onMouseLeave={this.deactivateCursor}
        />
      </section>
    );
  }
}

Canvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  currToolId: PropTypes.string.isRequired,
};

export default Canvas;
