import React from 'react';
import PropTypes from 'prop-types';
import './CanvasInfo.scss';
import { connect } from 'react-redux';

const CanvasInfo = ({ pixelsPerCanvas, currX, currY }) => (
  <div className="canvas-section__info">
    <span className="canvas-section__size">{`size: ${pixelsPerCanvas}x${pixelsPerCanvas}`}</span>
    <span className="canvas-section__position">
      {`x: ${currX >= 0 ? currX : 0}  y: ${currY >= 0 ? currY : 0}`}
    </span>
  </div>
);

CanvasInfo.propTypes = {
  pixelsPerCanvas: PropTypes.number.isRequired,
  currX: PropTypes.number.isRequired,
  currY: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  pixelsPerCanvas: state.canvas.pixelsPerCanvas,
  currX: state.canvas.currX,
  currY: state.canvas.currY,
});

export default connect(mapStateToProps)(CanvasInfo);
