import React from 'react';
import renderer from 'react-test-renderer';
import LandingPage from './LandingPage';

it('renders correctly', () => {
  const tree = renderer
    .create(<LandingPage toggleSection={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
