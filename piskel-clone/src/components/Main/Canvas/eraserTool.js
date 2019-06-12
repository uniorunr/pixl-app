const erase = (x, y, lastX, lastY, connectTwoPointsFunc, state, props) => {
  const { context, cursorActive } = state;
  const { pixelsPerCanvas, width } = props;
  const pixelSize = width / pixelsPerCanvas;

  if ((Math.abs(x - lastX) > 1 || Math.abs(y - lastY) > 1) && !!cursorActive) {
    connectTwoPointsFunc(x, y, lastX, lastY, pixelSize, context);
  } else {
    context.clearRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
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

    context.clearRect(currX * pixelSize,
      currY * pixelSize,
      pixelSize,
      pixelSize);

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

      context.clearRect(currX * pixelSize,
        currY * pixelSize,
        pixelSize,
        pixelSize);
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

    context.clearRect(currX * pixelSize,
      currY * pixelSize,
      pixelSize,
      pixelSize);

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

      context.clearRect(currX * pixelSize,
        currY * pixelSize,
        pixelSize,
        pixelSize);
    }
  }
};

const moveAndErase = (pageX, pageY, state, props, updateCoordinates) => {
  const { canvas, currX, lastY } = state;
  const { pixelsPerCanvas, width } = props;
  const pixelSize = width / pixelsPerCanvas;

  const x = Math.floor((pageX - canvas.offsetLeft) / pixelSize);
  const y = Math.floor((pageY - canvas.offsetTop) / pixelSize);
  erase(x, y, currX, lastY, connectTwoPoints, state, props);
  updateCoordinates(x, y);
};

export default moveAndErase;