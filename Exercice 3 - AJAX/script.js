window.addEventListener("hashchange", change);
window.addEventListener("load", init);
function init()
{
    change();
}

function change()
{
    var array = []
    var url_change = window.location.href;
    url_change = url_change.replace("#", "");
    array = url_change.split("/");
    var url;
    if(array.length === 4 && array[3] != "")
    {
        url = "chapitre" + array[array.length-1] + ".json";
    }
    else
    {
        url = "chapitre1.json";
    }
    load(url);
}

function load(url)
{
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.onerror = function()
    {
        console.log("Échec de chargement" + url);
    };

    var json;

    req.onload = function()
    {
        if (req.status === 200)
        {
            json = JSON.parse(req.responseText);
        }
        else
        {
            console.log("Erreur " + req.status);
        }
    };

    req.send();

    req.addEventListener('load', function()
    {
        document.getElementById("text").innerHTML = "<p>" + json.txt + "</p>";
        var final = "";
        for (var i=0; i<json.links.length; i++)
        {
            final += "<a href='" + json.links[i].link + "'>" + json.links[i].txt + "</a><br />";
        }
        document.getElementById("links").innerHTML = "<br />" + final;
    });
}