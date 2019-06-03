import React, { Component } from 'react';
import CanvasSize from './CanvasSize/CanvasSize';
import Tools from './Tools/Tools';
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
    console.log(canvasSize);
    return (
      <main className="main">
        <Tools />
        <section className="canvas-section">
          <canvas
            className="canvas-section__canvas"
            id="canvas"
            width={width}
            height={height}
          />
        </section>
        <CanvasSize handleCanvasSize={this.handleCanvasSize} />
      </main>
    );
  }
}

export default Main;
