import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Frame from './Frame/Frame';
import './Frames.scss';
import { setActiveFrame, translateActiveFrame } from './utils';

class Frames extends Component {
  state = {
    frameKeys: [0],
    activeFrame: 0,
    duplicate: null,
  };

  makeActive = (index) => {
    this.setState({
      activeFrame: index,
    });
  };

  resetDuplicate = () => {
    this.setState({
      duplicate: null,
    });
  };

  addFrame = () => {
    const { frameKeys } = this.state;
    this.setState({
      frameKeys: [...frameKeys, Math.max(...frameKeys) + 1],
      activeFrame: frameKeys.length,
    });

    const mainCanvas = document.querySelector('#canvas');
    const mainCtx = mainCanvas.getContext('2d');
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  };

  removeFrame = (index) => {
    const { frameKeys, activeFrame } = this.state;
    const indexToTranslate = setActiveFrame(activeFrame, frameKeys, index);
    frameKeys.splice(index, 1);
    translateActiveFrame(indexToTranslate);

    this.setState({
      frameKeys: [...frameKeys],
      activeFrame:
        indexToTranslate > frameKeys.length - 1
          ? frameKeys.length - 1
          : indexToTranslate,
    });
  };

  duplicateFrame = (index) => {
    const { frameKeys } = this.state;

    frameKeys.splice(index + 1, 0, Math.max(...frameKeys) + 1);

    this.setState({
      frameKeys: [...frameKeys],
      duplicate: index + 1,
      activeFrame: index + 1,
    });
  };

  render() {
    const { frameKeys, activeFrame, duplicate } = this.state;
    const { framesArray } = this.props;

    return (
      <section className="frames-section">
        {frameKeys.map((item, index) => (
          <Frame
            index={index}
            key={item}
            removeFrame={this.removeFrame}
            makeActive={this.makeActive}
            duplicateFrame={this.duplicateFrame}
            resetDuplicate={this.resetDuplicate}
            active={index === activeFrame}
            duplicate={index === duplicate}
            framesArray={framesArray}
          />
        ))}
        <button
          type="button"
          className="frames-section__add-frame-button"
          onClick={this.addFrame}
        >
          <i className="fas fa-plus" />
          <span>Add</span>
        </button>
      </section>
    );
  }
}

Frames.propTypes = {
  framesArray: PropTypes.instanceOf(Array),
};

Frames.defaultProps = {
  framesArray: [],
};

export default Frames;
