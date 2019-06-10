import React from 'react';
import renderer from 'react-test-renderer';
import { JSDOM } from 'jsdom';
import App from './App';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'canvas');
document.body.appendChild(canvas);

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
