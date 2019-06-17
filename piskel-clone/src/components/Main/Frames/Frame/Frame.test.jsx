import React from 'react';
import renderer from 'react-test-renderer';
import Frame from './Frame';

const mockFunc = () => {};

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Frame
        index={0}
        key={0}
        removeFrame={mockFunc}
        makeActive={mockFunc}
        active
        duplicateFrame={() => {}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
