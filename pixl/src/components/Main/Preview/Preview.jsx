import React, { Component } from 'react';
import GIF from 'gif.js.optimized';
import download from 'downloadjs';
import PropTypes from 'prop-types';
import CanvasSize from './CanvasSize/CanvasSize';
import FpsControl from './FpsControl/FpsControl';
import DownloadModal from './DownloadModal/DownloadModal';
import './Preview.scss';

const canvasWithSize = (sourceCanvas, width, height) => {
  const tempCanvas = document.createElement('canvas');
  const tempContext = tempCanvas.getContext('2d');
  tempCanvas.width = width;
  tempCanvas.height = height;
  tempContext.imageSmoothingEnabled = false;
  tempContext.drawImage(sourceCanvas, 0, 0, width, height);
  return tempCanvas;
};

class Preview extends Component {
  constructor(props) {
    super(props);
    const { framesArray } = this.props;

    this.previewRef = React.createRef();
    this.timeOut = null;

    this.state = {
      framesArray,
      fps: 12,
      currFrame: 0,
      recording: false,
      gif: null,
      downloadModal: false,
      name: 'uniorunr',
      size: 500,
    };
  }

  componentDidMount = () => {
    this.animate();
  };

  componentWillUnmount() {
    cancelAnimationFrame(this.animate);
    clearTimeout(this.timeOut);
  }

  animate = () => {
    const { fps } = this.state;
    this.timeOut = setTimeout(this.changeFrame, 1000 / fps);
  };

  changeFrame = () => {
    const {
      framesArray, currFrame, fps, recording, gif, size,
    } = this.state;
    requestAnimationFrame(this.animate);
    const index = framesArray.indexOf(null);
    if (index !== -1) {
      framesArray.splice(index);
      this.setState({
        framesArray: [...framesArray],
        currFrame: 0,
      });
    }
    if (framesArray[currFrame] && this.previewRef.current) {
      const canvas = this.previewRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(framesArray[currFrame], 0, 0, canvas.width, canvas.height);
      this.setState({
        currFrame: currFrame + 1 <= framesArray.length - 1 ? currFrame + 1 : 0,
      });
      if (recording && gif) {
        gif.addFrame(canvasWithSize(framesArray[currFrame], size, size), {
          copy: true,
          delay: 1000 / fps,
        });
        if (!framesArray[currFrame + 1]) {
          this.setState({
            recording: false,
          });
          gif.render();
        }
      }
    } else {
      this.setState({ currFrame: 0, recording: false });
    }
  };

  updateFps = (fps) => {
    this.setState({
      fps: +fps,
    });
  };

  download = (returnedName, returnedSize) => {
    const { name, size } = this.state;
    const finalName = returnedName || name;
    const finalDimensions = returnedSize || size;
    const gif = new GIF({
      workers: 2,
      quality: 10,
      width: finalDimensions,
      height: finalDimensions,
    });

    gif.on('finished', (blob) => {
      download(blob, `${finalName}.gif`, 'image/gif');
    });

    this.setState({
      recording: true,
      currFrame: 0,
      gif,
      size: finalDimensions,
      downloadModal: false,
    });
  };

  handleDownloadModal = () => {
    const { downloadModal } = this.state;
    this.setState({
      downloadModal: !downloadModal,
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
    const { fps, downloadModal } = this.state;

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
            className="preview__download"
            type="button"
            onClick={this.handleDownloadModal}
          >
            <i className="fas fa-download" />
          </button>
          <button
            className="preview__fullscreen-button"
            type="button"
            onClick={this.handleFullScreen}
          >
            <i className="fas fa-expand" />
          </button>
          <FpsControl fps={fps} updateFps={this.updateFps} />
          <CanvasSize handlePixelsPerCanvas={handlePixelsPerCanvas} />
          {downloadModal ? (
            <DownloadModal
              closeDownloadModal={this.handleDownloadModal}
              download={this.download}
            />
          ) : null}
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
