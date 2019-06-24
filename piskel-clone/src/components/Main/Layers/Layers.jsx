import React, { Component } from 'react';
import './Layers.scss';
import PropTypes from 'prop-types';

const saveLayerData = (layers, index, framesData, frames) => {
  const currLayerFramesData = framesData;
  const layerKey = layers[index].props.id;
  currLayerFramesData[layerKey] = frames.map(item => item.toDataURL());
};

const restoreFrames = (frames, layers, active, framesData) => {
  const canvas = document.querySelector('#canvas');
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  frames.forEach((frame, index) => {
    frame.getContext('2d').clearRect(0, 0, frame.width, frame.height);
    const img = new Image();
    const layerId = layers[active].props.id;
    const URI = framesData[layerId][index];
    if (URI) {
      img.src = URI;
      img.onload = () => {
        frame.getContext('2d').drawImage(img, 0, 0);
        if (frame.classList.contains('frame__canvas_active')) {
          canvas
            .getContext('2d')
            .drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };
    }
  });
};

class Layers extends Component {
  state = {
    layers: [],
    active: 0,
    keys: [0],
  };

  componentDidMount = () => {
    const { updateLayers } = this.props;
    const initLayer = (
      <button
        className="layers-section__button layers-section__button_active"
        type="button"
        key="0"
        id="layer0"
        onClick={this.makeActive}
      >
        Layer 1
      </button>
    );
    this.setState({
      layers: [initLayer],
    });
    updateLayers([initLayer]);
  };

  handleAddButton = () => {
    const { layers, keys, active } = this.state;
    const { updateLayers, framesData, framesArray } = this.props;
    saveLayerData(layers, active, framesData, framesArray);
    const canvas = document.querySelector('#canvas');
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    framesArray.forEach((frame) => {
      frame.getContext('2d').clearRect(0, 0, frame.width, frame.height);
    });
    const newLayer = (
      <button
        className="layers-section__button"
        type="button"
        key={Math.max(...keys) + 1}
        id={`layer${Math.max(...keys) + 1}`}
        data-id={Math.max(...keys) + 1}
        onClick={this.makeActive}
      >
        Layer {Math.max(...keys) + 1}
      </button>
    );
    this.setState({
      layers: [...layers, newLayer],
      keys: [...keys, Math.max(...keys) + 1],
      active: keys.length,
    });
    updateLayers([...layers, newLayer]);
  };

  handleRemoveButton = () => {
    const { updateLayers, framesData, framesArray } = this.props;
    const { layers, keys, active } = this.state;
    delete framesData[layers[active].props.id];
    const newActive = layers.length - 2;
    if (layers.length > 1) {
      layers.splice(active, 1);
      keys.splice(active, 1);
      restoreFrames(framesArray, layers, newActive, framesData);
    }
    this.setState({
      layers: [...layers],
      active: newActive,
    });
    updateLayers([...layers]);
  };

  makeActive = ({ target }) => {
    const { framesData, framesArray } = this.props;
    const { layers, active, keys } = this.state;
    saveLayerData(layers, active, framesData, framesArray);
    const newActive = keys.indexOf(+target.dataset.id);
    if (layers.length > 1) {
      restoreFrames(framesArray, layers, newActive, framesData);
    }
    this.setState({
      active: newActive,
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

Layers.propTypes = {
  updateLayers: PropTypes.func.isRequired,
  framesData: PropTypes.instanceOf(Object).isRequired,
  framesArray: PropTypes.instanceOf(Array).isRequired,
};

export default Layers;
