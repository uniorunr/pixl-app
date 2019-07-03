import activateTool from './activateTool';

describe('activateTool', () => {
  it('should be instance of Function', () => {
    expect(activateTool).toBeInstanceOf(Function);
  });

  it('should return error if case isn\'t founded', () => {
    expect(activateTool).toThrow(Error);
  });
});
