const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: 255,
  } : null;
};

const paintBucket = (pageX, pageY, props, canvas, button) => {
  const { primaryColor, secondaryColor, mouseButton } = props;
  const currentButton = mouseButton || button;
  const color = currentButton === 2 ? secondaryColor : primaryColor;
  const ctx = canvas.getContext('2d');
  const startX = pageX - canvas.offsetLeft;
  const startY = pageY - canvas.offsetTop;
  const { data } = ctx.getImageData(startX, startY, 1, 1);
  const [initR, initG, initB, initA] = data;
  const rgb = hexToRgb(color);
  if (initR === rgb.r && initG === rgb.g && initB === rgb.b && initA === rgb.a) return;
  if (!rgb) return;
  const colorLayer = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let newPos; let pixelPos; let reachLeft; let reachRight;

  const matchStartColor = (pos) => {
    const r = colorLayer.data[pos];
    const g = colorLayer.data[pos + 1];
    const b = colorLayer.data[pos + 2];
    const a = colorLayer.data[pos + 3];

    return (r === initR && g === initG && b === initB && a === initA);
  };

  const colorPixel = (pos, colorObg) => {
    colorLayer.data[pos] = colorObg.r;
    colorLayer.data[pos + 1] = colorObg.g;
    colorLayer.data[pos + 2] = colorObg.b;
    colorLayer.data[pos + 3] = 255;
  };

  const pixelStack = [[startX, startY]];

  while (pixelStack.length) {
    newPos = pixelStack.pop();
    const x = newPos[0];
    let y = newPos[1];

    pixelPos = (y * canvas.width + x) * 4;
    while (y >= 0 && matchStartColor(pixelPos)) {
      pixelPos -= canvas.width * 4;
      y -= 1;
    }
    pixelPos += canvas.width * 4;
    y += 1;
    reachLeft = false;
    reachRight = false;
    while (y < canvas.height - 1 && matchStartColor(pixelPos)) {
      colorPixel(pixelPos, rgb);

      if (x > 0) {
        if (matchStartColor(pixelPos - 4)) {
          if (!reachLeft) {
            pixelStack.push([x - 1, y]);
            reachLeft = true;
          }
        } else if (reachLeft) {
          reachLeft = false;
        }
      }

      if (x < canvas.width - 1) {
        if (matchStartColor(pixelPos + 4)) {
          if (!reachRight) {
            pixelStack.push([x + 1, y]);
            reachRight = true;
          }
        } else if (reachRight) {
          reachRight = false;
        }
      }

      pixelPos += canvas.width * 4;
      y += 1;
    }
  }
  ctx.putImageData(colorLayer, 0, 0);
};

export default paintBucket;
