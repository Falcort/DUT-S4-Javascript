window.addEventListener("load", init);
var mouseIsDown;

var drawLastPointX = null;
var drawLastPointY = null;
var color = "#fff";

var canvas;
var canvasPreview;

var contextFinal;
var contextPreview;

function init()
{
    var position;
    var mouseDown = false;
    var mouseUp;

    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    contextFinal = canvas.getContext("2d");

    canvasPreview = document.getElementById("canvasPreview");
    canvasPreview.width = window.innerWidth;
    canvasPreview.height = window.innerHeight;
    contextPreview = canvasPreview.getContext("2d");

    canvasPreview.addEventListener('mousemove', function(event)
    {
        position = getMousePosition(event);
        color = document.getElementById("color").value;
        var draw = document.getElementById("draw");
        var rect = document.getElementById("rect");
        var circle = document.getElementById("circle");
        var debug = document.getElementById("debug");

        if(draw.checked)
        {
            if(mouseIsDown)
            {
                mouseDown = position;
                drawDraw(mouseDown);
            }
        }

        if(rect.checked)
        {
            if(mouseIsDown)
            {
                if(debug.checked)
                {
                    drawRectPreview(mouseDown, position);
                }
            }
        }

        if(circle.checked)
        {
            if(mouseIsDown)
            {
                if(debug.checked)
                {
                    drawCirclePreview(mouseDown, position);
                }
            }
        }

        drawLastPointX = position.x;
        drawLastPointY = position.y;
    });

    canvasPreview.addEventListener("mousedown", function ()
    {
        mouseIsDown = true;
        mouseDown = position;

    });

    canvasPreview.addEventListener("mouseup", function ()
    {
        mouseUp = position;
        mouseIsDown = false;
        startDraw(mouseUp, mouseDown);
    });

    document.getElementById("reset").addEventListener("click", function ()
    {
        contextPreview.clearRect(0, 0, canvas.width, canvas.height);
        contextFinal.clearRect(0, 0, canvas.width, canvas.height);
    });
}

function getMousePosition(event)
{
    var coord = canvas.getBoundingClientRect();
    var x = event.clientX - coord.left;
    var y = event.clientY - coord.top;
    return {
        x: x,
        y: y
    };
}

function drawRectPreview(down, position)
{
    contextPreview.clearRect(0, 0, canvasPreview.width, canvasPreview.height);
    contextPreview.beginPath();
    contextPreview.rect(down.x, down.y, position.x-down.x, position.y-down.y);
    contextPreview.fillStyle = color;
    contextPreview.globalAlpha = 0.2;
    contextPreview.fill();
}

function drawRect(up, down)
{
    contextFinal.beginPath();
    contextFinal.rect(up.x, up.y, down.x-up.x, down.y-up.y);
    contextFinal.fillStyle = color;
    contextFinal.fill();
}

function drawCirclePreview(down, position)
{
    contextPreview.clearRect(0, 0, canvasPreview.width, canvasPreview.height);
    contextPreview.beginPath();
    var width = Math.abs(down.x - position.x);
    var height = Math.abs(down.y - position.y);
    var rayon = Math.sqrt((width*width) + (height*height));

    contextPreview.arc(down.x,down.y,rayon,0,2*Math.PI);
    contextPreview.fillStyle = color;
    contextPreview.globalAlpha = 0.2;
    contextPreview.fill();
}

function drawCircle(up, down)
{
    contextFinal.beginPath();
    var width = Math.abs(down.x - up.x);
    var height = Math.abs(down.y - up.y);
    var rayon = Math.sqrt((width*width) + (height*height));

    contextFinal.arc(down.x,down.y,rayon,0,2*Math.PI);
    contextFinal.fillStyle = color;
    contextFinal.fill();
}

function drawText(down)
{
    var text = document.getElementById("text").value;
    var size = document.getElementById("textSize").value;
    contextFinal.font = size + "px Arial";
    contextFinal.fillStyle = color;
    contextFinal.fillText(text, down.x, down.y);
}

function drawTextStroke(down)
{
    var text = document.getElementById("textStroke").value;
    var size = document.getElementById("textStrokeSize").value;
    contextFinal.font = size + "px Arial";
    contextFinal.strokeStyle = color;
    contextFinal.strokeText(text, down.x, down.y);
}

function drawDraw(down)
{
    var draw = document.getElementById("draw");
    var size = document.getElementById("drawSize").value;
    if(draw.checked)
    {
        if(mouseIsDown)
        {
            contextFinal.beginPath();
            contextFinal.moveTo(drawLastPointX,drawLastPointY);
            contextFinal.lineTo(down.x,down.y);
            contextFinal.strokeStyle = color;
            contextFinal.lineWidth=size;
            contextFinal.stroke();
        }
    }
}

function startDraw(up, down)
{
    var rect = document.getElementById("rect");
    var circle = document.getElementById("circle");
    var text = document.getElementById("textRadio");
    var textStroke = document.getElementById("textStrokeRadio");

    console.log("Draw");
    if(rect.checked)
    {
        console.log("Rect");
        drawRect(up, down);
    }

    if(circle.checked)
    {
        drawCircle(up, down);
    }

    if(text.checked)
    {
        drawText(down);
    }

    if(textStroke.checked)
    {
        drawTextStroke(down);
    }
}