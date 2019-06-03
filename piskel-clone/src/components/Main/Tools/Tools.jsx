import React, { Component } from 'react';
import './Tools.scss';

class Tools extends Component {
  render() {
    return (
      <section className="tools-section">
        <h2 className="visually-hidden">Tools Section</h2>
        <div className="tools">
          <div className="tools__pen tools_state_active" id="pen">
            <i className="fas fa-pen" />
          </div>
          <div className="tools__paint-bucket" id="paint-bucket">
            <i className="fas fa-fill-drip" />
          </div>
          <div className="tools__choose-color" id="choose-color">
            <i className="fas fa-eye-dropper" />
          </div>
          <div className="tools__eraser" id="eraser">
            <i className="fas fa-eraser" />
          </div>
        </div>
      </section>
    );
  }
}

export default Tools;
