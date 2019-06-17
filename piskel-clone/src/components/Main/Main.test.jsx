import React from 'react';
import renderer from 'react-test-renderer';
import { JSDOM } from 'jsdom';
import Main from './Main';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

function createNodeMock(element) {
  if (element.type === 'input') {
    return {
      current: {
        value: 23,
      },
    };
  }
  return null;
}

it('renders correctly', () => {
  const options = { createNodeMock };
  const canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'canvas');
  document.body.appendChild(canvas);

  const tree = renderer.create(<Main />, options).toJSON();
  expect(tree).toMatchSnapshot();
});
