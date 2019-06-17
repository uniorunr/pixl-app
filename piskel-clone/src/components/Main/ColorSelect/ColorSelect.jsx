import React, { Component } from 'react';
import './ColorSelect.scss';

class ColorSelect extends Component {
  constructor(props) {
    super(props);
    this.primary = React.createRef();
    this.secondary = React.createRef();

    this.state = {
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
    };
  }

  handlePrimaryChange = ({ target }) => {
    if (target === this.primary.current) {
      this.setState({
        primaryColor: target.value,
      });
    } else {
      this.setState({
        secondaryColor: target.value,
      });
    }
  };

  render() {
    const { primaryColor, secondaryColor } = this.state;

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

export default ColorSelect;
