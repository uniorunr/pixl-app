import { setActiveFrame, translateActiveFrame } from './utils';

describe('setActiveFrame', () => {
  it('should be instance of Function', () => {
    expect(setActiveFrame).toBeInstanceOf(Function);
  });

  it('should return index', () => {
    expect(setActiveFrame(0, [0, 1, 2], 1)).toEqual(0);
  });
});

describe('translateActiveFrame', () => {
  it('should be instance of Function', () => {
    expect(translateActiveFrame).toBeInstanceOf(Function);
  });
});
