import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Tools.scss';
import ToolButton from './ToolButton/ToolButton';

class Tools extends Component {
  render() {
    const { toolsData, currToolId } = this.props;
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
              key={id}
              shortcut={toolsData[id].shortcut}
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
};

const mapStateToProps = state => ({
  currToolId: state.tools.currToolId,
  toolsData: state.tools.toolsData,
});

export default connect(mapStateToProps)(Tools);
