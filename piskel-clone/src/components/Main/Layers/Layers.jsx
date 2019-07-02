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
    active: +sessionStorage.getItem('activeLayer') || 0,
    keys: JSON.parse(sessionStorage.getItem('layerKeys')) || [0],
  };

  componentDidMount = () => {
    const { active, keys } = this.state;
    const { framesData, framesArray, updateLayerData } = this.props;
    updateLayerData([0], 0);
    if (!sessionStorage.getItem('framesData')) {
      saveLayerData(keys, active, framesData, framesArray);
    } else {
      restoreFrames(framesArray, keys, active, framesData);
      saveLayerData(keys, active, framesData, framesArray);
    }
    if (!sessionStorage.getItem('layerKeys')) {
      sessionStorage.setItem('layerKeys', JSON.stringify([0]));
    }
    document.addEventListener('keydown', ({ code, altKey }) => {
      const { layersShortcuts } = this.props;
      if (altKey) {
        if (code === layersShortcuts.add.shortcut) {
          this.handleAddButton();
        } else if (code === layersShortcuts.moveUp.shortcut) {
          this.handleMoveUp();
        } else if (code === layersShortcuts.moveDown.shortcut) {
          this.handleMoveDown();
        } else if (code === layersShortcuts.remove.shortcut) {
          this.handleRemoveButton();
        } else if (code === layersShortcuts.merge.shortcut) {
          this.handleMergeButton();
        }
      }
    });
  };

  handleAddButton = () => {
    const { keys, active } = this.state;
    const { framesData, framesArray, updateLayerData } = this.props;
    saveLayerData(keys, active, framesData, framesArray);
    const canvas = document.querySelector('#canvas');
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    framesArray.forEach((frame) => {
      frame.getContext('2d').clearRect(0, 0, frame.width, frame.height);
    });
    const updatedKeys = [...keys, Math.max(...keys) + 1];
    updateLayerData(updatedKeys, keys.length);
    this.setState({
      keys: updatedKeys,
      active: keys.length,
    });
    sessionStorage.setItem('layerKeys', JSON.stringify(updatedKeys));
    sessionStorage.setItem('activeLayer', `${keys.length}`);
  };

  handleRemoveButton = () => {
    const { framesData, framesArray, updateLayerData } = this.props;
    const { keys, active } = this.state;
    delete framesData[`layer${keys[active]}`];
    if (keys.length > 1) {
      const newActive = keys.length - 2;
      keys.splice(active, 1);
      restoreFrames(framesArray, keys, newActive, framesData);
      this.setState({
        keys: [...keys],
        active: newActive,
      });
      updateLayerData([...keys], newActive);
      sessionStorage.setItem('layerKeys', JSON.stringify([...keys]));
      sessionStorage.setItem('activeLayer', `${newActive}`);
    }
  };

  handleMoveUp = () => {
    const { keys, active } = this.state;
    const { updateLayerData } = this.props;
    const index = active;
    if (index > 0) {
      [keys[index - 1], keys[index]] = [keys[index], keys[index - 1]];
      this.setState({
        active: active - 1,
        keys: [...keys],
      });
      updateLayerData([...keys], active - 1);
      sessionStorage.setItem('layerKeys', JSON.stringify([...keys]));
      sessionStorage.setItem('activeLayer', `${active - 1}`);
    }
  };

  handleMoveDown = () => {
    const { keys, active } = this.state;
    const { updateLayerData } = this.props;
    const index = active;
    if (index < keys.length - 1) {
      [keys[index + 1], keys[index]] = [keys[index], keys[index + 1]];
      this.setState({
        active: active + 1,
        keys: [...keys],
      });
      updateLayerData([...keys], active + 1);
      sessionStorage.setItem('layerKeys', JSON.stringify([...keys]));
      sessionStorage.setItem('activeLayer', `${active + 1}`);
    }
  };

  handleMergeButton = () => {
    const { framesData, framesArray, updateLayerData } = this.props;
    const { keys, active } = this.state;
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
      keys.splice(active + 1, 1);
      this.setState({
        keys: [...keys],
      });
      updateLayerData([...keys], active);
      sessionStorage.setItem('layerKeys', JSON.stringify([...keys]));
    }
  };

  makeActive = ({ target }) => {
    const { framesData, framesArray, updateLayerData } = this.props;
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
    updateLayerData([...keys], newActive);
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
  updateLayerData: PropTypes.func.isRequired,
  framesData: PropTypes.instanceOf(Object).isRequired,
  framesArray: PropTypes.instanceOf(Array).isRequired,
  layersShortcuts: PropTypes.instanceOf(Object).isRequired,
};

export default Layers;
