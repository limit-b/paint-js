const jsCanvas = document.getElementById('js-canvas');

let painting = false;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
}

function onMouseDown(event) {
  painting = true;
  console.log(event, painting);
}

function stopPainting() {
  painting = false;
}

function onMouseUp(event) {
  stopPainting();
  console.log(event, painting);
}

function init() {
  if (jsCanvas) {
    jsCanvas.addEventListener('mousemove', onMouseMove);
    jsCanvas.addEventListener('mousedown', onMouseDown);
    jsCanvas.addEventListener('mouseup', onMouseUp);
    jsCanvas.addEventListener('mouseleave', stopPainting);
  }
}

init();
