const moveContext = (pageX, pageY, props, canvas, overlay, updateInitCoords) => {
  const {
    pixelsPerCanvas, width, initX, initY,
  } = props;
  const pixelSize = width / pixelsPerCanvas;
  const canvasCtx = canvas.getContext('2d');
  const overlayCtx = overlay.getContext('2d');

  const x = Math.floor((pageX - canvas.offsetLeft) / pixelSize);
  const y = Math.floor((pageY - canvas.offsetTop) / pixelSize);
  const dx = (x - initX) * pixelSize;
  const dy = (y - initY) * pixelSize;

  if (!initX && !initY) {
    updateInitCoords(x, y);
  } else {
    updateInitCoords(x, y);
    overlayCtx.drawImage(canvas, dx, dy, canvas.width, canvas.height);
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.drawImage(overlay, 0, 0, canvas.width, canvas.height);
    overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
  }
};

export default moveContext;
