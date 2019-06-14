const draw = (x, y, lastX, lastY, connectTwoPointsFunc, state, props, canvas) => {
  const { cursorActive } = state;
  const { pixelsPerCanvas, width } = props;
  const pixelSize = width / pixelsPerCanvas;
  const context = canvas.getContext('2d');
  context.strokeStyle = 'black';

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

const moveAndPaint = (pageX, pageY, state, props, updateCoordinates, canvas) => {
  const { currX, lastY } = state;
  const { pixelsPerCanvas, width } = props;
  const pixelSize = width / pixelsPerCanvas;

  const x = Math.floor((pageX - canvas.offsetLeft) / pixelSize);
  const y = Math.floor((pageY - canvas.offsetTop) / pixelSize);
  draw(x, y, currX, lastY, connectTwoPoints, state, props, canvas);
  updateCoordinates(x, y);
};

export default moveAndPaint;
