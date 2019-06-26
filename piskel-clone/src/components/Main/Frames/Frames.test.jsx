import React from 'react';
import renderer from 'react-test-renderer';
import Frames from './Frames';

function createNodeMock(element) {
  if (typeof element.type === 'string' && element.type === 'div') {
    const elm = document.createElement(element.type);
    elm.setAttribute('data-react-beautiful-dnd-drag-handle', '0');
    return elm;
  }
  if (element.type === 'input') {
    return {
      current: {
        value: 23,
      },
    };
  }
  return null;
}

it('renders correctly', () => {
  const options = { createNodeMock };
  const tree = renderer.create(<Frames />, options).toJSON();
  expect(tree).toMatchSnapshot();
});
