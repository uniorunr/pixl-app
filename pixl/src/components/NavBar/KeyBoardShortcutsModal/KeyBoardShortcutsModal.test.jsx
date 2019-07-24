import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import KeyBoardShortcutsModal from './KeyBoardShortcutsModal';
import store from '../../../stores/mainStore';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <KeyBoardShortcutsModal />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
