import React from 'react';
import renderer from 'react-test-renderer';
import FpsControl from './FpsControl';
import store from '../../../../stores/mainStore';

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
  const tree = renderer.create(<FpsControl store={store} />, options).toJSON();
  expect(tree).toMatchSnapshot();
});
