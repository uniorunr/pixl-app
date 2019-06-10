import React from 'react';
import renderer from 'react-test-renderer';
import Preview from './Preview';

const mockHandlePixelsPerCanvas = () => {};

it('renders correctly', () => {
  const tree = renderer
    .create(<Preview handlePixelsPerCanvas={mockHandlePixelsPerCanvas} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
