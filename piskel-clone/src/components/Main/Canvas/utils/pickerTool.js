const fullColorHex = (r, g, b) => {
  const rgbToHex = (rgb) => {
    const hex = Number(rgb).toString(16);
    return (hex.length < 2) ? `0${hex}` : hex;
  };
  return `${rgbToHex(r)}${rgbToHex(g)}${rgbToHex(b)}`;
};

const pickTheColor = (pageX, pageY, state, props, canvas, button) => {
  const { mouseButton } = state;
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
