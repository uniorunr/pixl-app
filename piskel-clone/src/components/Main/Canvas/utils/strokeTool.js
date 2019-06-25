import { connectTwoPoints } from './common';

const drawStroke = (pageX, pageY, state, props, canvas, overlay, updateInitCoords, button) => {
  const { initX, initY, mouseButton } = state;
  const {
    pixelsPerCanvas, width, primaryColor, secondaryColor,
  } = props;
  const currentButton = mouseButton || button;
  const pixelSize = width / pixelsPerCanvas;
  const context = overlay.getContext('2d');
  context.fillStyle = currentButton === 2 ? secondaryColor : primaryColor;

  const x = Math.floor((pageX - canvas.offsetLeft) / pixelSize);
  const y = Math.floor((pageY - canvas.offsetTop) / pixelSize);
  if (!initX && !initY) {
    updateInitCoords(x, y);
  } else {
    context.clearRect(0, 0, overlay.width, overlay.height);
    connectTwoPoints(x, y, initX, initY, pixelSize, context);
  }
};

export default drawStroke;
