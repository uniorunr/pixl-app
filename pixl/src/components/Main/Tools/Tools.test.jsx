import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Tools from './Tools';
import store from '../../../stores/mainStore';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Tools />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
