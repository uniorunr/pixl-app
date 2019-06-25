import React, { Component } from 'react';
import './Frame.scss';
import PropTypes from 'prop-types';
import { translateActiveFrame } from '../utils';

class Frame extends Component {
  componentDidMount = () => {
    const {
      duplicate, index, framesArray, resetDuplicate,
    } = this.props;
    if (duplicate) {
      const origin = framesArray[index - 1];
      const target = framesArray[index];
      const context = target.getContext('2d');
      context.imageSmoothingEnabled = false;
      context.drawImage(origin, 0, 0, target.width, target.height);
      translateActiveFrame(index);
      resetDuplicate();
    }
  };

  clickOnFrame = () => {
    const { index, makeActive } = this.props;
    makeActive(index);
    translateActiveFrame(index);
  };

  handleRemoveButton = () => {
    const { index, removeFrame } = this.props;
    removeFrame(index);
  };

  handleDuplicateButton = () => {
    const { index, duplicateFrame } = this.props;
    duplicateFrame(index);
  };

  setRef = (ref) => {
    const { innerRef } = this.props;
    this.ref = ref;
    innerRef(ref);
  };

  render() {
    const {
      active, index, framesArray, provided,
    } = this.props;

    return (
      <div
        role="presentation"
        data-id={index}
        data-active={active ? true : null}
        className={`frame frame${index}`}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={this.setRef}
      >
        <canvas
          id={`frame${index}`}
          className={`frame__canvas ${active ? 'frame__canvas_active' : ''}`}
          width="128"
          height="128"
          onClick={this.clickOnFrame}
          ref={(ref) => {
            if (ref) {
              framesArray[index] = ref;
              framesArray.length = index + 1;
            }
          }}
        />
        <span className="frame__index">{index + 1}</span>
        <button
          className="frame__duplicate"
          type="button"
          onClick={this.handleDuplicateButton}
        >
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
  duplicateFrame: PropTypes.func.isRequired,
  resetDuplicate: PropTypes.func.isRequired,
  framesArray: PropTypes.instanceOf(Array),
  duplicate: PropTypes.bool,
  frameKeys: PropTypes.instanceOf(Array).isRequired,
  innerRef: PropTypes.func.isRequired,
  provided: PropTypes.instanceOf(Object).isRequired,
};

Frame.defaultProps = {
  active: false,
  framesArray: [],
  duplicate: false,
};

export default Frame;
