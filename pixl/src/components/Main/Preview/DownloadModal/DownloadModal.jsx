import React, { Component } from 'react';
import './DownloadModal.scss';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GIF from 'gif.js.optimized';
import download from 'downloadjs';
import * as actions from '../../../../actions/actions';

class DownloadModal extends Component {
  handleNameInput = ({ target: { value } }) => {
    const { setDownloadName } = this.props;
    setDownloadName(value);
  };

  handleSizeInput = ({ target: { value } }) => {
    const { setDownloadSize } = this.props;
    setDownloadSize(+value);
  };

  handleDownload = () => {
    const { name, size } = this.props;
    this.download(name, size);
  };

  download = (returnedName, returnedSize) => {
    const {
      name,
      size,
      updateCurrPreviewFrame,
      updateRecordingState,
      setGifInstance,
      setDownloadModalState,
    } = this.props;
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
    updateCurrPreviewFrame(0);
    updateRecordingState(true);
    setGifInstance(gif);
    setDownloadModalState(false);
  };

  render() {
    const { closeDownloadModal } = this.props;

    return (
      <section className="download-modal">
        <div className="download-modal__content">
          <span>File Name (optional):</span>
          <input
            className="download-modal__file-name"
            type="text"
            onInput={this.handleNameInput}
          />
          <span>Size (optional):</span>
          <input
            className="download-modal__size"
            type="text"
            onInput={this.handleSizeInput}
          />
          <button
            type="button"
            className="download-modal__submit"
            onClick={this.handleDownload}
          >
            Download
          </button>
        </div>
        <button
          className="download-modal__close"
          type="button"
          onClick={closeDownloadModal}
        >
          <span>x</span>
        </button>
      </section>
    );
  }
}

DownloadModal.propTypes = {
  closeDownloadModal: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  setGifInstance: PropTypes.func.isRequired,
  updateCurrPreviewFrame: PropTypes.func.isRequired,
  updateRecordingState: PropTypes.func.isRequired,
  setDownloadModalState: PropTypes.func.isRequired,
  setDownloadName: PropTypes.func.isRequired,
  setDownloadSize: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  name: state.preview.name,
  size: state.preview.size,
});

const mapDispatchToProps = (dispatch) => {
  const {
    updatePixelsPerCanvas,
    updateCurrPreviewFrame,
    setGifInstance,
    setDownloadName,
    setDownloadSize,
    updateRecordingState,
    setDownloadModalState,
  } = bindActionCreators(actions, dispatch);
  return {
    updatePixelsPerCanvas,
    updateRecordingState: (state) => {
      updateRecordingState(state);
    },
    setGifInstance: (gif) => {
      setGifInstance(gif);
    },
    updateCurrPreviewFrame: (index) => {
      updateCurrPreviewFrame(index);
    },
    setDownloadName: (name) => {
      setDownloadName(name);
    },
    setDownloadSize: (size) => {
      setDownloadSize(size);
    },
    setDownloadModalState: (state) => {
      setDownloadModalState(state);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DownloadModal);
