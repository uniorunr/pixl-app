import React from 'react';
import renderer from 'react-test-renderer';
import ToolButton from './ToolButton';
import store from '../../../../stores/mainStore';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ToolButton
        buttonClass=""
        iconClass=""
        id=""
        shortcut=""
        updateCurrentTool={() => {}}
        store={store}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
