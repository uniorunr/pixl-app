import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ToolShortcutItem.scss';

class ShortcutItem extends Component {
  activate = () => {
    const { index, makeActive } = this.props;
    makeActive(index, 'tools');
  };

  render() {
    const {
      toolsData, active, tools, index, id,
    } = this.props;

    return (
      <div
        role="presentation"
        className="shortcuts-modal__row"
        onClick={this.activate}
      >
        <div
          className={`shortcuts-modal__tool ${
            active ? 'shortcuts-modal__tool_active' : ''
          }`}
          data-tool={id}
          ref={(ref) => {
            if (ref) {
              tools[index] = ref;
            }
          }}
        >
          <i className={toolsData[id] ? toolsData[id].iconClass : ''} />
          <span>{toolsData[id] ? toolsData[id].name : ''}</span>
          <span>-</span>
          <span className="shortcuts-modal__shortcut">
            {toolsData[id] ? toolsData[id].shortcut : ''}
          </span>
        </div>
      </div>
    );
  }
}

ShortcutItem.propTypes = {
  toolsData: PropTypes.instanceOf(Object).isRequired,
  active: PropTypes.bool.isRequired,
  tools: PropTypes.instanceOf(Array).isRequired,
  index: PropTypes.number.isRequired,
  makeActive: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  tools: state.shortcuts.toolsShortcutsRefs,
  toolsData: state.tools.toolsData,
});

export default connect(mapStateToProps)(ShortcutItem);
