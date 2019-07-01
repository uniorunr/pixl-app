import React, { Component } from 'react';
import './ColorSelect.scss';
import PropTypes from 'prop-types';

class ColorSelect extends Component {
  constructor(props) {
    super(props);
    this.primary = React.createRef();
    this.secondary = React.createRef();
  }

  handlePrimaryChange = ({ target }) => {
    const { updateColor } = this.props;
    if (target === this.primary.current) {
      updateColor(target.value, 'primary');
      sessionStorage.setItem('primaryColor', target.value);
    } else {
      updateColor(target.value);
      sessionStorage.setItem('secondaryColor', target.value);
    }
  };

  handleSwap = () => {
    const { updateColor, primaryColor, secondaryColor } = this.props;
    updateColor(secondaryColor, 'primary');
    sessionStorage.setItem('primaryColor', secondaryColor);
    updateColor(primaryColor);
    sessionStorage.setItem('secondaryColor', primaryColor);
  };

  render() {
    const { primaryColor, secondaryColor } = this.props;

    return (
      <section className="color-select-section">
        <div className="colors">
          <div>
            <input
              type="color"
              className="colors__input-primary"
              value={primaryColor}
              ref={this.primary}
              onChange={this.handlePrimaryChange}
            />
            <div
              className="colors__primary"
              style={{ backgroundColor: primaryColor }}
            />
          </div>
          <div>
            <input
              type="color"
              className="colors__input-secondary"
              value={secondaryColor}
              ref={this.secondary}
              onChange={this.handlePrimaryChange}
            />
            <div
              className="colors__secondary"
              style={{ backgroundColor: secondaryColor }}
            />
          </div>
          <button
            type="button"
            className="colors__swap"
            onClick={this.handleSwap}
          >
            swap
          </button>
        </div>
      </section>
    );
  }
}

ColorSelect.propTypes = {
  updateColor: PropTypes.func.isRequired,
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
};

export default ColorSelect;
