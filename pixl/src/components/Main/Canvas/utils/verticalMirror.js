import { connectTwoPoints } from './common';

const draw = (x, y, lastX, lastY, connectTwoPointsFunc, props, canvas, button) => {
  const {
    pixelsPerCanvas, width, primaryColor, secondaryColor, cursorActive,
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

const verticalMirror = (pageX, pageY, props, canvas, updateCoordinates, button) => {
  const {
    pixelsPerCanvas, width, currX, currY, mouseButton,
  } = props;
  const currentButton = mouseButton || button;
  const pixelSize = width / pixelsPerCanvas;

  const x = Math.floor((pageX - canvas.offsetLeft) / pixelSize);
  const y = Math.floor((pageY - canvas.offsetTop) / pixelSize);
  draw(x, y, currX, currY, connectTwoPoints, props, canvas, currentButton);
  const mirrorX = pixelsPerCanvas - x;
  const currMirrorX = pixelsPerCanvas - currX;
  draw(mirrorX, y, currMirrorX, currY, connectTwoPoints, props, canvas, currentButton);
  updateCoordinates(x, y);
};

export default verticalMirror;
