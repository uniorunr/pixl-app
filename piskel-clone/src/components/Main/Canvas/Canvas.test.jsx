import React from 'react';
import renderer from 'react-test-renderer';
import { JSDOM } from 'jsdom';
import Canvas from './Canvas';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

it('renders correctly', () => {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'canvas');
  document.body.appendChild(canvas);
  const width = 25;
  const height = 25;

  const tree = renderer
    .create(
      <Canvas
        width={width}
        height={height}
        pixelsPerCanvas={32}
        currToolId="pen"
        updateColor={() => {}}
        primaryColor="#000000"
        framesArray={[]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
