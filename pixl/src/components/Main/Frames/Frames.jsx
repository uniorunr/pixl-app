import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Frame from './Frame/Frame';
import List from './ListWrapper/ListWrapper';
import * as actions from '../../../actions/actions';
import { setActiveFrame, translateActiveFrame } from './utils';
import './Frames.scss';

class Frames extends Component {
  componentDidMount() {
    document.addEventListener('keydown', ({ code, shiftKey }) => {
      const { framesShortcuts, activeFrame } = this.props;
      if (shiftKey) {
        if (code === framesShortcuts.duplicate.shortcut) {
          this.duplicateFrame(activeFrame);
        } else if (
          code === framesShortcuts.remove.shortcut
          && activeFrame !== 0
        ) {
          this.removeFrame(activeFrame);
        }
      }
    });
  }

  componentDidUpdate(prevProps) {
    const {
      framesData,
      framesArray,
      layerKeys,
      activeLayer,
      frameKeys,
      activeFrame,
      updateFramesData,
    } = this.props;
    if (
      JSON.stringify(prevProps.framesData) !== JSON.stringify(framesData)
      || JSON.stringify(prevProps.frameKeys) !== JSON.stringify(frameKeys)
      || JSON.stringify(prevProps.layerKeys) !== JSON.stringify(layerKeys)
    ) {
      const layerKey = `layer${layerKeys[activeLayer]}`;
      if (layerKeys[activeLayer] >= 0) {
        const tempFramesData = { ...framesData };
        tempFramesData[layerKey] = framesArray.map(item => item.toDataURL());
        updateFramesData(tempFramesData);
        sessionStorage.setItem('framesData', JSON.stringify(tempFramesData));
      }
      sessionStorage.setItem('activeFrame', `${activeFrame}`);
      sessionStorage.setItem('frameKeys', JSON.stringify(frameKeys));
    }
  }

  duplicateFrame = (index) => {
    const {
      frameKeys,
      updateDuplicateFrameIndex,
      updateActiveFrameIndex,
      updateFrameKeys,
      framesArray,
    } = this.props;
    const tempFrameKeys = [...frameKeys];
    tempFrameKeys.splice(index + 1, 0, Math.max(...tempFrameKeys) + 1);
    updateFrameKeys([...tempFrameKeys]);
    updateActiveFrameIndex(index + 1);
    const origin = framesArray[index];
    const target = framesArray[index + 1];
    const context = target.getContext('2d');
    context.imageSmoothingEnabled = false;
    context.drawImage(origin, 0, 0, target.width, target.height);
    translateActiveFrame(index);
    updateDuplicateFrameIndex(null);
    sessionStorage.setItem('activeFrame', index + 1);
  };

  removeFrame = (index) => {
    const {
      frameKeys,
      activeFrame,
      updateActiveFrameIndex,
      updateFrameKeys,
      framesData,
      activeLayer,
      layerKeys,
      updateFramesData,
    } = this.props;
    const indexToTranslate = setActiveFrame(activeFrame, frameKeys, index);
    const tempFrameKeys = [...frameKeys];
    const tempFramesData = { ...framesData };
    const newActiveFrameIndex = indexToTranslate > tempFrameKeys.length - 2
      ? tempFrameKeys.length - 2
      : indexToTranslate;
    const layerKey = `layer${layerKeys[activeLayer]}`;
    tempFrameKeys.splice(index, 1);
    tempFramesData[layerKey].splice(index, 1);
    updateFramesData(tempFramesData);
    updateFrameKeys([...tempFrameKeys]);
    updateActiveFrameIndex(newActiveFrameIndex);
    translateActiveFrame(indexToTranslate);
    sessionStorage.setItem('activeFrame', newActiveFrameIndex);
  };

  addFrame = () => {
    const {
      frameKeys,
      canvas,
      updateActiveFrameIndex,
      updateFrameKeys,
    } = this.props;

    const newFrameKeys = [...frameKeys, Math.max(...frameKeys) + 1];
    updateFrameKeys(newFrameKeys);
    updateActiveFrameIndex(frameKeys.length);
    sessionStorage.setItem('frameKeys', JSON.stringify(newFrameKeys));
    const mainCtx = canvas.getContext('2d');
    mainCtx.clearRect(0, 0, canvas.width, canvas.height);
  };

