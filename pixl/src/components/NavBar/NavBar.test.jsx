import React from 'react';
import renderer from 'react-test-renderer';
import NavBar from './NavBar';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <NavBar
        framesShortcuts={{}}
        layersShortcuts={{}}
        toggleSection={() => {}}
        toolsData={{}}
        updateCurrentTool={() => {}}
        updateFrameShortcuts={() => {}}
        updateLayersShortcuts={() => {}}
        updateToolsData={() => {}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
