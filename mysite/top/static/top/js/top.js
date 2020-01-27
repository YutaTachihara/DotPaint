
class Grid {

    constructor(height, width, rowCount, column) {
        this.height = Number(height);
        this.width = Number(width);
        this.rowCount = Number(rowCount);
        this.rowCount = Number(columnCount)
    }

    gridAlpha () {
        return 0.1;
    }
}

var canvas = null
var context = null
var clicked = null
var x = 20;
var y = 20;

window.addEventListener('load', function() {
    canvas = document.getElementById('canvas');
    canvas.width = 800;
    canvas.height = 500;
    context = canvas.getContext('2d');
    context.lineWidth = 2;
    context.globalAlpha = 0.1;

    drawGrid();

    canvas.addEventListener('mousemove', onmousemove_canvas, false);
    canvas.addEventListener('click', onmousemove_canvas, false);

    let body = document.body
    body.addEventListener('mousedown', function() {clicked = true});
    body.addEventListener('mouseup', function() {clicked = false});

    let clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', clear)

    let colorButton = document.getElementById('color');
    colorButton.addEventListener('change', setColor);

    let opa = document.getElementById('opa');
    opa.addEventListener('change', setOpa);

    let xVal = document.getElementById('x');
    xVal.addEventListener('change', setX);

    let yVal = document.getElementById('y');
    yVal.addEventListener('change', setY);

    $("#download").click(function(){
      var base64 = canvas.toDataURL("image/png");
      document.getElementById("download").href = base64;
    });
});

function setOpa(evt) {
    context.globalAlpha = evt.target.value;
}

function setY(event) {
    y = 0 + event.target.value;
    y = Number(y);
    clear();
}

function setX(event) {
    x = 0 + event.target.value;
    x = Number(x);
    clear();
}

function setColor(evt) {
    context.fillStyle = evt.target.value;
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
}

function drawGrid() {
    let start = 0;
    let width = Number(canvas.width);
    let height = Number(canvas.height);

    for (let i = start; i < width; i += x) {
        console.log(start, i, width, x);
        context.beginPath();
        context.moveTo(i,0);
        context.lineTo(i,height);
        context.closePath();
        context.stroke();
    }

    for (let i = start; i < height; i += y) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(width, i);
        context.closePath();
        context.stroke();
    }
}

function onmousemove_canvas(evt) {
    if (!clicked)
        return;
    let mousePos = getMousePosition(canvas, evt);
    console.log(Math.floor(mousePos.y))
    let startX = Math.floor(mousePos.x / x) * x;
    let startY = Math.floor(mousePos.y / y) * y;
    context.fillRect(startX, startY, x, y);
}

function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

