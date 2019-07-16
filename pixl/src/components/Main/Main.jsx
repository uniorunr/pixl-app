import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
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
  componentDidMount = () => {
    window.addEventListener('resize', this.updateDimensions);
  };

  updateDimensions = () => {
    const { updateCanvasSize } = this.props;
    updateCanvasSize(getWindowSize());
  };

  render() {
    return (
      <main className="main">
        <section>
          <Tools />
          <ColorSelect />
        </section>
        <Frames />
        <Canvas />
        <section className="right-section">
          <Preview />
          <Layers />
        </section>
      </main>
    );
  }
}

Main.propTypes = {
  updateCanvasSize: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  const { updateCanvasSize } = bindActionCreators(actions, dispatch);
  return {
    updateCanvasSize: (size) => {
      updateCanvasSize(size);
    },
  };
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Main);
