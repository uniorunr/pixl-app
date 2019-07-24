import React from 'react';
import renderer from 'react-test-renderer';
import ColorSelect from './ColorSelect';
import store from '../../../stores/mainStore';

function createNodeMock(element) {
  if (element.type === 'input') {
    return {};
  }
  return null;
}

it('renders correctly', () => {
  const options = { createNodeMock };

  const tree = renderer.create(<ColorSelect store={store} />, options).toJSON();
  expect(tree).toMatchSnapshot();
});
