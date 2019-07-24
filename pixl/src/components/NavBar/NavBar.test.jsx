import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import NavBar from './NavBar';
import store from '../../stores/mainStore';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <NavBar />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
