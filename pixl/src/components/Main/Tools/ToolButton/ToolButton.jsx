import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/actions';
import './ToolButton.scss';

class ToolButton extends Component {
  makeActive = () => {
    const { updateCurrToolId, id } = this.props;
    updateCurrToolId(id);
  };

  render() {
    const {
      buttonClass, id, iconClass, shortcut,
    } = this.props;
    return (
      <div className="tools__container">
        <button
          className={buttonClass}
          id={id}
          data-listener="true"
          type="button"
          onClick={this.makeActive}
        >
          <i className={iconClass} />
        </button>
        <div className="tool__tooltip">{`${id} (${shortcut})`}</div>
      </div>
    );
  }
}

ToolButton.propTypes = {
  buttonClass: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  updateCurrToolId: PropTypes.func.isRequired,
  shortcut: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  currToolId: state.currToolId,
});

const mapDispatchToProps = (dispatch) => {
  const { updateCurrToolId } = bindActionCreators(actions, dispatch);
  return {
    updateCurrToolId: (id) => {
      updateCurrToolId(id);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToolButton);
