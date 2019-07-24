import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Preview from './Preview';
import store from '../../../stores/mainStore';

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
    .create(
      <Provider store={store}>
        <Preview />
      </Provider>,
      options,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
