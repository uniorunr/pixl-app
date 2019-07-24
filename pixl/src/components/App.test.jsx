import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { JSDOM } from 'jsdom';
import App from './App';
import store from '../stores/mainStore';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

function createNodeMock(element) {
  if (typeof element.type === 'string' && element.type === 'div') {
    const elm = document.createElement(element.type);
    elm.setAttribute('data-react-beautiful-dnd-drag-handle', '0');
    return elm;
  }
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
  const tree = renderer
    .create(
      <Provider store={store}>
        <App />
      </Provider>,
      options,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
