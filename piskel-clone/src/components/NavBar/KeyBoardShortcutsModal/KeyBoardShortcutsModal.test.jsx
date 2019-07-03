import React from 'react';
import renderer from 'react-test-renderer';
import KeyBoardShortcutsModal from './KeyBoardShortcutsModal';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <KeyBoardShortcutsModal
        activeBlock="tools"
        framesShortcuts={{}}
        layersShortcuts={{}}
        toolsData={{}}
        toggleModal={() => {}}
        updateActiveBlock={() => {}}
        updateActiveFrameShortcut={() => {}}
        updateActiveLayerShortcut={() => {}}
        updateActiveTool={() => {}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
