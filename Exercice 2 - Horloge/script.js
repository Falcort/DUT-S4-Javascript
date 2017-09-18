var time = new Date();
var heurs = time.getHours();
var minutes = time.getMinutes();
var secondes = time.getSeconds();
//document.getElementById("time").textContent = time;
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

            if(minutes < 10)
            {
                minutes = "0" + minutes;
            }

            if(secondes < 10)
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


function add_Alarme() {
    
}