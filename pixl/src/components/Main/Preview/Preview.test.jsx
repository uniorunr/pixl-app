import React from 'react';
import renderer from 'react-test-renderer';
import Preview from './Preview';

const mockHandlePixelsPerCanvas = () => {};

function createNodeMock(element) {
  if (element.type === 'input') {
    return {
      current: {
        value: 23,
      },
    };
  }
  return null;
}

it('renders correctly', () => {
  const options = { createNodeMock };
  const tree = renderer
    .create(
      <Preview
        framesArray={[]}
        handlePixelsPerCanvas={mockHandlePixelsPerCanvas}
      />,
      options,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
