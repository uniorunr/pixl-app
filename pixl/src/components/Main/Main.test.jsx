import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { JSDOM } from 'jsdom';
import Main from './Main';
import store from '../../stores/mainStore';

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

it('renders correctly', () => {
  const options = { createNodeMock };
  const canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'canvas');
  document.body.appendChild(canvas);

  const tree = renderer
    .create(
      <Provider store={store}>
        <Main />
      </Provider>,
      options,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
