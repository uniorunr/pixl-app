import React, { Component } from 'react';
import Tools from './Tools/Tools';
import Frames from './Frames/Frames';
import Canvas from './Canvas/Canvas';
import Preview from './Preview/Preview';
import ColorSelect from './ColorSelect/ColorSelect';
import Layers from './Layers/Layers';
import './Main.scss';

const getWindowSize = () => {
  const windowWidth = ((window.innerWidth / 128) * 0.5).toFixed(0) * 128;
  const windowHeight = ((window.innerHeight / 128) * 0.8).toFixed(0) * 128;
  return windowWidth < windowHeight ? windowWidth : windowHeight;
};

class Main extends Component {
  constructor() {
    super();

    this.state = {
      width: getWindowSize(),
      height: getWindowSize(),
      pixelsPerCanvas: 64,
      currToolId: 'pen',
      frames: [],
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
    };
  }

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

  updateColor = (color, isPrimary) => {
    if (isPrimary) {
      this.setState({
        primaryColor: color,
      });
    } else {
      this.setState({
        secondaryColor: color,
      });
    }
  };

  render() {
    const {
      width,
      height,
      pixelsPerCanvas,
      currToolId,
      frames,
      primaryColor,
      secondaryColor,
    } = this.state;

    return (
      <main className="main">
        <section>
          <Tools updateCurrentTool={this.updateCurrentTool} />
          <ColorSelect
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            updateColor={this.updateColor}
          />
        </section>
        <Frames framesArray={frames} />
        <Canvas
          width={width}
          height={height}
          pixelsPerCanvas={pixelsPerCanvas}
          currToolId={currToolId}
          primaryColor={primaryColor}
          framesArray={frames}
          secondaryColor={secondaryColor}
          updateColor={this.updateColor}
        />
        <section className="right-section">
          <Preview
            framesArray={frames}
            handlePixelsPerCanvas={this.handlePixelsPerCanvas}
          />
          <Layers />
        </section>
      </main>
    );
  }
}

export default Main;
