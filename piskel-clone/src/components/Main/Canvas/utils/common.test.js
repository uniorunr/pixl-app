import { JSDOM } from 'jsdom';
import { fullColorHex, connectTwoPoints } from './common';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

describe('fullColorHex', () => {
  it('should be instance of Function', () => {
    expect(fullColorHex).toBeInstanceOf(Function);
  });

  it('should return hex color', () => {
    expect(fullColorHex(255, 255, 255)).toEqual('ffffff');
  });
});


describe('connectTwoPoints', () => {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'canvas');
  document.body.appendChild(canvas);
  const context = canvas.getContext('2d');

  it('should be instance of Function', () => {
    expect(connectTwoPoints).toBeInstanceOf(Function);
  });

  it('should be call', () => {
    expect(connectTwoPoints(0, 0, 1, 1, 32, context, 'paint')).toEqual(undefined);
  });
});
