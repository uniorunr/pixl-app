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
      frames: [],
      framesData: JSON.parse(sessionStorage.getItem('framesData')) || {},
      layerKeys: [],
      activeLayer: +sessionStorage.getItem('activeLayer') || 0,
      primaryColor: sessionStorage.getItem('primaryColor') || '#000000',
      secondaryColor: sessionStorage.getItem('secondaryColor') || '#ffffff',
    };
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.updateDimensions);
  };

  updateFrames = (frames) => {
    this.setState({
      frames: [...frames],
    });
  };

  updateLayerData = (keys, index) => {
    this.setState({
      layerKeys: [...keys],
      activeLayer: index,
    });
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
      frames,
      primaryColor,
      secondaryColor,
      framesData,
      layerKeys,
      activeLayer,
    } = this.state;

    return (
      <main className="main">
        <section>
          <Tools />
          <ColorSelect
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            updateColor={this.updateColor}
          />
        </section>
        <Frames
          framesArray={frames}
          framesData={framesData}
          layerKeys={layerKeys}
          activeLayer={activeLayer}
          updateFrames={this.updateFrames}
        />
        <Canvas
          width={width}
          height={height}
          pixelsPerCanvas={pixelsPerCanvas}
          primaryColor={primaryColor}
          framesArray={frames}
          framesData={framesData}
          layerKeys={layerKeys}
          activeLayer={activeLayer}
          secondaryColor={secondaryColor}
          updateColor={this.updateColor}
        />
        <section className="right-section">
          <Preview
            framesArray={frames}
            handlePixelsPerCanvas={this.handlePixelsPerCanvas}
          />
          <Layers
            framesArray={frames}
            framesData={framesData}
            updateLayerData={this.updateLayerData}
          />
        </section>
      </main>
    );
  }
}

export default Main;
