import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/actions';
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
  previewRef = React.createRef();

  timeOut = null;

  componentDidMount = () => {
    this.animate();
  };

  componentWillUnmount() {
    cancelAnimationFrame(this.animate);
    clearTimeout(this.timeOut);
  }

  animate = () => {
    const { fps } = this.props;
    this.timeOut = setTimeout(this.changeFrame, 1000 / fps);
  };

  changeFrame = () => {
    const {
      framesArray,
      currFrame,
      fps,
      recording,
      gif,
      size,
      updateFramesArray,
      updateCurrPreviewFrame,
      updateRecordingState,
    } = this.props;
    requestAnimationFrame(this.animate);
    const index = framesArray.indexOf(null);
    if (index !== -1) {
      const updatedFramesArray = [...framesArray];
      updatedFramesArray.splice(index);
      updateFramesArray(updatedFramesArray);
      updateCurrPreviewFrame(0);
    }
    if (framesArray[currFrame] && this.previewRef.current) {
      const canvas = this.previewRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(framesArray[currFrame], 0, 0, canvas.width, canvas.height);
      const updatedCurrFrame = currFrame + 1 <= framesArray.length - 1 ? currFrame + 1 : 0;
      updateCurrPreviewFrame(updatedCurrFrame);
      if (recording && gif) {
        gif.addFrame(canvasWithSize(framesArray[currFrame], size, size), {
          copy: true,
          delay: 1000 / fps,
        });
        if (!framesArray[currFrame + 1]) {
          updateRecordingState(false);
          gif.render();
        }
      }
    } else {
      updateCurrPreviewFrame(0);
      updateRecordingState(false);
    }
  };

  handleDownloadModal = () => {
    const { downloadModal, setDownloadModalState } = this.props;
    setDownloadModalState(!downloadModal);
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
    const { downloadModal } = this.props;

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
          <FpsControl />
          <CanvasSize />
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
  framesArray: PropTypes.instanceOf(Array).isRequired,
  fps: PropTypes.number.isRequired,
  currFrame: PropTypes.number.isRequired,
  recording: PropTypes.bool.isRequired,
  gif: PropTypes.instanceOf(Object),
  downloadModal: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
  updateFramesArray: PropTypes.func.isRequired,
  updateCurrPreviewFrame: PropTypes.func.isRequired,
  updateRecordingState: PropTypes.func.isRequired,
  setDownloadModalState: PropTypes.func.isRequired,
};

Preview.defaultProps = {
  gif: null,
};

const mapStateToProps = state => ({
  pixelsPerCanvas: state.canvas.pixelsPerCanvas,
  framesArray: state.frames.framesArray,
  fps: state.preview.fps,
  currFrame: state.preview.currFrame,
  recording: state.preview.recording,
  gif: state.preview.gif,
  downloadModal: state.preview.downloadModal,
  name: state.preview.name,
  size: state.preview.size,
});

const mapDispatchToProps = (dispatch) => {
  const {
    updatePixelsPerCanvas,
    updateFramesArray,
    updateCurrPreviewFrame,
    updateRecordingState,
    setGifInstance,
    setDownloadModalState,
  } = bindActionCreators(actions, dispatch);
  return {
    updatePixelsPerCanvas,
    updateFramesArray: (array) => {
      updateFramesArray(array);
    },
    updateCurrPreviewFrame: (index) => {
      updateCurrPreviewFrame(index);
    },
    updateRecordingState: (state) => {
      updateRecordingState(state);
    },
    setGifInstance: (gif) => {
      setGifInstance(gif);
    },
    setDownloadModalState: (state) => {
      setDownloadModalState(state);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Preview);
