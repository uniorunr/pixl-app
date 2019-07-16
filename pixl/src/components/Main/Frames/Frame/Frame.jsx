import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/actions';
import { translateActiveFrame, setActiveFrame } from '../utils';
import './Frame.scss';

class Frame extends Component {
  componentDidMount = () => {
    const {
      duplicate,
      index,
      framesArray,
      updateDuplicateFrameIndex,
    } = this.props;
    if (duplicate) {
      const origin = framesArray[index - 1];
      const target = framesArray[index];
      const context = target.getContext('2d');
      context.imageSmoothingEnabled = false;
      context.drawImage(origin, 0, 0, target.width, target.height);
      translateActiveFrame(index);
      updateDuplicateFrameIndex(null);
    }
  };

  clickOnFrame = () => {
    const { index, updateActiveFrameIndex } = this.props;
    updateActiveFrameIndex(index);
    translateActiveFrame(index);
  };

  handleRemoveButton = () => {
    const {
      index,
      frameKeys,
      activeFrame,
      updateActiveFrameIndex,
      updateFrameKeys,
    } = this.props;
    const indexToTranslate = setActiveFrame(activeFrame, frameKeys, index);
    frameKeys.splice(index, 1);
    translateActiveFrame(indexToTranslate);
    updateFrameKeys([...frameKeys]);
    const newActiveFrameIndex = indexToTranslate > frameKeys.length - 1
      ? frameKeys.length - 1
      : indexToTranslate;
    updateActiveFrameIndex(newActiveFrameIndex);
  };

  handleDuplicateButton = () => {
    const {
      index,
      frameKeys,
      updateDuplicateFrameIndex,
      updateActiveFrameIndex,
      updateFrameKeys,
    } = this.props;
    frameKeys.splice(index + 1, 0, Math.max(...frameKeys) + 1);
    updateFrameKeys([...frameKeys]);
    updateDuplicateFrameIndex(index + 1);
    updateActiveFrameIndex(index + 1);
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
  activeFrame: PropTypes.number.isRequired,
  framesArray: PropTypes.instanceOf(Array).isRequired,
  duplicate: PropTypes.bool,
  frameKeys: PropTypes.instanceOf(Array).isRequired,
  innerRef: PropTypes.func.isRequired,
  provided: PropTypes.instanceOf(Object).isRequired,
  updateActiveFrameIndex: PropTypes.func.isRequired,
  updateDuplicateFrameIndex: PropTypes.func.isRequired,
  updateFrameKeys: PropTypes.func.isRequired,
};

Frame.defaultProps = {
  active: false,
  duplicate: false,
};

const mapStateToProps = state => ({
  framesArray: state.frames.framesArray,
  frameKeys: state.frames.frameKeys,
  activeFrame: state.frames.activeFrame,
});

const mapDispatchToProps = (dispatch) => {
  const {
    updateActiveFrameIndex,
    updateDuplicateFrameIndex,
    updateFrameKeys,
  } = bindActionCreators(actions, dispatch);
  return {
    updateActiveFrameIndex: (index) => {
      updateActiveFrameIndex(index);
    },
    updateDuplicateFrameIndex: (index) => {
      updateDuplicateFrameIndex(index);
    },
    updateFrameKeys: (keys) => {
      updateFrameKeys(keys);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Frame);
