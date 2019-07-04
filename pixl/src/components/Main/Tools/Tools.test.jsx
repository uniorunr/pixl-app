import React from 'react';
import renderer from 'react-test-renderer';
import Tools from './Tools';

const mockUpdateCurrentTool = () => {};

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Tools
        toolsData={{}}
        currToolId=""
        updateCurrentTool={mockUpdateCurrentTool}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
