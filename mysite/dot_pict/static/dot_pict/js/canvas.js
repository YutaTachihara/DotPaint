const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 500;

let dots = [];
const dotWidth = 10;
const dotHeight = 10;
let dotColor = 'black';
let dotAlpha = 0.1;

const gridWidth = dotWidth;
const gridHeight = dotHeight;
const gridColor = 'black';
const gridAlpha = 0.1;

const clearButton = document.getElementById('clear-button')

const colorSelector = document.getElementById('color-selector');
const alphaSelector = document.getElementById('alpha-selector');

const downloader = document.getElementById('downloader');
const uploader   = document.getElementById('uploader');


// 描画処理概要
// 1 キャンバス上でマウスをクリックする。
// 2 クリックした座標、その時の色カラーアルファが保存される。
// 3 更新処理の時に2で保存されたドットデータを描画する。

const onMouseDown = function(event) {
  createDot(event.offsetX, event.offsetY)
}

const onMouseMove = function(event) {
  if (event.buttons != 0)
    createDot(event.offsetX, event.offsetY)
}

const createDot = function(clickedX, clickedY) {
  x = Math.floor(clickedX / dotWidth);
  y = Math.floor(clickedY / dotHeight);
  dots.push({x: x, y: y, color:  dotColor, alpha: dotAlpha});
}

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);

// 更新処理
const update = function() {
  clearCanvas();
  drawDots();
  drawGrid();
}

const clearCanvas = function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

const drawDots = function() {
  for (let i = 0; i < dots.length; i++)
    drawDot(dots[i]);
}

const drawDot = function(dotData) {
  for (let x = dotData.x * dotWidth; x < (dotData.x + 1) * dotWidth; x++)
    for (let y = dotData.y * dotHeight; y  < (dotData.y + 1) * dotHeight; y++)
      paint(x, y, dotData.color, dotData.alpha);
}

const drawGrid = function() {
  drawRowLines();
  drawColumnLines();
}

const drawRowLines = function() {
  for (let y = 0; y < canvas.height; y += gridHeight)
    drawLine(0, y, canvas.width, y);
}

const drawColumnLines = function() {
  for (let x = 0; x < canvas.width; x += gridWidth)
    drawLine(x, 0, x, canvas.height);
}

const drawLine = function(startX, startY, endX, endY) {
  for (let x = startX; x <= endX; x++)
    for (let y = startY; y <= endY; y++)
      paint(x, y, gridColor, gridAlpha);
}

const paint = function(x, y, color, alpha) {
  context.fillStyle = color;
  context.globalAlpha = alpha;
  context.fillRect(x, y, 1, 1);
}

setInterval(update, 100) // 100ms ≒ 1/10s

// ダウンロード処理

const download = function() {
  // グリッドは保存の際にいらないので消す。
  clearCanvas();
  drawDots();
  const base64 = canvas.toDataURL("image/png");
  downloader.href = base64;
}

downloader.addEventListener('click', download);


// アップロード処理

const upload = function() {
  // グリッドは保存の際にいらないので消す。
  clearCanvas();
  drawDots();
  const base64 = canvas.toDataURL("image/png");
  const csrf_token = getCookie("csrftoken");
  $.ajax({
    type: "POST",
    url: "../upload/",
    data: {
        imgBase64: base64.replace(/^.*,/, ''),
    },
    contentType: "application/json",
    // 送信前にヘッダにcsrf_tokenを付与。
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrf_token);
        }
    },
    timeout: 1000
});
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

uploader.addEventListener('click', upload);

// その他

clearButton.addEventListener('click', (e) => {dots = []});
colorSelector.addEventListener('change', (e) => {dotColor = e.target.value});
alphaSelector.addEventListener('change', (e) => {dotAlpha = e.target.value});