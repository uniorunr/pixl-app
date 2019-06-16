import React, { Component } from 'react';
import './FpsControl.scss';
import PropTypes from 'prop-types';

class FpsControl extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount = () => {
    const { updateFps } = this.props;
    updateFps(this.inputRef.current.value);
  };

  handleInputChange = ({ target: { value } }) => {
    const { updateFps } = this.props;
    updateFps(value);
  };

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
            onInput={this.handleInputChange}
            ref={this.inputRef}
          />
        </label>
      </div>
    );
  }
}

FpsControl.propTypes = {
  updateFps: PropTypes.func.isRequired,
};

export default FpsControl;
