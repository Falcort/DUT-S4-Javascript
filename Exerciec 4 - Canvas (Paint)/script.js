window.addEventListener("load", init);
var mouseIsDown;

var drawLastPointX = null;
var drawLastPointY = null;
var color = "#fff";

function init()
{
    var canvas;
    var position;
    var mouseDown = false;
    var mouseUp;

    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    canvas.addEventListener('mousemove', function(event)
    {
        position = getMousePosition(canvas, event);
        color = document.getElementById("color").value;
        var draw = document.getElementById("draw");
        if(draw.checked)
        {
            if(mouseIsDown)
            {
                mouseDown = position;
                drawDraw(canvas, mouseDown);
            }
        }
        drawLastPointX = position.x;
        drawLastPointY = position.y;
    });

    canvas.addEventListener("mousedown", function ()
    {
        mouseIsDown = true;
        mouseDown = position;

    });

    canvas.addEventListener("mouseup", function ()
    {
        mouseUp = position;
        mouseIsDown = false;
        startDraw(canvas, mouseUp, mouseDown);
    });
}

function getMousePosition(canvas, event)
{
    var coord = canvas.getBoundingClientRect();
    var x = event.clientX - coord.left;
    var y = event.clientY - coord.top;
    return {
        x: x,
        y: y
    };
}

function  drawRect(canvas, up, down)
{
    var ctx = canvas.getContext("2d");
    ctx.rect(up.x, up.y, down.x-up.x, down.y-up.y);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawCircle(canvas, up, down)
{
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    var width = Math.abs(down.x - up.x);
    var height = Math.abs(down.y - up.y);
    var rayon = Math.sqrt((width*width) + (height*height));

    ctx.arc(down.x,down.y,rayon,0,2*Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawText(canvas, down)
{
    var ctx = canvas.getContext("2d");
    var text = document.getElementById("text").value;
    var size = document.getElementById("textSize").value;
    ctx.font = size + "px Arial";
    ctx.fillStyle = color;
    ctx.fillText(text, down.x, down.y);
}

function drawTextStroke(canvas, down)
{
    var ctx = canvas.getContext("2d");
    var text = document.getElementById("textStroke").value;
    var size = document.getElementById("textStrokeSize").value;
    ctx.font = size + "px Arial";
    ctx.strokeStyle = color;
    ctx.strokeText(text, down.x, down.y);
}

function drawDraw(canvas, down)
{
    var ctx = canvas.getContext("2d");
    var draw = document.getElementById("draw");
    var size = document.getElementById("drawSize").value;
    if(draw.checked)
    {
        if(mouseIsDown)
        {
            ctx.beginPath();
            ctx.moveTo(drawLastPointX,drawLastPointY);
            ctx.lineTo(down.x,down.y);
            ctx.strokeStyle = color;
            ctx.lineWidth=size;
            ctx.stroke();
        }
    }
}

function startDraw(canvas, up, down)
{
    var rect = document.getElementById("rect");
    var circle = document.getElementById("circle");
    var text = document.getElementById("textRadio");
    var textStroke = document.getElementById("textStrokeRadio");

    if(rect.checked)
    {
        drawRect(canvas, up, down);
    }

    if(circle.checked)
    {
        drawCircle(canvas, up, down);
    }

    if(text.checked)
    {
        drawText(canvas, down);
    }

    if(textStroke.checked)
    {
        drawTextStroke(canvas, down);
    }
}