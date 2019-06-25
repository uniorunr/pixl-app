import { connectTwoPoints } from './common';

const draw = (x, y, lastX, lastY, connectTwoPointsFunc, state, props, canvas, button) => {
  const { cursorActive } = state;
  const {
    pixelsPerCanvas, width, primaryColor, secondaryColor,
  } = props;
  const pixelSize = width / pixelsPerCanvas;
  const context = canvas.getContext('2d');
  context.fillStyle = button === 2 ? secondaryColor : primaryColor;

  if ((Math.abs(x - lastX) > 1 || Math.abs(y - lastY) > 1) && !!cursorActive) {
    connectTwoPointsFunc(x, y, lastX, lastY, pixelSize, context);
  } else {
    const rectangle = new Path2D();
    rectangle.rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    context.fill(rectangle);
  }
};

const horizontalMirror = (pageX, pageY, state, props, canvas, updateCoordinates, button) => {
  const { currX, currY, mouseButton } = state;
  const { pixelsPerCanvas, width } = props;
  const currentButton = mouseButton || button;
  const pixelSize = width / pixelsPerCanvas;

  const x = Math.floor((pageX - canvas.offsetLeft) / pixelSize);
  const y = Math.floor((pageY - canvas.offsetTop) / pixelSize);
  draw(x, y, currX, currY, connectTwoPoints, state, props, canvas, currentButton);
  const mirrorY = pixelsPerCanvas - y;
  const currMirrorY = pixelsPerCanvas - currY;
  draw(x, mirrorY, currX, currMirrorY, connectTwoPoints, state, props, canvas, currentButton);
  updateCoordinates(x, y);
};

export default horizontalMirror;
