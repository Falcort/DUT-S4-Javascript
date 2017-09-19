var time = new Date();
var heurs = time.getHours();
var minutes = time.getMinutes();
var secondes = time.getSeconds();
var alarmes = [];
var i=0;
document.getElementById("time").textContent = heurs + ":" + minutes + ":" + secondes;

window.addEventListener("load", createPage());

function createPage()
{
    document.getElementById('heures').addEventListener('input', check_Heures);
    document.getElementById('minutes').addEventListener('input', check_Minutes);
    document.getElementById('ajouter').addEventListener('click', add_Alarme);
    uneSeconde();
}

function uneSeconde()
{
    setInterval
    (
        function()
        {
            secondes++;
            if(secondes === 60)
            {
                minutes++;
                secondes = 0;
            }
            if(minutes === 60)
            {
                heurs++;
                minutes = 0;
            }
            if(heurs === 24 && minutes === 60 && secondes ===60)
            {
                heurs = 00;
            }

            if(minutes < 10 && minutes.toString().length <2)
            {
                minutes = "0" + minutes;
            }

            if(secondes < 10 && secondes.toString().length <2)
            {
                secondes = "0" + secondes;
            }

            if(heurs < 10 && heurs.toString().length < 2)
            {
                heurs = "0" + heurs;
            }

            document.getElementById("time").textContent = heurs + ":" + minutes + ":" + secondes;
        },
        1000
    );

}

function check_Heures()
{
    console.log("Val = " + document.getElementById('heures').value);
    if(document.getElementById('heures').value > 24 ||  document.getElementById('heures').value < 0)
    {
        alert("Heure invalide");
        document.getElementById('heures').value = "";
    }
}

function check_Minutes()
{
    if(document.getElementById('minutes').value > 60 ||  document.getElementById('minutes').value < 0)
    {
        alert("Minutes invalide");
        document.getElementById('minutes').value = "";
    }
}

function add_Alarme()
{
    var func_heur, func_minutes, func_name;
    func_heur = document.getElementById('heures').value;
    func_minutes = document.getElementById('minutes').value;
    func_name = document.getElementById('nom').value;

    alarmes.push(func_heur + ";" + func_minutes + ";" + func_name);
    alarme_HTML(func_heur, func_minutes, func_name);

    document.getElementById('heures').value = "";
    document.getElementById('minutes').value = "";
    document.getElementById('nom').value = "";
}

function alarme_HTML(g_heur, g_minute, g_nom)
{
    var table = document.getElementById("table");
    var row = table.insertRow(1);
    row.id = "row" + i;
    var active = row.insertCell(0);
    var heures = row.insertCell(1);
    var minutes = row.insertCell(2);
    var nom = row.insertCell(3);
    var supp = row.insertCell(4);
    heures.innerHTML = "<input id=\"heur" + i + "\" type=\"number\" value=\"" + g_heur +"\" />";
    minutes.innerHTML = "<input id=\"min" + i + "\" type=\"number\" value=\"" + g_minute +"\" />";
    nom.innerHTML = "<input id=\"nom" + i + "\" type=\"text\" value=\"" + g_nom +"\" />";
    active.innerHTML = "<input id=\"active" + i + "\" type=\"checkbox\" />";
    supp.innerHTML = "<button  id=\"" + i + "\"" +">Supprimer</button>";
    document.getElementById(i).addEventListener('click', del_alarme);
    i++;
}

function del_alarme()
{
    var row = document.getElementById("row" + this.id);
    var parent = row.parentNode;
    parent.removeChild(row);
}