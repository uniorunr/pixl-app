import React, { Component } from 'react';
import './Tools.scss';
import PropTypes from 'prop-types';
import ToolButton from './ToolButton/ToolButton';

class Tools extends Component {
  makeActive = ({ target }) => {
    const { updateCurrentTool } = this.props;

    const tools = [...document.querySelectorAll('.tools button')];
    tools.forEach((tool) => {
      tool.classList.remove('tools_state_active');
    });
    if (
      target.dataset.listener
      && !target.classList.contains('tools_state_active')
    ) {
      target.classList.add('tools_state_active');
      updateCurrentTool(target.id);
    } else {
      target.parentElement.classList.add('tools_state_active');
      updateCurrentTool(target.parentElement.id);
    }
  };

  handleKeyboard = ({ key }) => {
    if (key === '1') {
      this.makeActive({ target: document.querySelector('.tools__pen') });
    } else if (key === '2') {
      this.makeActive({
        target: document.querySelector('.tools__paint-bucket'),
      });
    } else if (key === '3') {
      this.makeActive({
        target: document.querySelector('.tools__choose-color'),
      });
    } else if (key === '4') {
      this.makeActive({ target: document.querySelector('.tools__eraser') });
    }
  };

  render() {
    return (
      <section className="tools-section">
        <h2 className="visually-hidden">Tools Section</h2>
        <div className="tools">
          <ToolButton
            buttonClass="tools__button tools_state_active"
            id="pen"
            iconClass="fas fa-pen"
            onClickHandler={this.makeActive}
            onKeyDownHandler={this.handleKeyboard}
          />
          <ToolButton
            buttonClass="tools__button"
            id="paint-bucket"
            iconClass="fas fa-fill-drip"
            onClickHandler={this.makeActive}
            onKeyDownHandler={this.handleKeyboard}
          />
          <ToolButton
            buttonClass="tools__choose-color"
            id="choose-color"
            iconClass="fas fa-eye-dropper"
            onClickHandler={this.makeActive}
            onKeyDownHandler={this.handleKeyboard}
          />
          <ToolButton
            buttonClass="tools__button"
            id="eraser"
            iconClass="fas fa-eraser"
            onClickHandler={this.makeActive}
            onKeyDownHandler={this.handleKeyboard}
          />
        </div>
      </section>
    );
  }
}

Tools.propTypes = {
  updateCurrentTool: PropTypes.func.isRequired,
};

export default Tools;
