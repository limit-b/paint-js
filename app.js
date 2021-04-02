const jsCanvas = document.getElementById('js-canvas'),
  jsRange = document.getElementById('js-range'),
  jsNumber = document.getElementById('js-number'),
  jsPaintMode = document.getElementById('js-paint-mode'),
  jsSave = document.getElementById('js-save'),
  jsControlsColor = document.getElementsByClassName('js-controls__color'),
  jsColorNameInput = document.getElementById('js-color-name'),
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

function showColorName(color) {
  switch (true) {
    case color === 'rgb(44, 44, 44)':
      jsColorNameInput.value = 'black';
      break;
    case color === 'rgb(255, 59, 48)':
      jsColorNameInput.value = 'red';
      break;
    case color === 'rgb(255, 149, 0)':
      jsColorNameInput.value = 'orange';
      break;
    case color === 'rgb(255, 204, 0)':
      jsColorNameInput.value = 'yellow';
      break;
    case color === 'rgb(76, 217, 99)':
      jsColorNameInput.value = 'green';
      break;
    case color === 'rgb(90, 200, 250)':
      jsColorNameInput.value = 'sky blue';
      break;
    case color === 'rgb(5, 121, 255)':
      jsColorNameInput.value = 'blue';
      break;
    case color === 'rgb(88, 86, 214)':
      jsColorNameInput.value = 'indigo';
      break;
    default:
      jsColorNameInput.value = color;
      break;
  }
}

function handleChangeColor(event) {
  const changedColor = event.target.style.backgroundColor;
  ctx.strokeStyle = changedColor;
  ctx.fillStyle = changedColor;
  showColorName(changedColor);
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
