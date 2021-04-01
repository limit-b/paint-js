const jsCanvas = document.getElementById('js-canvas'),
  jsRange = document.getElementById('js-range'),
  jsNumber = document.getElementById('js-number'),
  jsPaintMode = document.getElementById('js-paint-mode'),
  jsSave = document.getElementById('js-save'),
  jsControlsColor = document.getElementsByClassName('js-controls__color'),
  jsSelectColor = document.getElementById('js-select-color'),
  ctx = jsCanvas.getContext('2d');

const CANVAS_LENGTH = 700,
  INITIAL_COLOR = '#2c2c2c',
  INITIAL_SIZE = '2.5';

let painting = false,
  filling = false;

jsCanvas.width = CANVAS_LENGTH;
jsCanvas.height = CANVAS_LENGTH;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, jsCanvas.width, jsCanvas.height);
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = INITIAL_SIZE;

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

function handleContextMenu(event) {
  event.preventDefault();
}

function handleChangeRange(event) {
  const changedSize = event.target.value;
  ctx.lineWidth = changedSize;
  jsNumber.value = changedSize;
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

function handleClickSave() {
  const canvasImage = jsCanvas.toDataURL();
  const imageLink = document.createElement('a');
  imageLink.href = canvasImage;
  imageLink.download = 'PaintJS';
  imageLink.click();
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
    jsCanvas.addEventListener('contextmenu', handleContextMenu);
  }
  if (jsRange) {
    jsRange.addEventListener('input', handleChangeRange);
  }
  if (jsPaintMode) {
    jsPaintMode.addEventListener('click', handleChangeMode);
  }
  if (jsSave) {
    jsSave.addEventListener('click', handleClickSave);
  }
  if (jsControlsColor) {
    Array.from(jsControlsColor).forEach((color) =>
      color.addEventListener('click', handleChangeColor)
    );
  }
}

init();

// TODO: 선택된 색상, 브러쉬 크기 표시 필요