  onDragEnd = (result) => {
    const { destination, source } = result;
    const {
      frameKeys,
      activeFrame,
      updateActiveFrameIndex,
      updateFrameKeys,
      framesArray,
      framesData,
      activeLayer,
      layerKeys,
      updateFramesData,
    } = this.props;
    const destIndex = destination ? destination.index : null;
    const srcIndex = source.index;
    const activeFrameKey = frameKeys[activeFrame];
    if (destination && destIndex !== srcIndex) {
      const tempFrameKeys = [...frameKeys];
      const srcItem = tempFrameKeys[srcIndex];
      tempFrameKeys.splice(srcIndex, 1);
      tempFrameKeys.splice(destIndex, 0, srcItem);
      updateActiveFrameIndex(tempFrameKeys.indexOf(activeFrameKey));
      updateFrameKeys([...tempFrameKeys]);

      const tempFramesData = { ...framesData };
      const layerKey = `layer${layerKeys[activeLayer]}`;
      tempFramesData[layerKey] = framesArray.map(item => item.toDataURL());
      updateFramesData(tempFramesData);
      sessionStorage.setItem('framesData', JSON.stringify(tempFramesData));
    }
  };

  render() {
    const { frameKeys, activeFrame, duplicateIndex } = this.props;

    return (
      <section className="frames-section">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="frames">
            {provided => (
              <List provided={provided} innerRef={provided.innerRef}>
                {frameKeys.map((item, index) => (
                  <Draggable
                    draggableId={`item${item}`}
                    index={index}
                    key={item}
                  >
                    {provided1 => (
                      <Frame
                        index={index}
                        key={item}
                        removeFrame={this.removeFrame}
                        active={index === activeFrame}
                        duplicate={index === duplicateIndex}
                        frameKeys={frameKeys}
                        provided={provided1}
                        innerRef={provided1.innerRef}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
        <button
          type="button"
          className="frames-section__add-frame-button"
          onClick={this.addFrame}
        >
          <i className="fas fa-plus" />
          <span>Add</span>
        </button>
      </section>
    );
  }
}

Frames.propTypes = {
  framesArray: PropTypes.instanceOf(Array).isRequired,
  framesData: PropTypes.instanceOf(Object).isRequired,
  layerKeys: PropTypes.instanceOf(Array).isRequired,
  activeLayer: PropTypes.number.isRequired,
  framesShortcuts: PropTypes.instanceOf(Object).isRequired,
  frameKeys: PropTypes.instanceOf(Array).isRequired,
  activeFrame: PropTypes.number.isRequired,
  updateActiveFrameIndex: PropTypes.func.isRequired,
  updateFrameKeys: PropTypes.func.isRequired,
  canvas: PropTypes.instanceOf(Object),
  duplicateIndex: PropTypes.number,
  updateFramesData: PropTypes.func.isRequired,
  updateDuplicateFrameIndex: PropTypes.func.isRequired,
};

Frames.defaultProps = {
  canvas: null,
  duplicateIndex: null,
};

const mapStateToProps = state => ({
  framesShortcuts: state.frames.framesShortcuts,
  framesData: state.frames.framesData,
  frameKeys: state.frames.frameKeys,
  framesArray: state.frames.framesArray,
  activeFrame: state.frames.activeFrame,
  duplicateIndex: state.frames.duplicateIndex,
  layerKeys: state.layers.layerKeys,
  activeLayer: state.layers.activeLayer,
  canvas: state.canvas.canvasRef,
});

const mapDispatchToProps = (dispatch) => {
  const {
    updateActiveFrameIndex,
    updateFrameKeys,
    updateFramesData,
    updateDuplicateFrameIndex,
  } = bindActionCreators(actions, dispatch);
  return {
    updateActiveFrameIndex: (index) => {
      updateActiveFrameIndex(index);
    },
    updateFrameKeys: (keys) => {
      updateFrameKeys(keys);
    },
    updateFramesData: (data) => {
      updateFramesData(data);
    },
    updateDuplicateFrameIndex: (index) => {
      updateDuplicateFrameIndex(index);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Frames);
