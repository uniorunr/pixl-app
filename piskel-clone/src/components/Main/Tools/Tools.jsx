import React, { Component } from 'react';
import './Tools.scss';

class Tools extends Component {
  makeActive = ({ target }) => {
    const tools = [...document.querySelectorAll('.tools button')];
    tools.forEach((tool) => {
      tool.classList.remove('tools_state_active');
    });
    if (
      target.dataset.listener
      && !target.classList.contains('tools_state_active')
    ) {
      target.classList.add('tools_state_active');
    } else {
      target.parentElement.classList.add('tools_state_active');
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
          <button
            className="tools__pen tools_state_active"
            id="pen"
            data-listener="true"
            type="button"
            onClick={this.makeActive}
            onKeyDown={this.handleKeyboard}
          >
            <i className="fas fa-pen" />
          </button>
          <button
            className="tools__paint-bucket"
            id="paint-bucket"
            data-listener="true"
            type="button"
            onClick={this.makeActive}
            onKeyDown={this.handleKeyboard}
          >
            <i className="fas fa-fill-drip" />
          </button>
          <button
            className="tools__choose-color"
            id="choose-color"
            data-listener="true"
            type="button"
            onClick={this.makeActive}
            onKeyDown={this.handleKeyboard}
          >
            <i className="fas fa-eye-dropper" />
          </button>
          <button
            className="tools__eraser"
            id="eraser"
            data-listener="true"
            type="button"
            onClick={this.makeActive}
            onKeyDown={this.handleKeyboard}
          >
            <i className="fas fa-eraser" />
          </button>
        </div>
      </section>
    );
  }
}

export default Tools;
