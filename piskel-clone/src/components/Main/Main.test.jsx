import React from 'react';
import renderer from 'react-test-renderer';
import { JSDOM } from 'jsdom';
import Main from './Main';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

it('renders correctly', () => {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'canvas');
  document.body.appendChild(canvas);

  const tree = renderer.create(<Main />).toJSON();
  expect(tree).toMatchSnapshot();
});
