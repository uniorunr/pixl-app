import { connectTwoPoints } from './common';

const erase = (x, y, lastX, lastY, connectTwoPointsFunc, props, canvas) => {
  const { pixelsPerCanvas, width, cursorActive } = props;
  const pixelSize = width / pixelsPerCanvas;
  const context = canvas.getContext('2d');

  if ((Math.abs(x - lastX) > 1 || Math.abs(y - lastY) > 1) && !!cursorActive) {
    connectTwoPointsFunc(x, y, lastX, lastY, pixelSize, context, 'erase');
  } else {
    context.clearRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  }
};

const moveAndErase = (pageX, pageY, props, canvas, updateCoordinates) => {
  const {
    pixelsPerCanvas, width, currX, currY,
  } = props;
  const pixelSize = width / pixelsPerCanvas;

  const x = Math.floor((pageX - canvas.offsetLeft) / pixelSize);
  const y = Math.floor((pageY - canvas.offsetTop) / pixelSize);
  erase(x, y, currX, currY, connectTwoPoints, props, canvas);
  updateCoordinates(x, y);
};

export default moveAndErase;
