const saveLayerData = (keys, index, framesData, frames, updFunc) => {
  const layerKey = `layer${keys[index]}`;
  if (keys[index] !== undefined) {
    const tempFramesData = { ...framesData };
    tempFramesData[layerKey] = frames.map(item => item.toDataURL());
    updFunc(tempFramesData);
    sessionStorage.setItem('framesData', JSON.stringify(tempFramesData));
  }
};

const restoreFrames = (frames, keys, active, framesData, updFunc) => {
  const canvas = document.querySelector('#canvas');
  const canvasContext = canvas.getContext('2d');
  canvasContext.imageSmoothingEnabled = false;
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  frames.forEach((frame, index) => {
    const frameContext = frame.getContext('2d');
    frameContext.imageSmoothingEnabled = false;
    frameContext.clearRect(0, 0, frame.width, frame.height);
    const img = new Image();
    const layerId = `layer${keys[active]}`;
    if (!framesData[layerId]) return;
    const URI = framesData[layerId][index];
    if (URI) {
      img.src = URI;
      img.onload = () => {
        frameContext.drawImage(img, 0, 0);
        saveLayerData(keys, active, framesData, frames, updFunc);
        if (frame.classList.contains('frame__canvas_active')) {
          canvasContext.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };
    }
  });
};

export { saveLayerData, restoreFrames };
