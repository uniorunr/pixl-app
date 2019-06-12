import React from 'react';
import renderer from 'react-test-renderer';
import Frames from './Frames';

it('renders correctly', () => {
  const tree = renderer.create(<Frames />).toJSON();
  expect(tree).toMatchSnapshot();
});
