const jsCanvas = document.getElementById('js-canvas'),
  jsRange = document.getElementById('js-range'),
  jsPaintMode = document.getElementById('js-paint-mode'),
  jsControlsColor = document.getElementsByClassName('js-controls__color'),
  ctx = jsCanvas.getContext('2d');

const CANVAS_SIZE = 700,
  INITIAL_COLOR = '#2c2c2c';

let painting = false,
  filling = false;

jsCanvas.width = CANVAS_SIZE;
jsCanvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = '2.5';

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

function handleClickCanvas() {
  if (filling === true) {
    ctx.fillRect(0, 0, jsCanvas.width, jsCanvas.height);
  }
}

function handleChangeRange(event) {
  const changedSize = event.target.value;
  ctx.lineWidth = changedSize;
}

function handleChangeMode() {
  if (filling === true) {
    filling = false;
    jsPaintMode.textContent = 'Fill';
  } else {
    filling = true;
    jsPaintMode.textContent = 'Line';
  }
}

function handleChangeColor(event) {
  const changedColor = event.target.style.backgroundColor;
  ctx.strokeStyle = changedColor;
  ctx.fillStyle = changedColor;
}

function init() {
  if (jsCanvas) {
    jsCanvas.addEventListener('mousemove', onMouseMove);
    jsCanvas.addEventListener('mousedown', startPainting);
    jsCanvas.addEventListener('mouseup', stopPainting);
    jsCanvas.addEventListener('mouseleave', stopPainting);
    jsCanvas.addEventListener('mousedown', handleClickCanvas);
  }
  if (jsRange) {
    jsRange.addEventListener('input', handleChangeRange);
  }
  if (jsPaintMode) {
    jsPaintMode.addEventListener('click', handleChangeMode);
  }
  if (jsControlsColor) {
    Array.from(jsControlsColor).forEach((color) =>
      color.addEventListener('click', handleChangeColor)
    );
  }
}

init();
