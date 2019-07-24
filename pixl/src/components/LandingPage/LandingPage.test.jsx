import React from 'react';
import renderer from 'react-test-renderer';
import LandingPage from './LandingPage';
import store from '../../stores/mainStore';

it('renders correctly', () => {
  const tree = renderer.create(<LandingPage store={store} />).toJSON();
  expect(tree).toMatchSnapshot();
});
