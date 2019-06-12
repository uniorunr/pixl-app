import React, { Component } from 'react';
import Frame from './Frame/Frame';
import './Frames.scss';

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
  };

  removeFrame = (index) => {
    const { canvasItems, frameKeys, activeFrame } = this.state;
    let finalIndex = null;
    if (index === activeFrame) {
      finalIndex = 0;
    } else if (index === canvasItems.length - 1) {
      finalIndex = activeFrame;
    } else if (
      index === canvasItems.length - 2
      && activeFrame === canvasItems.length - 1
    ) {
      finalIndex = index;
    } else {
      finalIndex = activeFrame;
    }
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

export default Frames;
