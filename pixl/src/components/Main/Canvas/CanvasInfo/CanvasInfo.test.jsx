import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import CanvasInfo from './CanvasInfo';
import store from '../../../../stores/mainStore';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <CanvasInfo />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
