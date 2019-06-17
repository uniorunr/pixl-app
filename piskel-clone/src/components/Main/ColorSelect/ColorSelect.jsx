import React, { Component } from 'react';
import './ColorSelect.scss';

class ColorSelect extends Component {
  state = {
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
  };

  render() {
    const { primaryColor, secondaryColor } = this.state;

    return (
      <section className="color-select-section">
        <div className="colors">
          <div
            className="colors__primary"
            style={{ background: primaryColor }}
          />
          <div
            className="colors__secondary"
            style={{ background: secondaryColor }}
          />
        </div>
      </section>
    );
  }
}

export default ColorSelect;
