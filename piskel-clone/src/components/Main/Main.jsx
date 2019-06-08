import React, { Component } from 'react';
import Tools from './Tools/Tools';
import Canvas from './Canvas/Canvas';
import Preview from './Preview/Preview';
import './Main.scss';

const getWindowSize = () => {
  const windowWidth = ((window.innerWidth / 128) * 0.5).toFixed(0) * 128;
  const windowHeight = ((window.innerHeight / 128) * 0.8).toFixed(0) * 128;
  return windowWidth < windowHeight ? windowWidth : windowHeight;
};

class Main extends Component {
  state = {
    width: getWindowSize(),
    height: getWindowSize(),
    pixelsPerCanvas: 32,
    currToolId: 'pen',
  };

  componentDidMount = () => {
    window.addEventListener('resize', this.updateDimensions);
  };

  updateDimensions = () => {
    this.setState({
      width: getWindowSize(),
      height: getWindowSize(),
    });
  };

  handlePixelsPerCanvas = (event) => {
    this.setState({
      pixelsPerCanvas: +event.currentTarget.value,
    });
  };

  updateCurrentTool = (tool) => {
    this.setState({
      currToolId: tool,
    });
  };

  render() {
    const {
      width, height, pixelsPerCanvas, currToolId,
    } = this.state;
    return (
      <main className="main">
        <Tools updateCurrentTool={this.updateCurrentTool} />
        <Canvas
          width={width}
          height={height}
          pixelsPerCanvas={pixelsPerCanvas}
          currToolId={currToolId}
        />
        <Preview handlePixelsPerCanvas={this.handlePixelsPerCanvas} />
      </main>
    );
  }
}

export default Main;
