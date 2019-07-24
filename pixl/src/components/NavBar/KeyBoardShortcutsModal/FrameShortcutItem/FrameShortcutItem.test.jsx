import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import FrameShortcutItem from './FrameShortcutItem';
import store from '../../../../stores/mainStore';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <FrameShortcutItem
          active
          id=""
          key=""
          index={0}
          makeActive={() => {}}
        />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
