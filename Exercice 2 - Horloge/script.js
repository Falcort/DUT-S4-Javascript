var time = new Date();
var heurs = time.getHours();
var minutes = time.getMinutes();
var secondes = time.getSeconds();
//document.getElementById("time").textContent = time;
document.getElementById("time").textContent = heurs + ":" + minutes + ":" + secondes;

window.addEventListener("load", uneSeconde);
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