import React from 'react';
import renderer from 'react-test-renderer';
import { JSDOM } from 'jsdom';
import App from './App';

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

const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'canvas');
document.body.appendChild(canvas);

it('renders correctly', () => {
  const options = { createNodeMock };
  const tree = renderer.create(<App />, options).toJSON();
  expect(tree).toMatchSnapshot();
});
