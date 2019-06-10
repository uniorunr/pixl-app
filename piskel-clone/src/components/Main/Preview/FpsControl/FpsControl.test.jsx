import React from 'react';
import renderer from 'react-test-renderer';
import FpsControl from './FpsControl';

it('renders correctly', () => {
  const tree = renderer.create(<FpsControl />).toJSON();
  expect(tree).toMatchSnapshot();
});
