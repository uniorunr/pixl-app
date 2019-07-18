import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/actions';
import CanvasInfo from './CanvasInfo/CanvasInfo';
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
  canvasRef = React.createRef();

  canvasOverlayRef = React.createRef();

  componentDidMount() {
    const { setCanvasRefs } = this.props;
    setCanvasRefs(this.canvasRef.current, this.canvasOverlayRef.current);
  }

  componentDidUpdate = () => {
    const { framesArray } = this.props;
    const frame = framesArray.find(element => element.classList.contains('frame__canvas_active'));
    if (frame) {
      translate(frame, this.canvasRef.current);
    }
  };

  shouldComponentUpdate = (nextProps) => {
    const {
      pixelsPerCanvas, height, width, currX, currY,
    } = this.props;

    return (
      pixelsPerCanvas !== nextProps.pixelsPerCanvas
      || height !== nextProps.height
      || width !== nextProps.width
      || currX !== nextProps.currX
      || currY !== nextProps.currY
    );
  };

  deactivateDrawing = () => {
    const {
      currToolId,
      framesData,
      framesArray,
      layerKeys,
      activeLayer,
      cursorActive,
      toggleCursorState,
      updateCanvasInitCoords,
      updateMouseButtonCode,
    } = this.props;
    if (toolsWithOverlayUse.includes(currToolId)) {
      const overlay = this.canvasOverlayRef.current;
      translate(this.canvasOverlayRef.current, this.canvasRef.current, true);
      const overlayCtx = overlay.getContext('2d');
      overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
    }
    const frame = document.querySelector('.frame__canvas_active');
    translate(this.canvasRef.current, frame);

    if (cursorActive) {
      toggleCursorState(false);
      updateCanvasInitCoords(null, null);
      updateMouseButtonCode(null);
      const layerKey = `layer${layerKeys[activeLayer]}`;
      framesData[layerKey] = framesArray.map(item => item.toDataURL());
      sessionStorage.setItem('framesData', JSON.stringify(framesData));
    }
  };

  handleMouseDown = ({ pageX, pageY, button }) => {
    const {
      currToolId,
      updateColor,
      toggleCursorState,
      updateMouseButtonCode,
    } = this.props;
    toggleCursorState(true);
    updateMouseButtonCode(button);
    const result = activateTool(
      currToolId,
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
    const {
      currToolId,
      pixelsPerCanvas,
      width,
      framesArray,
      cursorActive,
      updateCanvasCurrCoords,
    } = this.props;
    const pixelSize = width / pixelsPerCanvas;
    const canvas = this.canvasRef.current;
    const x = Math.floor((pageX - canvas.offsetLeft) / pixelSize);
    const y = Math.floor((pageY - canvas.offsetTop) / pixelSize);
    updateCanvasCurrCoords(x, y);

    if (cursorActive) {
      activateTool(
        currToolId,
        this.props,
        pageX,
        pageY,
        this.canvasRef.current,
        this.canvasOverlayRef.current,
        this.updateLastCoordinates,
        this.updateInitCoordinates,
        button,
      );
      const frame = framesArray.find(element => element.classList.contains('frame__canvas_active'));
      translate(this.canvasRef.current, frame);
    }
  };

  handleRightClick = (event) => {
    event.preventDefault();
  };

  updateLastCoordinates = (x, y) => {
    const { updateCanvasCurrCoords } = this.props;
    updateCanvasCurrCoords(x, y);
  };

  updateInitCoordinates = (x, y) => {
    const { updateCanvasInitCoords } = this.props;
    updateCanvasInitCoords(x, y);
  };

  clearCanvas = () => {
    const {
      framesArray, layerKeys, activeLayer, framesData,
    } = this.props;
    const canvas = this.canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const frame = framesArray.find(element => element.classList.contains('frame__canvas_active'));
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    translate(canvas, frame);

    const layerKey = `layer${layerKeys[activeLayer]}`;
    framesData[layerKey] = framesArray.map(item => item.toDataURL());
    sessionStorage.setItem('framesData', JSON.stringify(framesData));
  };

  render() {
    const { width, height } = this.props;

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
        <div className="canvas-section__additional-info-wrapper">
          <button
            type="button"
            className="canvas-section__clear-button"
            onClick={this.clearCanvas}
          >
            clear
          </button>
          <CanvasInfo />
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
  framesArray: PropTypes.instanceOf(Array).isRequired,
  pixelsPerCanvas: PropTypes.number.isRequired,
  framesData: PropTypes.instanceOf(Object).isRequired,
  layerKeys: PropTypes.instanceOf(Array).isRequired,
  activeLayer: PropTypes.number.isRequired,
  setCanvasRefs: PropTypes.func.isRequired,
  cursorActive: PropTypes.bool,
  toggleCursorState: PropTypes.func.isRequired,
  updateCanvasInitCoords: PropTypes.func.isRequired,
  updateCanvasCurrCoords: PropTypes.func.isRequired,
  updateMouseButtonCode: PropTypes.func.isRequired,
  currX: PropTypes.number.isRequired,
  currY: PropTypes.number.isRequired,
};

Canvas.defaultProps = {
  cursorActive: null,
};

const mapStateToProps = state => ({
  currToolId: state.tools.currToolId,
  pixelsPerCanvas: state.canvas.pixelsPerCanvas,
  width: state.canvas.width,
  height: state.canvas.height,
  framesArray: state.frames.framesArray,
  primaryColor: state.colors.primaryColor,
  secondaryColor: state.colors.secondaryColor,
  framesData: state.frames.framesData,
  layerKeys: state.layers.layerKeys,
  activeLayer: state.layers.activeLayer,
  cursorActive: state.canvas.cursorActive,
  currX: state.canvas.currX,
  currY: state.canvas.currY,
  initX: state.canvas.initX,
  initY: state.canvas.initY,
  mouseButton: state.canvas.mouseButton,
});

const mapDispatchToProps = (dispatch) => {
  const {
    updateColor,
    setCanvasRefs,
    toggleCursorState,
    updateCanvasInitCoords,
    updateCanvasCurrCoords,
    updateMouseButtonCode,
  } = bindActionCreators(actions, dispatch);
  return {
    updateColor: (color, isPrimary) => {
      updateColor(color, isPrimary);
    },
    setCanvasRefs: (canvas, overlay) => {
      setCanvasRefs(canvas, overlay);
    },
    toggleCursorState: (state) => {
      toggleCursorState(state);
    },
    updateCanvasInitCoords: (x, y) => {
      updateCanvasInitCoords(x, y);
    },
    updateCanvasCurrCoords: (x, y) => {
      updateCanvasCurrCoords(x, y);
    },
    updateMouseButtonCode: (button) => {
      updateMouseButtonCode(button);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Canvas);
