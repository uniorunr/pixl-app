import React from 'react';
import renderer from 'react-test-renderer';
import FpsControl from './FpsControl';

function createNodeMock(element) {
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
  const tree = renderer
    .create(<FpsControl fps={12} updateFps={() => {}} />, options)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
