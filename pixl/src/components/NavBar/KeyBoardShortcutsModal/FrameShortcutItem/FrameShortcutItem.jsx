import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './FrameShortcutItem.scss';

class FrameShortcutItem extends Component {
  activate = () => {
    const { index, makeActive } = this.props;
    makeActive(index, 'frames');
  };

  render() {
    const {
      framesShortcuts, active, frames, index, id,
    } = this.props;

    return (
      <div
        role="presentation"
        className="shortcuts-modal__row"
        data-action={id}
        onClick={this.activate}
      >
        <div
          className={`shortcuts-modal__tool ${
            active ? 'shortcuts-modal__tool_active' : ''
          }`}
          data-action={id}
          ref={(ref) => {
            if (ref) {
              frames[index] = ref;
            }
          }}
        >
          <i
            className={framesShortcuts[id] ? framesShortcuts[id].iconClass : ''}
          />
          <span>{framesShortcuts[id] ? framesShortcuts[id].name : ''}</span>
          <span>-</span>
          <span className="shortcuts-modal__shortcut">
            <span className="shortcuts-modal__prefix">
              {`${framesShortcuts[id] ? framesShortcuts[id].prefix : ''} + `}
            </span>
            {framesShortcuts[id] ? framesShortcuts[id].shortcut : ''}
          </span>
        </div>
      </div>
    );
  }
}

FrameShortcutItem.propTypes = {
  framesShortcuts: PropTypes.instanceOf(Object).isRequired,
  active: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  makeActive: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  frames: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  framesShortcuts: state.frames.framesShortcuts,
  frames: state.shortcuts.framesShortcutsRefs,
});

export default connect(mapStateToProps)(FrameShortcutItem);
