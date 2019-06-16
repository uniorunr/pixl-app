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
      fps: 10,
      currentFrame: 0,
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
    const { framesArray, currentFrame } = this.state;
    requestAnimationFrame(this.animate);
    const canvas = this.previewRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(framesArray[currentFrame], 0, 0, canvas.width, canvas.height);
    this.setState({
      currentFrame:
        framesArray[currentFrame + 1] <= framesArray[framesArray.length - 1]
          ? currentFrame + 1
          : 0,
    });
  };

  updateFps = (fps) => {
    this.setState({
      fps,
    });
  };

  render() {
    const { handlePixelsPerCanvas } = this.props;

    return (
      <section className="preview-section">
        <div className="preview">
          <canvas
            id="preview-canvas"
            className="preview__canvas"
            width="150"
            height="150"
            ref={this.previewRef}
          />
          <button className="preview__fullscreen-button" type="button">
            <i className="fas fa-expand" />
          </button>
          <FpsControl updateFps={this.updateFps} />
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
