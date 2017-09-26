window.addEventListener("hashchange", change);
window.addEventListener("load", init);
function init()
{
    change();
}

function change()
{
    var array = []
    var hash = window.location.hash;
    hash = hash.replace("#", "");
    var url;
    if(hash != "")
    {
        url = "chapitre" + hash + ".json";
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

            document.getElementById("text").innerHTML = "<p>" + json.txt + "</p>";
            var final = "";
            for (var i=0; i<json.links.length; i++)
            {
                final += "<a href='" + json.links[i].link + "'>" + json.links[i].txt + "</a><br />";
            }
            document.getElementById("links").innerHTML = "<br />" + final;
        }
        else
        {
            console.log("Erreur " + req.status);
        }
    };

    req.send();
}