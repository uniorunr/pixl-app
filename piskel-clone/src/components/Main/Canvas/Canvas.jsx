import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Canvas.scss';
import moveAndPaint from './utils/paintTool';
import moveAndErase from './utils/eraserTool';
import pickTheColor from './utils/pickerTool';
import paintBucket from './utils/paintBucketTool';
import sameColor from './utils/sameColorTool';
import drawStroke from './utils/strokeTool';
import drawRectangle from './utils/rectangleTool';

const activateTool = (
  id,
  state,
  props,
  x,
  y,
  canvas,
  overlay,
  updXY,
  updInit,
) => {
  let result = null;
  switch (id) {
    case 'pen':
      result = moveAndPaint(x, y, state, props, canvas, updXY);
      break;
    case 'eraser':
      result = moveAndErase(x, y, state, props, canvas, updXY);
      break;
    case 'choose-color':
      result = pickTheColor(x, y, state, props, canvas);
      break;
    case 'paint-bucket':
      result = paintBucket(x, y, props, canvas);
      break;
    case 'paint-same-pixels':
      result = sameColor(x, y, props, canvas);
      break;
    case 'stroke':
      result = drawStroke(x, y, state, props, canvas, overlay, updInit);
      break;
    case 'rectangle':
      result = drawRectangle(x, y, state, props, canvas, overlay, updInit);
      break;
    default:
      throw new Error("tool isn't found");
  }
  return result;
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
    if (currToolId === 'stroke' || currToolId === 'rectangle') {
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
    const { currToolId, updateColor } = this.props;
    this.setState({
      cursorActive: true,
    });
    const result = activateTool(
      currToolId,
      this.state,
      this.props,
      pageX,
      pageY,
      this.canvasRef.current,
      this.canvasOverlayRef.current,
      this.updateLastCoordinates,
      this.updateInitCoordinates,
    );
    if (result && result !== 'transparent') updateColor(result, 'primary');
  };

  handleMouseMove = ({ pageX, pageY }) => {
    const { cursorActive } = this.state;
    const { currToolId } = this.props;

    if (cursorActive) {
      activateTool(
        currToolId,
        this.state,
        this.props,
        pageX,
        pageY,
        this.canvasRef.current,
        this.canvasOverlayRef.current,
        this.updateLastCoordinates,
        this.updateInitCoordinates,
      );
      const frame = document.querySelector('.frame__canvas_active');
      translate(this.canvasRef.current, frame);
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
  // eslint-disable-next-line
  primaryColor: PropTypes.string.isRequired,
  // eslint-disable-next-line
  pixelsPerCanvas: PropTypes.number.isRequired,
};

export default Canvas;
