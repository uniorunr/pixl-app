import React from 'react';
import renderer from 'react-test-renderer';
import CanvasSize from './CanvasSize';

const mockHandlePixelsPerCanvas = () => {};

it('renders correctly', () => {
  const tree = renderer
    .create(<CanvasSize handlePixelsPerCanvas={mockHandlePixelsPerCanvas} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
