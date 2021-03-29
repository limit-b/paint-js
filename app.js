const jsCanvas = document.getElementById('js-canvas'),
  jsControlsColor = document.getElementsByClassName('js-controls__color'),
  ctx = jsCanvas.getContext('2d');

jsCanvas.width = 700;
jsCanvas.height = 700;

ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = '2.5';

let painting = false;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function handleClickColor(event) {
  const clickedColor = event.target.style.backgroundColor;
  ctx.strokeStyle = clickedColor;
}

function init() {
  if (jsCanvas) {
    jsCanvas.addEventListener('mousemove', onMouseMove);
    jsCanvas.addEventListener('mousedown', startPainting);
    jsCanvas.addEventListener('mouseup', stopPainting);
    jsCanvas.addEventListener('mouseleave', stopPainting);
  }
  Array.from(jsControlsColor).forEach((color) =>
    color.addEventListener('click', handleClickColor)
  );
}

init();
