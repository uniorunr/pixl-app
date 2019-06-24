import React, { Component } from 'react';
import './Layers.scss';

class Layers extends Component {
  state = {
    layers: [],
    active: 0,
    keys: [0],
  };

  componentDidMount = () => {
    this.setState({
      layers: [
        <button
          className="layers-section__button layers-section__button_active"
          type="button"
          key="0"
          id="layer0"
          onClick={this.makeActive}
        >
          Layer 1
        </button>,
      ],
    });
  };

  handleAddButton = () => {
    const { layers, keys } = this.state;
    this.setState({
      layers: [
        ...layers,
        <button
          className="layers-section__button"
          type="button"
          key={Math.max(...keys) + 1}
          id={`layer${Math.max(...keys) + 1}`}
          data-id={Math.max(...keys) + 1}
          onClick={this.makeActive}
        >
          Layer {Math.max(...keys) + 1}
        </button>,
      ],
      keys: [...keys, Math.max(...keys) + 1],
      active: keys.length,
    });
  };

  handleRemoveButton = () => {
    const { layers, keys, active } = this.state;
    if (layers.length > 1) {
      layers.splice(active, 1);
      keys.splice(active, 1);
    }
    this.setState({
      layers: [...layers],
      active: layers.length - 1,
    });
  };

  makeActive = ({ target }) => {
    const { keys } = this.state;
    this.setState({
      active: keys.indexOf(+target.dataset.id),
    });
  };

  render() {
    const { layers, active, keys } = this.state;

    return (
      <section className="layers-section">
        <div className="layers-section__controls">
          <button
            type="button"
            className="layers-section__add-button"
            onClick={this.handleAddButton}
          >
            <i className="fas fa-plus" />
          </button>
          <button
            type="button"
            className="layers-section__remove-button"
            onClick={this.handleRemoveButton}
          >
            <i className="fas fa-trash-alt" />
          </button>
        </div>
        <div className="layers-section__wrapper">
          {layers.map((item, index) => (
            <button
              className={`layers-section__button ${
                index === active ? 'layers-section__button_active' : ''
              }`}
              id={`layer${keys[index]}`}
              data-id={keys[index]}
              type="button"
              key={keys[index]}
              onClick={this.makeActive}
            >
              Layer {keys[index] + 1}
            </button>
          ))}
        </div>
      </section>
    );
  }
}

export default Layers;
