import React from 'react';
import renderer from 'react-test-renderer';
import Layers from './Layers';
import store from '../../../stores/mainStore';

it('renders correctly', () => {
  const tree = renderer.create(<Layers store={store} />).toJSON();
  expect(tree).toMatchSnapshot();
});
