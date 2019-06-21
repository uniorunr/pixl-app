import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Canvas.scss';
import activateTool from './activateTool';

const toolsWithOverlayUse = ['stroke', 'rectangle', 'circle', 'move'];

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
      currX: 0,
      currY: 0,
      initX: null,
      initY: null,
      mouseButton: null,
    };
  }

  deactivateDrawing = () => {
    const { cursorActive } = this.state;
    const { currToolId } = this.props;
    if (toolsWithOverlayUse.includes(currToolId)) {
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
        mouseButton: null,
      });
    }
  };

  handleMouseDown = ({ pageX, pageY, button }) => {
    const { currToolId, updateColor } = this.props;
    this.setState({
      cursorActive: true,
      mouseButton: button,
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
      button,
    );
    if (result && result.color !== 'transparent') {
      if (result.button === 2) {
        updateColor(result.color);
      } else {
        updateColor(result.color, 'primary');
      }
    }
  };

  handleMouseMove = ({ pageX, pageY, button }) => {
    const { cursorActive } = this.state;
    const { currToolId, pixelsPerCanvas, width } = this.props;
    const pixelSize = width / pixelsPerCanvas;
    const canvas = this.canvasRef.current;
    const x = Math.floor((pageX - canvas.offsetLeft) / pixelSize);
    const y = Math.floor((pageY - canvas.offsetTop) / pixelSize);
    this.setState({
      currX: x,
      currY: y,
    });

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
        button,
      );
      const frame = document.querySelector('.frame__canvas_active');
      translate(this.canvasRef.current, frame);
    }
  };

  handleRightClick = (event) => {
    event.preventDefault();
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
    const { width, height, pixelsPerCanvas } = this.props;
    const { currX, currY } = this.state;

    return (
      <section className="canvas-section" onContextMenu={this.handleRightClick}>
        <div className="canvas-section__wrapper">
          <canvas
            className="canvas-section__canvas"
            id="canvas"
            width={width}
            height={height}
            ref={this.canvasRef}
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.deactivateDrawing}
            onMouseLeave={this.deactivateDrawing}
          />
          <canvas
            className="canvas-section__canvas-overlay"
            id="canvas-overlay"
            width={width}
            height={height}
            ref={this.canvasOverlayRef}
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.deactivateDrawing}
            onMouseLeave={this.deactivateDrawing}
          />
        </div>
        <div className="canvas-section__info">
          <span className="canvas-section__size">{`size: ${pixelsPerCanvas}x${pixelsPerCanvas}`}</span>
          <span className="canvas-section__position">
            {`x: ${currX >= 0 ? currX : 0}  y: ${currY >= 0 ? currY : 0}`}
          </span>
        </div>
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
