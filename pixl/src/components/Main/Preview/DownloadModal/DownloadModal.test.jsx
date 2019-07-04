import React from 'react';
import renderer from 'react-test-renderer';
import DownloadModal from './DownloadModal';

it('renders correctly', () => {
  const tree = renderer
    .create(<DownloadModal closeDownloadModal={() => {}} download={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
