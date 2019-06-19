import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Canvas.scss';
import moveAndPaint from './paintTool';
import moveAndErase from './eraserTool';
import pickTheColor from './pickerTool';
import paintBucket from './paintBucketTool';

const activateTool = (toolId) => {
  let tool = null;
  switch (toolId) {
    case 'pen':
      tool = moveAndPaint;
      break;
    case 'eraser':
      tool = moveAndErase;
      break;
    case 'choose-color':
      tool = pickTheColor;
      break;
    case 'paint-bucket':
      tool = paintBucket;
      break;
    default:
      throw new Error("tool isn't found");
  }
  return tool;
};

const translate = (canvas) => {
  const frame = document.querySelector('.frame__canvas_active');
  const ctx = frame.getContext('2d');
  ctx.clearRect(0, 0, frame.width, frame.height);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(canvas, 0, 0, frame.width, frame.height);
};

class Canvas extends Component {
  constructor() {
    super();

    this.canvasRef = React.createRef();

    this.state = {
      cursorActive: null,
      currX: null,
      lastY: null,
    };
  }

  deactivateCursor = () => {
    const { cursorActive } = this.state;
    translate(this.canvasRef.current);

    if (cursorActive) {
      this.setState({
        cursorActive: false,
      });
    }
  };

  handleMouseDown = ({ pageX, pageY }) => {
    const { currToolId, updateColor, primaryColor } = this.props;
    this.setState({
      cursorActive: true,
    });
    const tool = activateTool(currToolId);
    if (
      currToolId === 'pen'
      || currToolId === 'eraser'
      || currToolId === 'choose-color'
    ) {
      const result = tool(
        pageX,
        pageY,
        this.state,
        this.props,
        this.canvasRef.current,
        this.updateLastCoordinates,
      );
      if (result && result !== 'transparent') updateColor(result, 'primary');
    } else {
      paintBucket(pageX, pageY, primaryColor);
    }
  };

  handleMouseMove = ({ pageX, pageY }) => {
    const { cursorActive } = this.state;
    const { currToolId } = this.props;

    if (cursorActive) {
      const tool = activateTool(currToolId);
      if (currToolId !== 'choose-color') {
        tool(
          pageX,
          pageY,
          this.state,
          this.props,
          this.canvasRef.current,
          this.updateLastCoordinates,
        );
        translate(this.canvasRef.current);
      }
    }
  };

  updateLastCoordinates = (x, y) => {
    this.setState({
      currX: x,
      lastY: y,
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
          ref={this.canvasRef}
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
  updateColor: PropTypes.func.isRequired,
  primaryColor: PropTypes.string.isRequired,
};

export default Canvas;
