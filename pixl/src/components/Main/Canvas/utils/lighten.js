import { fullColorHex } from './common';

const draw = (x, y, lastX, lastY, props, canvas, button, color) => {
  const { pixelsPerCanvas, width, cursorActive } = props;
  const pixelSize = width / pixelsPerCanvas;
  const context = canvas.getContext('2d');
  context.fillStyle = color;

  if (cursorActive) {
    const rectangle = new Path2D();
    rectangle.rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    context.fill(rectangle);
  }
};

const lighten = (pageX, pageY, props, canvas, updateCoordinates, button) => {
  const {
    pixelsPerCanvas, width, currX, currY, mouseButton,
  } = props;
  const currentButton = mouseButton || button;
  const pixelSize = width / pixelsPerCanvas;
  const context = canvas.getContext('2d');
  const pixelX = pageX - canvas.offsetLeft;
  const pixelY = pageY - canvas.offsetTop;
  const { data } = context.getImageData(pixelX, pixelY, 1, 1);
  const [r, g, b, a] = data;
  const increment = 10;
  let color;
  if (r === 0 && g === 0 && b === 0 && a === 0) {
    color = 'transparent';
  } else if (currentButton === 2) {
    const newR = r - increment / 2 > 0 ? r - increment / 2 : 0;
    const newG = g - increment / 2 > 0 ? g - increment / 2 : 0;
    const newB = b - increment / 2 > 0 ? b - increment / 2 : 0;
    color = `#${fullColorHex(newR, newG, newB)}`;
  } else {
    const newR = r + increment < 255 ? r + increment : 255;
    const newG = g + increment < 255 ? g + increment : 255;
    const newB = b + increment < 255 ? b + increment : 255;
    color = `#${fullColorHex(newR, newG, newB)}`;
  }

  const x = Math.floor((pageX - canvas.offsetLeft) / pixelSize);
  const y = Math.floor((pageY - canvas.offsetTop) / pixelSize);
  draw(x, y, currX, currY, props, canvas, currentButton, color);
  updateCoordinates(x, y);
};

export default lighten;
