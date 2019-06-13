import React, { Component } from 'react';
import './Frame.scss';
import PropTypes from 'prop-types';

class Frame extends Component {
  clickOnFrame = () => {
    const { index, makeActive } = this.props;
    makeActive(index);

    const frame = document.querySelector(`#frame${index}`);
    const mainCanvas = document.querySelector('#canvas');
    const mainCtx = mainCanvas.getContext('2d');
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    mainCtx.imageSmoothingEnabled = false;
    mainCtx.drawImage(frame, 0, 0, mainCanvas.width, mainCanvas.height);
  };

  handleRemoveButton = () => {
    const { index, removeFrame } = this.props;
    removeFrame(index);
  };

  render() {
    const { active, index } = this.props;

    return (
      <div
        role="presentation"
        data-id={index}
        data-active={active ? true : null}
        className={`frame frame${index}`}
      >
        <canvas
          id={`frame${index}`}
          className={`frame__canvas ${active ? 'frame__canvas_active' : ''}`}
          width="128"
          height="128"
          onClick={this.clickOnFrame}
        />
        <span className="frame__index">{index + 1}</span>
        <button className="frame__duplicate" type="button">
          <i className="fas fa-copy" />
        </button>
        {index > 0 ? (
          <button
            className="frame__delete"
            type="button"
            onClick={this.handleRemoveButton}
          >
            <i className="fas fa-trash-alt" />
          </button>
        ) : null}
      </div>
    );
  }
}

Frame.propTypes = {
  index: PropTypes.number.isRequired,
  active: PropTypes.bool,
  removeFrame: PropTypes.func.isRequired,
  makeActive: PropTypes.func.isRequired,
};

Frame.defaultProps = {
  active: false,
};

export default Frame;
