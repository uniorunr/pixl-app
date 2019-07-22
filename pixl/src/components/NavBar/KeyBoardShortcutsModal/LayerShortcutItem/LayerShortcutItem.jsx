import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './LayerShortcutItem.scss';

class LayerShortcutItem extends Component {
  activate = () => {
    const { index, makeActive } = this.props;
    makeActive(index, 'layers');
  };

  render() {
    const {
      layersShortcuts, active, layers, index, id,
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
              layers[index] = ref;
            }
          }}
        >
          <i className={layersShortcuts[id].iconClass} />
          <span>{layersShortcuts[id].name}</span>
          <span>-</span>
          <span className="shortcuts-modal__shortcut">
            <span className="shortcuts-modal__prefix">
              {`${layersShortcuts[id].prefix} + `}
            </span>
            {layersShortcuts[id].shortcut}
          </span>
        </div>
      </div>
    );
  }
}

LayerShortcutItem.propTypes = {
  layersShortcuts: PropTypes.instanceOf(Object).isRequired,
  active: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  makeActive: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  layers: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  layersShortcuts: state.layers.layersShortcuts,
  layers: state.shortcuts.layersShortcutsRefs,
});

export default connect(mapStateToProps)(LayerShortcutItem);
