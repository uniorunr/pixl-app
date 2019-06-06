import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CanvasSize from './CanvasSize/CanvasSize';
import FpsControl from './FpsControl/FpsControl';
import './Preview.scss';

class Preview extends Component {
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
          />
          <button className="preview__fullscreen-button" type="button">
            <i className="fas fa-expand" />
          </button>
          <FpsControl />
          <CanvasSize handlePixelsPerCanvas={handlePixelsPerCanvas} />
        </div>
      </section>
    );
  }
}

Preview.propTypes = {
  handlePixelsPerCanvas: PropTypes.func.isRequired,
};

export default Preview;
