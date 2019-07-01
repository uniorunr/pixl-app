import React, { Component } from 'react';
import './Tools.scss';
import PropTypes from 'prop-types';
import ToolButton from './ToolButton/ToolButton';

class Tools extends Component {
  render() {
    const { toolsData, currToolId, updateCurrentTool } = this.props;
    return (
      <section className="tools-section">
        <h2 className="visually-hidden">Tools Section</h2>
        <div className="tools">
          {Object.keys(toolsData).map(id => (
            <ToolButton
              buttonClass={`${toolsData[id].toolsComponentClass} ${
                currToolId === id ? 'tools_state_active' : ''
              }`}
              id={id}
              iconClass={toolsData[id].iconClass}
              updateCurrentTool={updateCurrentTool}
              key={id}
            />
          ))}
        </div>
      </section>
    );
  }
}

Tools.propTypes = {
  toolsData: PropTypes.instanceOf(Object).isRequired,
  currToolId: PropTypes.string.isRequired,
  updateCurrentTool: PropTypes.func.isRequired,
};

export default Tools;
