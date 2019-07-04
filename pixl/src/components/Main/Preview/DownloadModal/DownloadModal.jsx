import React, { Component } from 'react';
import './DownloadModal.scss';
import PropTypes from 'prop-types';

class DownloadModal extends Component {
  state = {
    name: null,
    size: null,
  };

  handleNameInput = ({ target: { value } }) => {
    this.setState({
      name: value,
    });
  };

  handleSizeInput = ({ target: { value } }) => {
    this.setState({
      size: value,
    });
  };

  handleDownload = () => {
    const { name, size } = this.state;
    const { download } = this.props;
    download(name, size);
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
  download: PropTypes.func.isRequired,
};

export default DownloadModal;
