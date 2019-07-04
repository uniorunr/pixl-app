import React from 'react';
import PropTypes from 'prop-types';
import './CanvasInfo.scss';

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

export default CanvasInfo;
