const fullColorHex = (r, g, b) => {
  const rgbToHex = (rgb) => {
    const hex = Number(rgb).toString(16);
    return (hex.length < 2) ? `0${hex}` : hex;
  };
  return `${rgbToHex(r)}${rgbToHex(g)}${rgbToHex(b)}`;
};

const connectTwoPoints = (x, y, lastX, lastY, pixelSize, context, tool) => {
  let currX;
  let currY;
  const dx1 = Math.abs(x - lastX);
  const dy1 = Math.abs(y - lastY);
  let px = 2 * dy1 - dx1;
  let py = 2 * dx1 - dy1;
  let xe;
  let ye;
  const rectangles = new Path2D();
  let func = null;
  if (tool === 'erase') {
    func = () => {
      context.clearRect(currX * pixelSize,
        currY * pixelSize,
        pixelSize,
        pixelSize);
    };
  } else {
    func = () => {
      rectangles.rect(
        currX * pixelSize,
        currY * pixelSize,
        pixelSize,
        pixelSize,
      );
    };
  }

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

    func();

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

      func();
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

    func();

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

      func();
    }
  }
  context.fill(rectangles);
};

export { fullColorHex, connectTwoPoints };
