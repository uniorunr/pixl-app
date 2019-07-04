import React from 'react';
import renderer from 'react-test-renderer';
import ToolButton from './ToolButton';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ToolButton
        buttonClass=""
        iconClass=""
        id=""
        shortcut=""
        updateCurrentTool={() => {}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
