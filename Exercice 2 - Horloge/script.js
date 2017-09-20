var time = new Date();
var global_heurs = time.getHours();
var global_minutes = time.getMinutes();
var secondes = time.getSeconds();
var alarmes = [];
var i=0;

var audio1 = new Audio('alarme1.mp3');
var audio2 = new Audio('alarme2.mp3');

document.getElementById("time").textContent = global_heurs + ":" + global_minutes + ":" + secondes;

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
            time = new Date();
            global_heurs = time.getHours();
            global_minutes = time.getMinutes();
            secondes = time.getSeconds();

            if(global_minutes < 10 && global_minutes.toString().length <2)
            {
                global_minutes = "0" + global_minutes;
            }

            if(secondes < 10 && secondes.toString().length <2)
            {
                secondes = "0" + secondes;
            }

            if(global_heurs < 10 && global_heurs.toString().length < 2)
            {
                global_heurs = "0" + global_heurs;
            }

            document.getElementById("time").textContent = global_heurs + ":" + global_minutes + ":" + secondes;
            isAlarme();
        },
        1000
    );
}

function check_Heures()
{
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

    if(func_heur < 10 && func_heur.toString().length <2)
    {
        func_heur = "0" + func_heur;
    }

    if(func_minutes < 10 && func_minutes.toString().length <2)
    {
        func_minutes = "0" + func_minutes;
    }

    alarmes.push(func_heur + ";" + func_minutes + ";" + func_name + ";" + i);
    alarme_HTML(func_heur, func_minutes, func_name);

    document.getElementById('heures').value = "";
    document.getElementById('minutes').value = "";
    document.getElementById('nom').value = "";
}

function alarme_HTML(g_heur, g_minute, g_nom, g_audio)
{
    var table = document.getElementById("table");
    var row = table.insertRow(1);
    row.id = "row" + i;
    var active = row.insertCell(0);
    var heures = row.insertCell(1);
    var minutes = row.insertCell(2);
    var nom = row.insertCell(3);
    var audio = row.insertCell(4);
    var supp = row.insertCell(5);

    heures.innerHTML = "<input id=\"heur" + i + "\" type=\"number\" value=\"" + g_heur +"\" />";
    minutes.innerHTML = "<input id=\"min" + i + "\" type=\"number\" value=\"" + g_minute +"\" />";
    nom.innerHTML = "<input id=\"nom" + i + "\" type=\"text\" value=\"" + g_nom +"\" />";
    active.innerHTML = "<input id=\"active" + i + "\" type=\"checkbox\" />";
    supp.innerHTML = "<button  id=\"" + i + "\"" +">-</button>";
    if(document.getElementById("audio_base").selectedIndex === 0)
    {
        audio.innerHTML = "<select id=\"audio" + i + "\" name=\"audio" + i + "\">" + "<option value=\"audio1\" selected>Alarme 1</option>" + "<option value=\"audio2\">Alarme 2</option>" + "</select>";
    }
    else if(document.getElementById("audio_base").selectedIndex === 1)
    {
        audio.innerHTML = "<select id=\"audio" + i + "\" name=\"audio" + i + "\">" + "<option value=\"audio1\">Alarme 1</option>" + "<option value=\"audio2\" selected>Alarme 2</option>" + "</select>";
    }
    document.getElementById(i).addEventListener('click', del_alarme);
    document.getElementById("heur" + i).addEventListener('input', edit_alarme);
    document.getElementById("min" + i).addEventListener('input', edit_alarme);
    document.getElementById("nom" + i).addEventListener('input', edit_alarme);
    document.getElementById("active"+i).checked = true;
    i++;
}

function edit_alarme()
{
    var string, id, x, alarme_slice = [], result, result_id;
    var heure, minute, name, id2;
    id = this.id.substr(this.id.length-1);
    string = this.id.substr(0, this.id.length-1);
    for(x=0; x<alarmes.length; x++)
    {
        alarme_slice = alarmes[x].split(';');
        heure = alarme_slice[0];
        minute = alarme_slice[1];
        name = alarme_slice[2];
        id2 = alarme_slice[3];

        if(id === id2)
        {
            result_id = x;
            if(string === "heur")
            {
                result = this.value + ";" + minute + ";" + name + ";" + id;
            }
            else if (string === "min")
            {
                result = heure + ";" + this.value + ";" + name + ";" + id;
            }
            else
            {
                result = heure + ";" + minute + ";" + this.value + ";" + id;
            }
        }
        alarmes[result_id] = result;
    }
}

function del_alarme()
{
    var row = document.getElementById("row" + this.id);
    var parent = row.parentNode;
    parent.removeChild(row);

    var x=0, alarme_slice, result;

    for (x=0; x<alarmes.length; x++)
    {
        alarme_slice = alarmes[x].split(';');
        if(alarme_slice[3] === this.id)
        {
            result = x;
        }
        alarmes.splice(result, 1);
    }
}

function isAlarme()
{
    var x=0;
    var split_alarme = [];
    var heur, minutes, name, id, active, audio;
    for(x=0; x<alarmes.length; x++)
    {
        split_alarme = alarmes[x].split(";");
        heur = split_alarme[0];
        minutes = split_alarme[1];
        name = split_alarme[2];
        id = split_alarme[3];
        active = document.getElementById("active"+id).checked;
        if(global_minutes.toString() === minutes.toString() && global_heurs.toString() === heur.toString() && active)
        {
            alert(name);
            audio = document.getElementById("audio" + id).options[document.getElementById("audio" + id).selectedIndex].text;
            if(audio === "Alarme 1")
            {
                audio1.play();
            }
            else if(audio === "Alarme 2")
            {
                audio2.play();
            }
            document.getElementById("active" + id).checked = false;
        }
    }
}