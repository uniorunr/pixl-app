import React, { Component } from 'react';
import PropTypes from 'prop-types';

class List extends Component {
  render() {
    const { provided, innerRef, children } = this.props;
    return (
      <div {...provided.droppableProps} ref={innerRef}>
        {children}
      </div>
    );
  }
}

List.propTypes = {
  provided: PropTypes.instanceOf(Object).isRequired,
  innerRef: PropTypes.func.isRequired,
  children: PropTypes.instanceOf(Array).isRequired,
};

export default List;
