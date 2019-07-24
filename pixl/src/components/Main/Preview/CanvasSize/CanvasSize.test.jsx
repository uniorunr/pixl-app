import React from 'react';
import renderer from 'react-test-renderer';
import CanvasSize from './CanvasSize';
import store from '../../../../stores/mainStore';

it('renders correctly', () => {
  const tree = renderer.create(<CanvasSize store={store} />).toJSON();
  expect(tree).toMatchSnapshot();
});
