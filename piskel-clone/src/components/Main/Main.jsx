import React, { Component } from 'react';
import Tools from './Tools/Tools';
import Canvas from './Canvas/Canvas';
import Preview from './Preview/Preview';
import './Main.scss';

const getWindowSize = () => {
  const windowWidth = ((window.innerWidth / 20).toFixed(0) - 3) * 10;
  const windowHeight = ((window.innerHeight / 12).toFixed(0) - 3) * 10;
  return windowWidth < windowHeight ? windowWidth : windowHeight;
};

class Main extends Component {
  state = {
    width: getWindowSize(),
    height: getWindowSize(),
    canvasSize: 32,
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

  handleCanvasSize = (event) => {
    this.setState({
      canvasSize: +event.currentTarget.value,
    });
  };

  render() {
    const { width, height, canvasSize } = this.state;
    return (
      <main className="main">
        <Tools />
        <Canvas width={width} height={height} canvasSize={canvasSize} />
        <Preview handleCanvasSize={this.handleCanvasSize} />
      </main>
    );
  }
}

export default Main;
