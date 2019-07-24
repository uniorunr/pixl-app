import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { JSDOM } from 'jsdom';
import Canvas from './Canvas';
import store from '../../../stores/mainStore';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

it('renders correctly', () => {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'canvas');
  document.body.appendChild(canvas);

  const tree = renderer
    .create(
      <Provider store={store}>
        <Canvas />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
