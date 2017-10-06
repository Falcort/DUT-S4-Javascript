window.addEventListener("load", init);
var mouseIsDown;

var drawLastPointX = null;
var drawLastPointY = null;

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
        console.log(mouseIsDown);
        position = getMousePosition(canvas, event);

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
    ctx.fillRect(up.x, up.y, down.x-up.x, down.y-up.y);
}

function drawCircle(canvas, up, down)
{
    console.log("Cercle");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    var x;
    var y;
    var r;

    ctx.arc(down.x,down.y,Math.abs(up.x-down.x),0,2*Math.PI);
    ctx.fill();
}

function drawDraw(canvas, down)
{
    var ctx = canvas.getContext("2d");
    var draw = document.getElementById("draw");
    if(draw.checked)
    {
        if(mouseIsDown)
        {
            ctx.beginPath();
            ctx.moveTo(drawLastPointX,drawLastPointY);
            ctx.lineTo(down.x,down.y);
            ctx.stroke();
        }
    }
}

function startDraw(canvas, up, down)
{
    var rect = document.getElementById("rect");
    var circle = document.getElementById("circle");

    if(rect.checked)
    {
        drawRect(canvas, up, down);
    }

    if(circle.checked)
    {
        drawCircle(canvas, up, down);
    }
}