const fullColorHex = (r, g, b) => {
  const rgbToHex = (rgb) => {
    const hex = Number(rgb).toString(16);
    return (hex.length < 2) ? `0${hex}` : hex;
  };
  return `${rgbToHex(r)}${rgbToHex(g)}${rgbToHex(b)}`;
};

const draw = (x, y, lastX, lastY, connectTwoPointsFunc, state, props, canvas, button, color) => {
  const { cursorActive } = state;
  const { pixelsPerCanvas, width } = props;
  const pixelSize = width / pixelsPerCanvas;
  const context = canvas.getContext('2d');
  context.fillStyle = color;

  if ((Math.abs(x - lastX) > 1 || Math.abs(y - lastY) > 1) && !!cursorActive) {
    connectTwoPointsFunc(x, y, lastX, lastY, pixelSize, context);
  } else {
    const rectangle = new Path2D();
    rectangle.rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    context.fill(rectangle);
  }
};

const connectTwoPoints = (x, y, lastX, lastY, pixelSize, context) => {
  let currX;
  let currY;
  const dx1 = Math.abs(x - lastX);
  const dy1 = Math.abs(y - lastY);
  let px = 2 * dy1 - dx1;
  let py = 2 * dx1 - dy1;
  let xe;
  let ye;
  const rectangles = new Path2D();

  if (dy1 <= dx1) {
    if (x - lastX >= 0) {
      currX = lastX;
      currY = lastY;
      xe = x;
    } else {
      currX = x;
      currY = y;
      xe = lastX;
    }

    rectangles.rect(
      currX * pixelSize,
      currY * pixelSize,
      pixelSize,
      pixelSize,
    );

    for (let i = 0; currX < xe; i += 1) {
      currX += 1;

      if (px < 0) {
        px += 2 * dy1;
      } else {
        if (
          (x - lastX < 0 && y - lastY < 0)
          || (x - lastX > 0 && y - lastY > 0)
        ) {
          currY += 1;
        } else {
          currY -= 1;
        }
        px += 2 * (dy1 - dx1);
      }

      rectangles.rect(
        currX * pixelSize,
        currY * pixelSize,
        pixelSize,
        pixelSize,
      );
    }
  } else {
    if (y - lastY >= 0) {
      currX = lastX;
      currY = lastY;
      ye = y;
    } else {
      currX = x;
      currY = y;
      ye = lastY;
    }

    rectangles.rect(
      currX * pixelSize,
      currY * pixelSize,
      pixelSize,
      pixelSize,
    );

    for (let i = 0; currY < ye; i += 1) {
      currY += 1;
      if (py <= 0) {
        py += 2 * dx1;
      } else {
        if (
          (x - lastX < 0 && y - lastY < 0)
          || (x - lastX > 0 && y - lastY > 0)
        ) {
          currX += 1;
        } else {
          currX -= 1;
        }
        py += 2 * (dx1 - dy1);
      }

      rectangles.rect(
        currX * pixelSize,
        currY * pixelSize,
        pixelSize,
        pixelSize,
      );
    }
  }
  context.fill(rectangles);
};

const lighten = (pageX, pageY, state, props, canvas, updateCoordinates, button) => {
  const { currX, currY, mouseButton } = state;
  const { pixelsPerCanvas, width } = props;
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
  draw(x, y, currX, currY, connectTwoPoints, state, props, canvas, currentButton, color);
  updateCoordinates(x, y);
};

export default lighten;
