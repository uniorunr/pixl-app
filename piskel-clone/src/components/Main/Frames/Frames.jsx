import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Frame from './Frame/Frame';
import './Frames.scss';
import { setActiveFrame, translateActiveFrame } from './utils';

class Frames extends Component {
  state = {
    canvasItems: [],
    frameKeys: [0],
    activeFrame: 0,
    duplicate: null,
  };

  componentDidMount = () => {
    this.setState({
      canvasItems: [
        <Frame
          index={0}
          key="0"
          makeActive={this.makeActive}
          removeFrame={this.removeFrame}
          duplicateFrame={this.duplicateFrame}
          resetDuplicate={this.resetDuplicate}
        />,
      ],
    });
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
    const { canvasItems, frameKeys } = this.state;

    this.setState({
      canvasItems: [
        ...canvasItems,
        <Frame
          index={Math.max(...frameKeys) + 1}
          key={Math.max(...frameKeys) + 1}
          removeFrame={this.removeFrame}
          makeActive={this.makeActive}
          duplicateFrame={this.duplicateFrame}
          resetDuplicate={this.resetDuplicate}
        />,
      ],
      frameKeys: [...frameKeys, Math.max(...frameKeys) + 1],
      activeFrame: frameKeys.length,
    });

    const mainCanvas = document.querySelector('#canvas');
    const mainCtx = mainCanvas.getContext('2d');
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  };

  removeFrame = (index) => {
    const { canvasItems, frameKeys, activeFrame } = this.state;
    const indexToTranslate = setActiveFrame(activeFrame, canvasItems, index);
    canvasItems.splice(index, 1);
    frameKeys.splice(index, 1);
    translateActiveFrame(indexToTranslate);

    this.setState({
      canvasItems: [...canvasItems],
      frameKeys: [...frameKeys],
      activeFrame:
        indexToTranslate > canvasItems.length - 1
          ? canvasItems.length - 1
          : indexToTranslate,
    });
  };

  duplicateFrame = (index) => {
    const { canvasItems, frameKeys } = this.state;
    const { framesArray } = this.props;

    const frameForInsert = (
      <Frame
        index={index + 1}
        key={Math.max(...frameKeys) + 1}
        removeFrame={this.removeFrame}
        makeActive={this.makeActive}
        duplicateFrame={this.duplicateFrame}
        resetDuplicate={this.resetDuplicate}
        contextSource={framesArray[index]}
      />
    );
    canvasItems.splice(index + 1, 0, frameForInsert);
    frameKeys.splice(index + 1, 0, Math.max(...frameKeys) + 1);

    this.setState({
      canvasItems: [...canvasItems],
      frameKeys: [...frameKeys],
      duplicate: index + 1,
      activeFrame: index + 1,
    });
  };

  render() {
    const {
      canvasItems, frameKeys, activeFrame, duplicate,
    } = this.state;
    const { framesArray } = this.props;
    const keys = canvasItems.map(item => item.key);

    return (
      <section className="frames-section">
        {keys.map((item, index) => (
          <Frame
            index={index}
            key={frameKeys[index]}
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
