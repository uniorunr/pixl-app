const sameColor = (pageX, pageY, props, canvas) => {
  const { primaryColor } = props;
  const context = canvas.getContext('2d');
  const pixelSize = canvas.width / 128;
  const startX = pageX - canvas.offsetLeft;
  const startY = pageY - canvas.offsetTop;
  const { data } = context.getImageData(startX, startY, 1, 1);
  const [initR, initG, initB, initA] = data;
  const rectangles = new Path2D();
  context.fillStyle = primaryColor;

  for (let i = 0; i * pixelSize < canvas.width; i += 1) {
    for (let j = 0; j * pixelSize < canvas.height; j += 1) {
      const curr = context.getImageData(i * pixelSize, j * pixelSize, 1, 1);
      const [currR, currG, currB, currA] = curr.data;
      if (currR === initR && currG === initG && currB === initB && currA === initA) {
        rectangles.rect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
      }
    }
  }
  context.fill(rectangles);
};

export default sameColor;
