import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CanvasSize from './CanvasSize/CanvasSize';
import FpsControl from './FpsControl/FpsControl';
import './Preview.scss';

class Preview extends Component {
  constructor(props) {
    super(props);
    const { framesArray } = this.props;

    this.previewRef = React.createRef();

    this.state = {
      framesArray,
      fps: 12,
      currFrame: 0,
    };
  }

  componentDidMount = () => {
    this.animate();
  };

  animate = () => {
    const { fps } = this.state;
    setTimeout(this.changeFrame, 1000 / fps);
  };

  changeFrame = () => {
    const { framesArray, currFrame } = this.state;
    requestAnimationFrame(this.animate);
    const index = framesArray.indexOf(null);
    if (index !== -1) {
      framesArray.splice(index);
      this.setState({
        framesArray: [...framesArray],
        currFrame: 0,
      });
    }
    if (framesArray[currFrame]) {
      const canvas = this.previewRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(framesArray[currFrame], 0, 0, canvas.width, canvas.height);
      this.setState({
        currFrame: currFrame + 1 <= framesArray.length - 1 ? currFrame + 1 : 0,
      });
    } else {
      this.setState({ currFrame: 0 });
    }
  };

  updateFps = (fps) => {
    this.setState({
      fps: +fps,
    });
  };

  handleFullScreen = () => {
    const previewCanvas = this.previewRef.current;
    previewCanvas.getContext('2d').imageSmoothingEnabled = false;
    const fullscreen = previewCanvas.requestFullscreen
      || previewCanvas.webkitRequestFullScreen
      || previewCanvas.mozRequestFullScreen;
    fullscreen.call(previewCanvas);
  };

  render() {
    const { handlePixelsPerCanvas } = this.props;
    const { fps } = this.state;

    return (
      <section className="preview-section">
        <div className="preview">
          <canvas
            id="preview-canvas"
            className="preview__canvas"
            width="128"
            height="128"
            ref={this.previewRef}
          />
          <button
            className="preview__fullscreen-button"
            type="button"
            onClick={this.handleFullScreen}
          >
            <i className="fas fa-expand" />
          </button>
          <FpsControl fps={fps} updateFps={this.updateFps} />
          <CanvasSize handlePixelsPerCanvas={handlePixelsPerCanvas} />
        </div>
      </section>
    );
  }
}

Preview.propTypes = {
  handlePixelsPerCanvas: PropTypes.func.isRequired,
  framesArray: PropTypes.instanceOf(Array).isRequired,
};

export default Preview;
