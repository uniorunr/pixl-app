import React from 'react';
import renderer from 'react-test-renderer';
import LayerShortcutItem from './LayerShortcutItem';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <LayerShortcutItem
        active
        iconClass=""
        id=""
        index={0}
        keyCode=""
        name=""
        prefix=""
        makeActive={() => {}}
        toolName=""
        layers={[]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
