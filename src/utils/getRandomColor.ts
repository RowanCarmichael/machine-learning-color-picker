const GOLDEN_RATIO = 0.618033988749895;
const SATURATION = 0.6;
const VALUE = 0.95;

const getRandomColor = () => {
  let hue = (Math.random() + GOLDEN_RATIO) % 1;
  var hi = Math.floor(hue * 6)
  var f = hue * 6 - hi
  var p = VALUE * (1 - SATURATION)
  var q = VALUE * (1 - f * SATURATION)
  var t = VALUE * (1 - (1 - f) * SATURATION)
  var r = 255
  var g = 255
  var b = 255

  switch (hi) {
    case 0: r = VALUE; g = t; b = p; break
    case 1: r = q; g = VALUE; b = p; break
    case 2: r = p; g = VALUE; b = t; break
    case 3: r = p; g = q; b = VALUE; break
    case 4: r = t; g = p; b = VALUE; break
    case 5: r = VALUE; g = p; b = q; break
  }
  return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)]
}

export default getRandomColor;