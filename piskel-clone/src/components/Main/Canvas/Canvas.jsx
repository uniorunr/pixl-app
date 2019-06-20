import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Canvas.scss';
import moveAndPaint from './utils/paintTool';
import moveAndErase from './utils/eraserTool';
import pickTheColor from './utils/pickerTool';
import paintBucket from './utils/paintBucketTool';
import sameColor from './utils/sameColorTool';
import drawStroke from './utils/strokeTool';

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
    case 'paint-same-pixels':
      tool = sameColor;
      break;
    case 'stroke':
      tool = drawStroke;
      break;
    default:
      throw new Error("tool isn't found");
  }
  return tool;
};

const translate = (source, target, clear) => {
  const ctx = target.getContext('2d');
  if (!clear) {
    ctx.clearRect(0, 0, target.width, target.height);
  }
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(source, 0, 0, target.width, target.height);
};

class Canvas extends Component {
  constructor() {
    super();

    this.canvasRef = React.createRef();
    this.canvasOverlayRef = React.createRef();

    this.state = {
      cursorActive: null,
      currX: null,
      lastY: null,
      initX: null,
      initY: null,
    };
  }

  deactivateCursor = () => {
    const { cursorActive } = this.state;
    const { currToolId } = this.props;
    if (currToolId === 'stroke') {
      const overlay = this.canvasOverlayRef.current;
      translate(this.canvasOverlayRef.current, this.canvasRef.current, true);
      const overlayCtx = overlay.getContext('2d');
      overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
    }
    const frame = document.querySelector('.frame__canvas_active');
    translate(this.canvasRef.current, frame);

    if (cursorActive) {
      this.setState({
        cursorActive: false,
        initX: null,
        initY: null,
      });
    }
  };

  handleMouseDown = ({ pageX, pageY }) => {
    const {
      currToolId,
      updateColor,
      primaryColor,
      pixelsPerCanvas,
    } = this.props;
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
    } else if (currToolId === 'stroke') {
      drawStroke(
        pageX,
        pageY,
        this.state,
        this.props,
        this.canvasRef.current,
        this.canvasOverlayRef.current,
        this.updateInitCoordinates,
      );
    } else {
      tool(pageX, pageY, primaryColor, this.canvasRef.current, pixelsPerCanvas);
    }
  };

  handleMouseMove = ({ pageX, pageY }) => {
    const { cursorActive } = this.state;
    const { currToolId } = this.props;

    if (cursorActive) {
      const tool = activateTool(currToolId);
      if (currToolId !== 'choose-color' && currToolId !== 'stroke') {
        tool(
          pageX,
          pageY,
          this.state,
          this.props,
          this.canvasRef.current,
          this.updateLastCoordinates,
        );
        const frame = document.querySelector('.frame__canvas_active');
        translate(this.canvasRef.current, frame);
      }
      if (currToolId === 'stroke') {
        drawStroke(
          pageX,
          pageY,
          this.state,
          this.props,
          this.canvasRef.current,
          this.canvasOverlayRef.current,
          this.updateInitCoordinates,
        );
        const frame = document.querySelector('.frame__canvas_active');
        translate(this.canvasRef.current, frame);
      }
    }
  };

  updateLastCoordinates = (x, y) => {
    this.setState({
      currX: x,
      lastY: y,
    });
  };

  updateInitCoordinates = (x, y) => {
    this.setState({
      initX: x,
      initY: y,
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
        <canvas
          className="canvas-section__canvas-overlay"
          id="canvas-overlay"
          width={width}
          height={height}
          ref={this.canvasOverlayRef}
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
  pixelsPerCanvas: PropTypes.number.isRequired,
};

export default Canvas;
