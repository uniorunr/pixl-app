const setActiveFrame = (activeFrame, canvasItems, index) => {
  let finalIndex = null;
  if (index === activeFrame) {
    finalIndex = 0;
  } else if (index === canvasItems.length - 1) {
    finalIndex = activeFrame;
  } else if (
    index === canvasItems.length - 2
    && activeFrame === canvasItems.length - 1
  ) {
    finalIndex = activeFrame;
  } else if (activeFrame === canvasItems.length - 1) {
    finalIndex = canvasItems.length - 1;
  } else {
    finalIndex = activeFrame;
  }
  return finalIndex;
};

const translateActiveFrame = (index) => {
  const frame = document.querySelector(`#frame${index}`);
  const mainCanvas = document.querySelector('#canvas');
  const mainCtx = mainCanvas.getContext('2d');
  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  mainCtx.imageSmoothingEnabled = false;
  mainCtx.drawImage(frame, 0, 0, mainCanvas.width, mainCanvas.height);
};

export { setActiveFrame, translateActiveFrame };
