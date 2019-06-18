import React from 'react';
import renderer from 'react-test-renderer';
import ColorSelect from './ColorSelect';

function createNodeMock(element) {
  if (element.type === 'input') {
    return {};
  }
  return null;
}

it('renders correctly', () => {
  const options = { createNodeMock };

  const tree = renderer
    .create(
      <ColorSelect
        updateColor={() => {}}
        primaryColor="#000000"
        secondaryColor="#ffffff"
      />,
      options,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
