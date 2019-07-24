import React from 'react';
import renderer from 'react-test-renderer';
import DownloadModal from './DownloadModal';
import store from '../../../../stores/mainStore';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <DownloadModal
        store={store}
        closeDownloadModal={() => {}}
        download={() => {}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
