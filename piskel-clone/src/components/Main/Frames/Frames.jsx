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
          duplicateFrame={this.duplicateFrame}
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
    translateActiveFrame(finalIndex);

    canvasItems.splice(index, 1);
    frameKeys.splice(index, 1);
    this.setState({
      canvasItems: [...canvasItems],
      frameKeys: [...frameKeys],
      activeFrame: finalIndex,
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
        contextSource={framesArray[index]}
      />
    );
    canvasItems.splice(index + 1, 0, frameForInsert);
    frameKeys.splice(index + 1, 0, Math.max(...frameKeys) + 1);

    this.setState({
      canvasItems: [...canvasItems],
      frameKeys: [...frameKeys],
      duplicate: index + 1,
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
