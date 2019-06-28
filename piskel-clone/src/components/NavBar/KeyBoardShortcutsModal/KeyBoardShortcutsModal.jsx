import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './KeyBoardShortcutsModal.scss';

class ShortcutsModal extends Component {
  render() {
    const { toggleModal } = this.props;

    return (
      <div className="shortcuts-modal">
        <div className="shortcuts-modal__content">
          <p />
        </div>
        <button
          type="button"
          className="shortcuts-modal__close"
          onClick={toggleModal}
        >
          <span>x</span>
        </button>
      </div>
    );
  }
}

ShortcutsModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default ShortcutsModal;
