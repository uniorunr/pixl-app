import { fullColorHex } from './common';

const pickTheColor = (pageX, pageY, props, canvas, button) => {
  const { mouseButton } = props;
  const currentButton = mouseButton || button;
  const context = canvas.getContext('2d');
  const x = pageX - canvas.offsetLeft;
  const y = pageY - canvas.offsetTop;
  const { data } = context.getImageData(x, y, 1, 1);
  const [r, g, b, a] = data;
  let color;
  if (r === 0 && g === 0 && b === 0 && a === 0) {
    color = 'transparent';
  } else {
    color = `#${fullColorHex(r, g, b)}`;
  }
  return { color, button: currentButton };
};

export default pickTheColor;
