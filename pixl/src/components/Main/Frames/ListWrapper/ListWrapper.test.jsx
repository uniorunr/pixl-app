import React from 'react';
import renderer from 'react-test-renderer';
import List from './ListWrapper';

const children = [];

it('renders correctly', () => {
  const tree = renderer
    .create(
      <List innerRef={() => {}} provided={{}}>
        {children}
      </List>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
