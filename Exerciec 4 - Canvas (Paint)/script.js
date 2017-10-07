window.addEventListener("load", init);

var mouseIsDown;
var drawLastPointX = null;
var drawLastPointY = null;
var color = "#000000";

var canvas;
var canvasPreview;

var contextFinal;
var contextPreview;

var debugEnable = false;
var drawEnable = true;
var rectEnable;
var circleEnable;
var textEnable;
var textStrokeEnable;

var textSize = 30;
var textText = "";

var textStrokeSize = 30;
var textStroke = "";

var drawSize;

function init()
{

    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    contextFinal = canvas.getContext("2d");

    canvasPreview = document.getElementById("canvasPreview");
    canvasPreview.width = window.innerWidth;
    canvasPreview.height = window.innerHeight;
    contextPreview = canvasPreview.getContext("2d");

    create_eventListener();
}

function create_eventListener()
{

    var position;
    var mouseDown = false;
    var mouseUp;

    canvasPreview.addEventListener('mousemove', function(event)
    {
        position = getMousePosition(event);

        if(drawEnable)
        {
            if(mouseIsDown)
            {
                mouseDown = position;
                drawDraw(mouseDown);
            }
        }

        if(rectEnable)
        {
            if(mouseIsDown)
            {
                if(debugEnable)
                {
                    drawRectPreview(mouseDown, position);
                }
            }
        }

        if(circleEnable)
        {
            if(mouseIsDown)
            {
                if(debugEnable)
                {
                    drawCirclePreview(mouseDown, position);
                }
            }
        }

        if(textEnable)
        {
            if(mouseIsDown)
            {
                if(debugEnable)
                {
                    drawTextPreview(mouseDown, position);
                }
            }
        }

        if(textStrokeEnable)
        {
            if(mouseIsDown)
            {
                if(debugEnable)
                {
                    drawTextStrokePreview(mouseDown, position);
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

    document.getElementById("debug").addEventListener("change", function ()
    {
        debugEnable = document.getElementById("debug").checked;
    });

    document.getElementById("draw").addEventListener("change", function ()
    {
        drawEnable = document.getElementById("draw").checked;
        rectEnable = false;
        circleEnable = false;
        textEnable = false;
        textStrokeEnable = false;
    });

    document.getElementById("rect").addEventListener("change", function ()
    {
        rectEnable = document.getElementById("rect").checked;
        drawEnable = false;
        circleEnable = false;
        textEnable = false;
        textStrokeEnable = false;
    });

    document.getElementById("circle").addEventListener("change", function ()
    {
        circleEnable = document.getElementById("circle").checked;
        drawEnable = false;
        rectEnable = false;
        textEnable = false;
        textStrokeEnable = false;
    });

    document.getElementById("textRadio").addEventListener("change", function ()
    {
        textEnable = document.getElementById("textRadio").checked;
        drawEnable = false;
        rectEnable = false;
        circleEnable = false;
        textStrokeEnable = false;
    });

    document.getElementById("textStrokeRadio").addEventListener("change", function ()
    {
        textStrokeEnable = document.getElementById("textStrokeRadio").checked;
        textEnable = document.getElementById("textRadio").checked;
        drawEnable = false;
        rectEnable = false;
        circleEnable = false;
        textEnable = false;
    });

    document.getElementById("textSize").addEventListener("input", function ()
    {
        textSize = document.getElementById("textSize").value;
    });

    document.getElementById("text").addEventListener("input", function ()
    {
        textText = document.getElementById("text").value;
    });

    document.getElementById("textStrokeSize").addEventListener("input", function ()
    {
        textStrokeSize = document.getElementById("textStrokeSize").value;
    });

    document.getElementById("textStroke").addEventListener("input", function ()
    {
        textStroke = document.getElementById("textStroke").value;
    });

    document.getElementById("drawSize").addEventListener("input", function ()
    {
        drawSize = document.getElementById("drawSize").value;
    });

    document.getElementById("color").addEventListener("input", function ()
    {
        console.log("Color");
        color = document.getElementById("color").value;
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
    var width = Math.abs(down.x - position.x);
    var height = Math.abs(down.y - position.y);
    var rayon = Math.sqrt((width*width) + (height*height));

    contextPreview.clearRect(0, 0, canvasPreview.width, canvasPreview.height);
    contextPreview.beginPath();

    contextPreview.arc(down.x,down.y,rayon,0,2*Math.PI);
    contextPreview.fillStyle = color;
    contextPreview.globalAlpha = 0.2;
    contextPreview.fill();
}

function drawCircle(up, down)
{
    var width = Math.abs(down.x - up.x);
    var height = Math.abs(down.y - up.y);
    var rayon = Math.sqrt((width*width) + (height*height));

    contextFinal.beginPath();

    contextFinal.arc(down.x,down.y,rayon,0,2*Math.PI);
    contextFinal.fillStyle = color;
    contextFinal.fill();
}

function drawTextPreview(down, position)
{
    var width = Math.abs(down.x - position.x);
    var height = Math.abs(down.y - position.y);
    var taille = Math.sqrt((width*width) + (height*height));
    textSize = taille;

    /* A supprimer */
    document.getElementById("textSize").value = taille;
    /* A supprimer */

    contextPreview.clearRect(0, 0, canvasPreview.width, canvasPreview.height);
    contextPreview.beginPath();

    contextPreview.font = textSize + "px Arial";
    contextPreview.fillStyle = color;
    contextPreview.globalAlpha = 0.2;
    contextPreview.fillText(textText, down.x, down.y);
}

function drawText(down)
{
    contextFinal.font = textSize + "px Arial";
    contextFinal.fillStyle = color;
    contextFinal.fillText(textText, down.x, down.y);
}

function drawTextStrokePreview(down, position)
{
    var width = Math.abs(down.x - position.x);
    var height = Math.abs(down.y - position.y);
    var taille = Math.sqrt((width*width) + (height*height));
    textStrokeSize = taille;

    /* A supprimer */
    document.getElementById("textStrokeSize").value = taille;
    /* A supprimer */

    contextPreview.clearRect(0, 0, canvasPreview.width, canvasPreview.height);
    contextPreview.beginPath();

    contextPreview.font = textStrokeSize + "px Arial";
    contextPreview.strokeStyle = color;
    contextPreview.globalAlpha = 0.2;
    contextPreview.strokeText(textStroke, down.x, down.y);
}

function drawTextStroke(down)
{
    contextFinal.font = textStrokeSize + "px Arial";
    contextFinal.strokeStyle = color;
    contextFinal.strokeText(textStroke, down.x, down.y);
}

function drawDraw(down)
{
    if(drawEnable)
    {
        if(mouseIsDown)
        {
            contextFinal.beginPath();
            contextFinal.moveTo(drawLastPointX,drawLastPointY);
            contextFinal.lineTo(down.x,down.y);
            contextFinal.strokeStyle = color;
            contextFinal.lineWidth=drawSize;
            contextFinal.stroke();
        }
    }
}

function startDraw(up, down)
{
    if(rectEnable)
    {
        drawRect(up, down);
    }

    if(circleEnable)
    {
        drawCircle(up, down);
    }

    if(textEnable)
    {
        drawText(down);
    }

    if(textStrokeEnable)
    {
        drawTextStroke(down);
    }
}
