import React from 'react';
import renderer from 'react-test-renderer';
import UserInfo from './UserInfo';

it('renders correctly', () => {
  const tree = renderer.create(<UserInfo src="src" />).toJSON();
  expect(tree).toMatchSnapshot();
});
