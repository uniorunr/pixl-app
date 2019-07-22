import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/actions';
import './FpsControl.scss';

class FpsControl extends Component {
  inputRef = React.createRef();

  componentDidMount = () => {
    const { updateFps } = this.props;
    updateFps(+this.inputRef.current.value);
  };

  handleInputChange = ({ target: { value } }) => {
    const { updateFps } = this.props;
    updateFps(+value);
  };

  render() {
    const { fps } = this.props;

    return (
      <div className="fps-control">
        <label htmlFor="fps-control__input">
          <span className="fps-control__label">FPS: {fps}</span>
          <input
            type="range"
            id="fps-control__input"
            className="fps-control__input"
            name="volume"
            min="1"
            max="24"
            defaultValue="12"
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
  fps: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  fps: state.preview.fps,
});

const mapDispatchToProps = (dispatch) => {
  const { updateFps } = bindActionCreators(actions, dispatch);
  return {
    updateFps: (fps) => {
      updateFps(fps);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FpsControl);
