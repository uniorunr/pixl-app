import React, { Component } from 'react';
import './FpsControl.scss';

class FpsControl extends Component {
  render() {
    return (
      <div className="fps-control">
        <label htmlFor="fps-control__input">
          <span />
          <span>FPS</span>
          <input
            type="range"
            id="fps-control__input"
            className="fps-control__input"
            name="volume"
            min="1"
            max="24"
            step="1"
          />
        </label>
      </div>
    );
  }
}

export default FpsControl;
