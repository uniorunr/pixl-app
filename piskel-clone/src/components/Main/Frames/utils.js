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
    finalIndex = index;
  } else if (activeFrame === canvasItems.length - 1) {
    finalIndex = canvasItems.length - 2;
  } else {
    finalIndex = activeFrame;
  }
  return finalIndex;
};

export default setActiveFrame;
