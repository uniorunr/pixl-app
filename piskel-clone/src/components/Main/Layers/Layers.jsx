import React, { Component } from 'react';
import './Layers.scss';
import PropTypes from 'prop-types';

const saveLayerData = (keys, index, framesData, frames) => {
  const currLayerFramesData = framesData;
  const layerKey = `layer${keys[index]}`;
  currLayerFramesData[layerKey] = frames.map(item => item.toDataURL());
  sessionStorage.setItem('framesData', JSON.stringify(framesData));
};

const restoreFrames = (frames, keys, active, framesData) => {
  const canvas = document.querySelector('#canvas');
  const canvasContext = canvas.getContext('2d');
  canvasContext.imageSmoothingEnabled = false;
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  frames.forEach((frame, index) => {
    const frameContext = frame.getContext('2d');
    frameContext.imageSmoothingEnabled = false;
    frameContext.clearRect(0, 0, frame.width, frame.height);
    const img = new Image();
    const layerId = `layer${keys[active]}`;
    if (!framesData[layerId]) return;
    const URI = framesData[layerId][index];
    if (URI) {
      img.src = URI;
      img.onload = () => {
        frameContext.drawImage(img, 0, 0);
        saveLayerData(keys, active, framesData, frames);
        if (frame.classList.contains('frame__canvas_active')) {
          canvasContext.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };
    }
  });
};

class Layers extends Component {
  state = {
    layers: [],
    active: +sessionStorage.getItem('activeLayer') || 0,
    keys: JSON.parse(sessionStorage.getItem('layerKeys')) || [0],
  };

  componentDidMount = () => {
    const { active, keys } = this.state;
    const { framesData, framesArray, updateLayerKeys } = this.props;
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
    updateLayerKeys([0]);
    if (!sessionStorage.getItem('framesData')) {
      saveLayerData(keys, active, framesData, framesArray);
    } else {
      restoreFrames(framesArray, keys, active, framesData);
      saveLayerData(keys, active, framesData, framesArray);
    }
    if (!sessionStorage.getItem('layerKeys')) {
      sessionStorage.setItem('layerKeys', JSON.stringify([0]));
    }
  };

  componentDidUpdate() {
    const { keys, active } = this.state;
    const { framesData, framesArray } = this.props;
    saveLayerData(keys, active, framesData, framesArray);
  }

  handleAddButton = () => {
    const { layers, keys, active } = this.state;
    const {
      framesData,
      framesArray,
      updateLayerKeys,
      updateActiveLayer,
    } = this.props;
    saveLayerData(keys, active, framesData, framesArray);
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
    const updatedKeys = [...keys, Math.max(...keys) + 1];
    updateLayerKeys(updatedKeys);
    updateActiveLayer(keys.length);
    this.setState({
      layers: [...layers, newLayer],
      keys: updatedKeys,
      active: keys.length,
    });
    sessionStorage.setItem('layerKeys', JSON.stringify(updatedKeys));
    sessionStorage.setItem('activeLayer', `${keys.length}`);
  };

  handleRemoveButton = () => {
    const {
      framesData,
      framesArray,
      updateLayerKeys,
      updateActiveLayer,
    } = this.props;
    const { layers, keys, active } = this.state;
    delete framesData[`layer${keys[active]}`];
    if (keys.length > 1) {
      const newActive = keys.length - 2;
      layers.splice(active, 1);
      keys.splice(active, 1);
      restoreFrames(framesArray, keys, newActive, framesData);
      this.setState({
        layers: [...layers],
        keys: [...keys],
        active: newActive,
      });
      updateLayerKeys([...keys]);
      updateActiveLayer(newActive);
      sessionStorage.setItem('layerKeys', JSON.stringify([...keys]));
      sessionStorage.setItem('activeLayer', `${newActive}`);
    }
  };

  handleMoveUp = () => {
    const { layers, keys, active } = this.state;
    const { updateLayerKeys, updateActiveLayer } = this.props;
    const index = active;
    if (index > 0) {
      [layers[index - 1], layers[index]] = [layers[index], layers[index - 1]];
      [keys[index - 1], keys[index]] = [keys[index], keys[index - 1]];
      this.setState({
        layers: [...layers],
        active: active - 1,
        keys: [...keys],
      });
      updateLayerKeys([...keys]);
      updateActiveLayer(active - 1);
      sessionStorage.setItem('layerKeys', JSON.stringify([...keys]));
      sessionStorage.setItem('activeLayer', `${active - 1}`);
    }
  };

  handleMoveDown = () => {
    const { layers, keys, active } = this.state;
    const { updateLayerKeys, updateActiveLayer } = this.props;
    const index = active;
    if (index < keys.length - 1) {
      [layers[index + 1], layers[index]] = [layers[index], layers[index + 1]];
      [keys[index + 1], keys[index]] = [keys[index], keys[index + 1]];
      this.setState({
        layers: [...layers],
        active: active + 1,
        keys: [...keys],
      });
      updateLayerKeys([...keys]);
      updateActiveLayer(active + 1);
      sessionStorage.setItem('layerKeys', JSON.stringify([...keys]));
      sessionStorage.setItem('activeLayer', `${active + 1}`);
    }
  };

  handleMergeButton = () => {
    const { framesData, framesArray, updateLayerKeys } = this.props;
    const { layers, keys, active } = this.state;
    const canvas = document.querySelector('#canvas');
    saveLayerData(keys, active, framesData, framesArray);
    if (keys[active + 1] >= 0) {
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      framesArray.forEach((frame, index) => {
        const frameContext = frame.getContext('2d');
        frameContext.imageSmoothingEnabled = false;
        frameContext.clearRect(0, 0, frame.width, frame.height);
        const frontImg = new Image();
        const backImg = new Image();
        const frontLayerId = `layer${keys[active]}`;
        const backLayerId = `layer${keys[active + 1]}`;
        const frontURI = framesData[frontLayerId][index];
        const backURI = framesData[backLayerId][index];
        if (backURI) {
          backImg.src = backURI;
          backImg.onload = () => {
            frameContext.drawImage(backImg, 0, 0);
            saveLayerData(keys, active, framesData, framesArray);
            if (frame.classList.contains('frame__canvas_active')) {
              const canvasContext = canvas.getContext('2d');
              canvasContext.imageSmoothingEnabled = false;
              canvasContext.drawImage(
                backImg,
                0,
                0,
                canvas.width,
                canvas.height,
              );
            }
            if (frontURI) {
              frontImg.src = frontURI;
              frontImg.onload = () => {
                frameContext.drawImage(frontImg, 0, 0);
                saveLayerData(keys, active, framesData, framesArray);
                if (frame.classList.contains('frame__canvas_active')) {
                  const canvasContext = canvas.getContext('2d');
                  canvasContext.imageSmoothingEnabled = false;
                  canvasContext.drawImage(
                    frontImg,
                    0,
                    0,
                    canvas.width,
                    canvas.height,
                  );
                }
              };
            }
          };
        }
      });
      delete framesData[`layer${keys[active + 1]}`];
      layers.splice(active + 1, 1);
      keys.splice(active + 1, 1);
      this.setState({
        layers: [...layers],
        keys: [...keys],
      });
      updateLayerKeys([...keys]);
      sessionStorage.setItem('layerKeys', JSON.stringify([...keys]));
    }
  };

  makeActive = ({ target }) => {
    const { framesData, framesArray, updateActiveLayer } = this.props;
    const { active, keys } = this.state;
    saveLayerData(keys, active, framesData, framesArray);
    const newActive = keys.indexOf(+target.dataset.id);
    if (keys.length > 1) {
      restoreFrames(framesArray, keys, newActive, framesData);
      saveLayerData(keys, newActive, framesData, framesArray);
    }
    this.setState({
      active: newActive,
    });
    updateActiveLayer(newActive);
    sessionStorage.setItem('activeLayer', `${newActive}`);
  };

  render() {
    const { active, keys } = this.state;

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
            className="layers-section__move-up"
            onClick={this.handleMoveUp}
          >
            <i className="fas fa-arrow-up" />
          </button>
          <button
            type="button"
            className="layers-section__move-down"
            onClick={this.handleMoveDown}
          >
            <i className="fas fa-arrow-down" />
          </button>
          <button
            type="button"
            className="layers-section__remove-button"
            onClick={this.handleRemoveButton}
          >
            <i className="fas fa-trash-alt" />
          </button>
        </div>
        <button
          type="button"
          className="layers-section__merge-button"
          onClick={this.handleMergeButton}
        >
          merge
        </button>
        <div className="layers-section__wrapper">
          {keys.map((item, index) => (
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
  updateLayerKeys: PropTypes.func.isRequired,
  updateActiveLayer: PropTypes.func.isRequired,
  framesData: PropTypes.instanceOf(Object).isRequired,
  framesArray: PropTypes.instanceOf(Array).isRequired,
};

export default Layers;
