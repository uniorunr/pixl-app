import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/actions';
import './CanvasSize.scss';

class CanvasSize extends Component {
  render() {
    const { updatePixelsPerCanvas } = this.props;
    return (
      <form className="canvas-size-controls" name="canvas-size-controls">
        <label htmlFor="canvas-32">
          32
          <input
            type="radio"
            id="canvas-32"
            name="radio"
            value="32"
            onChange={updatePixelsPerCanvas}
          />
        </label>

        <label htmlFor="canvas-64">
          64
          <input
            type="radio"
            id="canvas-64"
            name="radio"
            value="64"
            onChange={updatePixelsPerCanvas}
            defaultChecked
          />
        </label>

        <label htmlFor="canvas-128">
          128
          <input
            type="radio"
            id="canvas-128"
            name="radio"
            value="128"
            onChange={updatePixelsPerCanvas}
          />
        </label>
      </form>
    );
  }
}

CanvasSize.propTypes = {
  updatePixelsPerCanvas: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  const { updatePixelsPerCanvas } = bindActionCreators(actions, dispatch);
  return {
    updatePixelsPerCanvas,
  };
};

export default connect(
  undefined,
  mapDispatchToProps,
)(CanvasSize);
