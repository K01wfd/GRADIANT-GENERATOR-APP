const picker1 = document.getElementById('picker1');
const picker2 = document.getElementById('picker2');
const sample = document.querySelector('.sample');
const gradiantValueDisplay = document.querySelector('.gradiantValue');
let firstColor = '';
let secondColor = '';
picker1.addEventListener('input', (e) => {
  const [h, s, l] = hexToHsl(e);
  firstColor = `hsl(${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`;
  changeBackground(firstColor, secondColor, sample);
});

picker2.addEventListener('input', (e) => {
  const [h, s, l] = hexToHsl(e);
  secondColor = `hsl(${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`;
  changeBackground(firstColor, secondColor, sample);
});

function hexToHsl(event) {
  let hex = event.target.value;
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let rgb = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };

  let r = rgb.r / 255.0;
  let g = rgb.g / 255.0;
  let b = rgb.b / 255.0;

  const maxVal = Math.max(r, g, b);
  const minVal = Math.min(r, g, b);

  let H,
    S,
    L = (maxVal + minVal) / 2;

  if (maxVal === minVal) {
    H = S = 0; // achromatic
  } else {
    const d = maxVal - minVal;
    S = L > 0.5 ? d / (2 - maxVal - minVal) : d / (maxVal + minVal);

    switch (maxVal) {
      case r:
        H = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        H = (b - r) / d + 2;
        break;
      case b:
        H = (r - g) / d + 4;
        break;
    }

    H /= 6;
  }

  return [H * 360, S * 100, L * 100];
}
function changeBackground(
  color1 = 'hsl(0,0%,100%)',
  color2 = 'hsl(0,0%,100%)',
  displaySample
) {
  gradiantValueDisplay.innerText = `background-image: linear-gradient(to bottom right, ${color1}, ${color2})`;
  displaySample.style.background = `linear-gradient(to bottom right, ${color1} , ${color2})`;
}
