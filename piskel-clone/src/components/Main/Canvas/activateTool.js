import moveAndPaint from './utils/paintTool';
import moveAndErase from './utils/eraserTool';
import pickTheColor from './utils/pickerTool';
import paintBucket from './utils/paintBucketTool';
import sameColor from './utils/sameColorTool';
import drawStroke from './utils/strokeTool';
import drawRectangle from './utils/rectangleTool';
import drawCircle from './utils/circleTool';

const activateTool = (
  id,
  state,
  props,
  x,
  y,
  canvas,
  overlay,
  updXY,
  updInit,
) => {
  let result = null;
  switch (id) {
    case 'pen':
      result = moveAndPaint(x, y, state, props, canvas, updXY);
      break;
    case 'eraser':
      result = moveAndErase(x, y, state, props, canvas, updXY);
      break;
    case 'choose-color':
      result = pickTheColor(x, y, state, props, canvas);
      break;
    case 'paint-bucket':
      result = paintBucket(x, y, props, canvas);
      break;
    case 'paint-same-pixels':
      result = sameColor(x, y, props, canvas);
      break;
    case 'stroke':
      result = drawStroke(x, y, state, props, canvas, overlay, updInit);
      break;
    case 'rectangle':
      result = drawRectangle(x, y, state, props, canvas, overlay, updInit);
      break;
    case 'circle':
      result = drawCircle(x, y, state, props, canvas, overlay, updInit);
      break;
    default:
      throw new Error("tool isn't found");
  }
  return result;
};

export default activateTool;
