import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  updateLayerKeys = (keys) => {
    this.setState({
      layerKeys: [...keys],
    });
  };

  updateActiveLayer = (index) => {
    this.setState({
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

    const {
      toolsData,
      currToolId,
      updateCurrentTool,
      framesShortcuts,
    } = this.props;

    return (
      <main className="main">
        <section>
          <Tools
            toolsData={toolsData}
            updateCurrentTool={updateCurrentTool}
            currToolId={currToolId}
          />
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
          framesShortcuts={framesShortcuts}
        />
        <Canvas
          width={width}
          height={height}
          pixelsPerCanvas={pixelsPerCanvas}
          currToolId={currToolId}
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
            updateLayerKeys={this.updateLayerKeys}
            updateActiveLayer={this.updateActiveLayer}
          />
        </section>
      </main>
    );
  }
}

Main.propTypes = {
  toolsData: PropTypes.instanceOf(Object).isRequired,
  currToolId: PropTypes.string.isRequired,
  updateCurrentTool: PropTypes.func.isRequired,
  framesShortcuts: PropTypes.instanceOf(Object).isRequired,
};

export default Main;
