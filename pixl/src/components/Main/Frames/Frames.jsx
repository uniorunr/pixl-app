import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Frame from './Frame/Frame';
import List from './ListWrapper/ListWrapper';
import * as actions from '../../../actions/actions';
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

  componentDidUpdate() {
    const {
      framesData,
      framesArray,
      layerKeys,
      activeLayer,
      frameKeys,
      activeFrame,
    } = this.props;
    const layerKey = `layer${layerKeys[activeLayer]}`;
    if (layerKeys[activeLayer] >= 0) {
      framesData[layerKey] = framesArray.map(item => item.toDataURL());
      sessionStorage.setItem('framesData', JSON.stringify(framesData));
    }
    sessionStorage.setItem('activeFrame', `${activeFrame}`);
    sessionStorage.setItem('frameKeys', JSON.stringify([...frameKeys]));
  }

  addFrame = () => {
    const {
      frameKeys,
      canvas,
      updateActiveFrameIndex,
      updateFrameKeys,
    } = this.props;

    updateFrameKeys([...frameKeys, Math.max(...frameKeys) + 1]);
    updateActiveFrameIndex(frameKeys.length);

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
    } = this.props;
    const destIndex = destination ? destination.index : null;
    const srcIndex = source.index;
    const activeFrameKey = frameKeys[activeFrame];
    if (destination && destIndex !== srcIndex) {
      const srcItem = frameKeys[srcIndex];
      frameKeys.splice(srcIndex, 1);
      frameKeys.splice(destIndex, 0, srcItem);
      updateActiveFrameIndex(frameKeys.indexOf(activeFrameKey));
      updateFrameKeys([...frameKeys]);
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
  const { updateActiveFrameIndex, updateFrameKeys } = bindActionCreators(
    actions,
    dispatch,
  );
  return {
    updateActiveFrameIndex: (index) => {
      updateActiveFrameIndex(index);
    },
    updateFrameKeys: (keys) => {
      updateFrameKeys(keys);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Frames);
