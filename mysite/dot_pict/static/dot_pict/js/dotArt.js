
window.addEventListener('load', function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    canvas.addEventListener('mousedown',  onMouseDown);
    canvas.addEventListener('mousemove',  onMouseMove);
});

pressedKeys = [];

document.addEventListener('keydown', function(event) {
    let key = event.key;
    let keyIndex = pressedKeys.indexOf(key);
    if (keyIndex >= 0) return;
    pressedKeys.push(key);

    let pressesZ = pressedKeys.indexOf('z') >= 0;
    let pressesControl = pressedKeys.indexOf('Control') >= 0;
    if (pressesZ && pressesControl) {
        undo();
    }
});

document.addEventListener('keyup', function(event) {
    let key = event.key;
    let keyIndex = pressedKeys.indexOf(key);
    if (keyIndex == -1) {
        return;
    }
    let tmp = [];
    for (let i = 0; i < pressedKeys.length; i++) {
        if (i != keyIndex) {
            tmp.push(pressedKeys[i]);
        }
    }
    pressedKeys = tmp;
});

function onMouseDown(event) {
    let position = transformCanvasPosition(event);
    paint(position);
}

function onMouseMove(event) {
    if (event.buttons != 0) {
        let position = transformCanvasPosition(event);
        paint(position);
    }
}

function transformCanvasPosition(event) {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    }
}

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = '#000';
        this.alpha = 0;
        this.history = [];
    }
    fill(color, alpha) {
    }
    undo() {
    }
    render() {
    }
}

history = [];

function undo() {
    let his = history.pop();
    his.position
}

function redo() {

}

function paint(position) {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    context.fillRect(
        Math.floor(position.x / 10) * 10,
        Math.floor(position.y / 10) * 10,
        10,
        10,
    )
}

// add download button
function save() {
}

class Grid {
    constructor(canvas) {
        this.canvas = canvas;
        this.cells = null;
        this.height = 100;
        this.width = 100;
        this.color = '#fff';
    }
    show() {
    }
    hide() {
    }
    set width(width) {
        this._width = width;
    }
    set height(height) {
        this._height = height;
    }
    set color(color) {
        this._color = color;
    }
    set alpha(alpha) {
        this._alpha = alpha;
    }
    set active(active) {
        this._active = active;
    }
}


