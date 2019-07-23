import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/actions';
import './Layers.scss';
import { saveLayerData, restoreFrames } from './utils';

class Layers extends Component {
  componentDidMount = () => {
    const {
      framesData,
      framesArray,
      layerKeys,
      activeLayer,
      updateFramesData,
    } = this.props;
    if (!sessionStorage.getItem('framesData')) {
      saveLayerData(
        layerKeys,
        activeLayer,
        framesData,
        framesArray,
        updateFramesData,
      );
    } else {
      restoreFrames(
        framesArray,
        layerKeys,
        activeLayer,
        framesData,
        updateFramesData,
      );
      saveLayerData(
        layerKeys,
        activeLayer,
        framesData,
        framesArray,
        updateFramesData,
      );
    }
    document.addEventListener('keydown', this.handleKeyboard);
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyboard);
  }

  handleKeyboard = ({ code, altKey }) => {
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
  };

  handleAddButton = () => {
    const {
      framesData,
      framesArray,
      updateLayerKeys,
      updateActiveLayer,
      canvas,
      layerKeys,
      activeLayer,
      updateFramesData,
    } = this.props;
    saveLayerData(
      layerKeys,
      activeLayer,
      framesData,
      framesArray,
      updateFramesData,
    );
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    framesArray.forEach((frame) => {
      frame.getContext('2d').clearRect(0, 0, frame.width, frame.height);
    });
    const updatedKeys = [...layerKeys, Math.max(...layerKeys) + 1];
    updateLayerKeys(updatedKeys);
    updateActiveLayer(layerKeys.length);
    saveLayerData(
      updatedKeys,
      layerKeys.length,
      framesData,
      framesArray,
      updateFramesData,
    );
    sessionStorage.setItem('layerKeys', JSON.stringify(updatedKeys));
    sessionStorage.setItem('activeLayer', `${layerKeys.length}`);
  };

  handleRemoveButton = () => {
    const {
      framesData,
      framesArray,
      updateLayerKeys,
      updateActiveLayer,
      layerKeys,
      activeLayer,
      updateFramesData,
    } = this.props;
    const tempFramesData = { ...framesData };
    const tempLayerKeys = [...layerKeys];
    delete tempFramesData[`layer${layerKeys[activeLayer]}`];
    updateFramesData(tempFramesData);
    if (layerKeys.length > 1) {
      const newActive = layerKeys.length - 2;
      tempLayerKeys.splice(activeLayer, 1);
      restoreFrames(
        framesArray,
        tempLayerKeys,
        newActive,
        tempFramesData,
        updateFramesData,
      );
      updateLayerKeys(tempLayerKeys);
      updateActiveLayer(newActive);
      sessionStorage.setItem('layerKeys', JSON.stringify(tempLayerKeys));
      sessionStorage.setItem('activeLayer', `${newActive}`);
    }
  };

  handleMoveUp = () => {
    const {
      updateLayerKeys,
      updateActiveLayer,
      layerKeys,
      activeLayer,
    } = this.props;
    const index = activeLayer;
    if (index > 0) {
      [layerKeys[index - 1], layerKeys[index]] = [
        layerKeys[index],
        layerKeys[index - 1],
      ];
      updateLayerKeys([...layerKeys]);
      updateActiveLayer(activeLayer - 1);
      sessionStorage.setItem('layerKeys', JSON.stringify([...layerKeys]));
      sessionStorage.setItem('activeLayer', `${activeLayer - 1}`);
    }
  };

  handleMoveDown = () => {
    const {
      updateLayerKeys,
      updateActiveLayer,
      layerKeys,
      activeLayer,
    } = this.props;
    const index = activeLayer;
    if (index < layerKeys.length - 1) {
      [layerKeys[index + 1], layerKeys[index]] = [
        layerKeys[index],
        layerKeys[index + 1],
      ];
      updateLayerKeys([...layerKeys]);
      updateActiveLayer(activeLayer + 1);
      sessionStorage.setItem('layerKeys', JSON.stringify([...layerKeys]));
      sessionStorage.setItem('activeLayer', `${activeLayer + 1}`);
    }
  };

  handleMergeButton = () => {
    const {
      framesData,
      framesArray,
      updateLayerKeys,
      updateActiveLayer,
      canvas,
      layerKeys,
      activeLayer,
      updateFramesData,
    } = this.props;
    saveLayerData(
      layerKeys,
      activeLayer,
      framesData,
      framesArray,
      updateFramesData,
    );
    if (layerKeys[activeLayer + 1] >= 0) {
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      framesArray.forEach((frame, index) => {
        const frameContext = frame.getContext('2d');
        frameContext.imageSmoothingEnabled = false;
        frameContext.clearRect(0, 0, frame.width, frame.height);
        const frontImg = new Image();
        const backImg = new Image();
        const frontLayerId = `layer${layerKeys[activeLayer]}`;
        const backLayerId = `layer${layerKeys[activeLayer + 1]}`;
        const frontURI = framesData[frontLayerId][index];
        const backURI = framesData[backLayerId][index];
        const tempFramesData = { ...framesData };
        const tempLayerKeys = [...layerKeys];
        delete tempFramesData[`layer${layerKeys[activeLayer + 1]}`];
        updateFramesData(tempFramesData);
        tempLayerKeys.splice(activeLayer + 1, 1);
        updateLayerKeys(tempLayerKeys);
        updateActiveLayer(activeLayer);
        if (backURI) {
          backImg.src = backURI;
          backImg.onload = () => {
            frameContext.drawImage(backImg, 0, 0);
            saveLayerData(
              tempLayerKeys,
              activeLayer,
              tempFramesData,
              framesArray,
              updateFramesData,
            );
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
                saveLayerData(
                  tempLayerKeys,
                  activeLayer,
                  tempFramesData,
                  framesArray,
                  updateFramesData,
                );
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
      const tempFramesData = { ...framesData };
      const tempLayerKeys = [...layerKeys];
      delete tempFramesData[`layer${layerKeys[activeLayer + 1]}`];
      updateFramesData(tempFramesData);
      tempLayerKeys.splice(activeLayer + 1, 1);
      updateLayerKeys(tempLayerKeys);
      updateActiveLayer(activeLayer);
      sessionStorage.setItem('framesData', JSON.stringify(tempFramesData));
      sessionStorage.setItem('layerKeys', JSON.stringify(tempLayerKeys));
      sessionStorage.setItem('activeLayer', `${activeLayer}`);
    }
  };

  makeActive = ({ target }) => {
    const {
      framesData,
      framesArray,
      updateLayerKeys,
      updateActiveLayer,
      layerKeys,
      activeLayer,
      updateFramesData,
    } = this.props;
    saveLayerData(
      layerKeys,
      activeLayer,
      framesData,
      framesArray,
      updateFramesData,
    );
    const newActive = layerKeys.indexOf(+target.dataset.id);
    if (layerKeys.length > 1) {
      restoreFrames(
        framesArray,
        layerKeys,
        newActive,
        framesData,
        updateFramesData,
      );
      saveLayerData(
        layerKeys,
        newActive,
        framesData,
        framesArray,
        updateFramesData,
      );
    }
    updateLayerKeys([...layerKeys]);
    updateActiveLayer(newActive);
    sessionStorage.setItem('activeLayer', `${newActive}`);
  };

  render() {
    const { layerKeys, activeLayer } = this.props;

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
          {layerKeys.map((item, index) => (
            <button
              className={`layers-section__button ${
                index === activeLayer ? 'layers-section__button_active' : ''
              }`}
              id={`layer${layerKeys[index]}`}
              data-id={layerKeys[index]}
              type="button"
              key={layerKeys[index]}
              onClick={this.makeActive}
            >
              Layer {layerKeys[index] + 1}
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
  layersShortcuts: PropTypes.instanceOf(Object).isRequired,
  canvas: PropTypes.instanceOf(Object),
  layerKeys: PropTypes.instanceOf(Array).isRequired,
  activeLayer: PropTypes.number.isRequired,
  updateFramesData: PropTypes.func.isRequired,
};

Layers.defaultProps = {
  canvas: null,
};

const mapStateToProps = state => ({
  layersShortcuts: state.layers.layersShortcuts,
  framesArray: state.frames.framesArray,
  framesData: state.frames.framesData,
  canvas: state.canvas.canvasRef,
  layerKeys: state.layers.layerKeys,
  activeLayer: state.layers.activeLayer,
});

const mapDispatchToProps = (dispatch) => {
  const {
    updateLayerKeys,
    updateActiveLayer,
    updateFramesData,
  } = bindActionCreators(actions, dispatch);
  return {
    updateLayerKeys: (keys) => {
      updateLayerKeys(keys);
    },
    updateActiveLayer: (index) => {
      updateActiveLayer(index);
    },
    updateFramesData: (data) => {
      updateFramesData(data);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layers);
