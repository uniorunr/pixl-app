import React from 'react';
import renderer from 'react-test-renderer';
import Layers from './Layers';

it('renders correctly', () => {
  const tree = renderer
    .create(<Layers framesArray={[]} updateLayers={() => {}} framesData={{}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
