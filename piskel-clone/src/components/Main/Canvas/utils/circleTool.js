const drawCircle = (pageX, pageY, state, props, canvas, overlay, updateInitCoordinates) => {
  const { initX, initY } = state;
  const { pixelsPerCanvas, width, primaryColor } = props;
  const pixelSize = width / pixelsPerCanvas;
  const context = overlay.getContext('2d');
  context.fillStyle = primaryColor;
  const rectangles = new Path2D();
  const x = Math.floor((pageX - canvas.offsetLeft) / pixelSize);
  const y = Math.floor((pageY - canvas.offsetTop) / pixelSize);
  const circleRadius = Math.floor(Math.sqrt(((initX - x) ** 2) + ((initY - y) ** 2)));

  if (!initX && !initY) {
    updateInitCoordinates(x, y);
  } else {
    context.clearRect(0, 0, overlay.width, overlay.height);
    const drawPixel = (currX, currY) => {
      rectangles.rect(currX * pixelSize, currY * pixelSize, pixelSize, pixelSize);
    };

    const drawCircleFunc = (x0, y0, radius) => {
      let currX = radius;
      let currY = 0;
      let radiusError = 1 - currX;

      while (currX >= currY) {
        drawPixel(currX + x0, currY + y0);
        drawPixel(currY + x0, currX + y0);
        drawPixel(-currX + x0, currY + y0);
        drawPixel(-currY + x0, currX + y0);
        drawPixel(-currX + x0, -currY + y0);
        drawPixel(-currY + x0, -currX + y0);
        drawPixel(currX + x0, -currY + y0);
        drawPixel(currY + x0, -currX + y0);
        currY += 1;

        if (radiusError < 0) {
          radiusError += 2 * currY + 1;
        } else {
          currX -= 1;
          radiusError += 2 * (currY - currX + 1);
        }
      }
      context.fill(rectangles);
    };
    drawCircleFunc(initX, initY, circleRadius);
  }
};

export default drawCircle;