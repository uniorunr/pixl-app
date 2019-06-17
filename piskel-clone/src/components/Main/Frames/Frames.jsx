import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Frame from './Frame/Frame';
import './Frames.scss';
import setActiveFrame from './utils';

class Frames extends Component {
  state = {
    canvasItems: [],
    frameKeys: [0],
    activeFrame: 0,
  };

  componentDidMount = () => {
    this.setState({
      canvasItems: [
        <Frame
          index={0}
          key="0"
          makeActive={this.makeActive}
          removeFrame={this.removeFrame}
        />,
      ],
    });
  };

  makeActive = (index) => {
    this.setState({
      activeFrame: index,
    });
  };

  addFrame = () => {
    const { canvasItems, frameKeys } = this.state;

    this.setState({
      canvasItems: [
        ...canvasItems,
        <Frame
          index={frameKeys[frameKeys.length - 1] + 1}
          key={frameKeys[frameKeys.length - 1] + 1}
          removeFrame={this.removeFrame}
          makeActive={this.makeActive}
        />,
      ],
      frameKeys: [...frameKeys, frameKeys[frameKeys.length - 1] + 1],
      activeFrame: frameKeys.length,
    });

    const mainCanvas = document.querySelector('#canvas');
    const mainCtx = mainCanvas.getContext('2d');
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  };

  removeFrame = (index) => {
    const { canvasItems, frameKeys, activeFrame } = this.state;
    const finalIndex = setActiveFrame(activeFrame, canvasItems, index);

    const frame = document.querySelector(`#frame${finalIndex}`);
    const mainCanvas = document.querySelector('#canvas');
    const mainCtx = mainCanvas.getContext('2d');
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    mainCtx.imageSmoothingEnabled = false;
    mainCtx.drawImage(frame, 0, 0, mainCanvas.width, mainCanvas.height);

    canvasItems.splice(index, 1);
    frameKeys.splice(index, 1);
    this.setState({
      canvasItems: [...canvasItems],
      frameKeys: [...frameKeys],
      activeFrame: finalIndex,
    });
  };

  render() {
    const { canvasItems, frameKeys, activeFrame } = this.state;
    const { framesArray } = this.props;
    const keys = canvasItems.map(item => item.key);

    return (
      <section className="frames-section">
        {keys.map((item, index) => (
          <Frame
            index={index}
            key={frameKeys[index]}
            removeFrame={this.removeFrame}
            active={index === activeFrame}
            makeActive={this.makeActive}
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
