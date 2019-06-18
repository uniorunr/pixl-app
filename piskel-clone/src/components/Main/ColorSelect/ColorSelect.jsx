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
    } else {
      updateColor(target.value);
    }
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
              defaultValue={primaryColor}
              ref={this.primary}
              onInput={this.handlePrimaryChange}
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
              defaultValue={secondaryColor}
              ref={this.secondary}
              onInput={this.handlePrimaryChange}
            />
            <div
              className="colors__secondary"
              style={{ backgroundColor: secondaryColor }}
            />
          </div>
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
