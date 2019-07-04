import React from 'react';
import renderer from 'react-test-renderer';
import FrameShortcutItem from './FrameShortcutItem';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <FrameShortcutItem
        active
        iconClass=""
        id=""
        index={0}
        keyCode=""
        name=""
        prefix=""
        makeActive={() => {}}
        toolName=""
        frames={[]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
