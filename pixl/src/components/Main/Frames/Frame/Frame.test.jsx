import React from 'react';
import renderer from 'react-test-renderer';
import Frame from './Frame';
import store from '../../../../stores/mainStore';

const mockFunc = () => {};

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Frame
        store={store}
        index={0}
        key={0}
        removeFrame={mockFunc}
        active
        duplicate
        frameKeys={[]}
        provided={{}}
        innerRef={() => {}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
