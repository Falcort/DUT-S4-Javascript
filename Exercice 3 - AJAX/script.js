var url = "chapitre1.json"
var req = new XMLHttpRequest();
req.open("GET", url);
req.onerror = function()
{
    console.log("Échec de chargement "+ url);
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
    for (var i=0; i<json.links.length; i++)
    {
        document.getElementById("links").innerHTML = "<a href='" + json.links[i].link + "'>" + json.links[i].txt + "</a>";
    }
});