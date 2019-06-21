import moveAndPaint from './utils/paintTool';
import moveAndErase from './utils/eraserTool';
import pickTheColor from './utils/pickerTool';
import paintBucket from './utils/paintBucketTool';
import sameColor from './utils/sameColorTool';
import drawStroke from './utils/strokeTool';
import drawRectangle from './utils/rectangleTool';
import drawCircle from './utils/circleTool';
import moveContext from './utils/moveTool';
import verticalMirror from './utils/verticalMirror';

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
  button,
) => {
  let result = null;
  switch (id) {
    case 'pen':
      result = moveAndPaint(x, y, state, props, canvas, updXY, button);
      break;
    case 'eraser':
      result = moveAndErase(x, y, state, props, canvas, updXY);
      break;
    case 'choose-color':
      result = pickTheColor(x, y, state, props, canvas);
      break;
    case 'paint-bucket':
      result = paintBucket(x, y, props, state, canvas, button);
      break;
    case 'paint-same-pixels':
      result = sameColor(x, y, props, state, canvas, button);
      break;
    case 'stroke':
      result = drawStroke(x, y, state, props, canvas, overlay, updInit, button);
      break;
    case 'rectangle':
      result = drawRectangle(x, y, state, props, canvas, overlay, updInit, button);
      break;
    case 'circle':
      result = drawCircle(x, y, state, props, canvas, overlay, updInit, button);
      break;
    case 'move':
      result = moveContext(x, y, state, props, canvas, overlay, updInit);
      break;
    case 'vertical-mirror':
      result = verticalMirror(x, y, state, props, canvas, updXY, button);
      break;
    default:
      throw new Error("tool isn't found");
  }
  return result;
};

export default activateTool;
