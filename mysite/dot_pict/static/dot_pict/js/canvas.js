
var canvas = null
var context = null
var clicked = null
const gridAlpha = 0.1;
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
    canvas.addEventListener('click', event => { clicked = true; onmousemove_canvas(event); clicked=false;});

    canvas.addEventListener('mouseenter', function() { clicked = false;});
    canvas.addEventListener('mouseleave', function() { clicked = false;});

    let body = document.body
    body.addEventListener('mousedown', function() {clicked = true;});
    body.addEventListener('mouseup', function() {clicked = false;});

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

    $("#uploader").click(function(){
        var dataURL = canvas.toDataURL("image/png");
        var button = $(this);
        var csrf_token = getCookie("csrftoken");
        var rslt = window.confirm("送信しますか？");
        console.log(document.getElementById('title').value);
        if (rslt) {
            $.ajax({
                type: "POST",
                url: "../upload/",
                data: {
                    imgBase64: dataURL.replace(/^.*,/, ''),
                    title: document.getElementById('title').value,
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
    });
});

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
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

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
    tmp = context.globalAlpha;
    context.globalAlpha = 0.1;

    for (let i = start; i < width; i += x) {
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

    context.globalAlpha = tmp;
}

function onmousemove_canvas(evt) {
    if (!clicked)
        return;
    let mousePos = getMousePosition(canvas, evt);
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

