import React from 'react';
import renderer from 'react-test-renderer';
import ToolShortcutItem from './ToolShortcutItem';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ToolShortcutItem
        active
        iconClass=""
        id=""
        index={0}
        keyCode=""
        makeActive={() => {}}
        toolName=""
        tools={[]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
