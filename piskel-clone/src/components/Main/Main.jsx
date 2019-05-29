import React, { Component } from 'react';
import './Main.scss';

const getWindowSize = () => ((window.innerWidth / 20).toFixed(0) - 3) * 10;

class Main extends Component {
  state = {
    width: getWindowSize(),
    height: getWindowSize(),
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

  render() {
    const { width, height } = this.state;
    return (
      <main className="main">
        <canvas className="canvas" id="canvas" width={width} height={height} />
      </main>
    );
  }
}

export default Main;
