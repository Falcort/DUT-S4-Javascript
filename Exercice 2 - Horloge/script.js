var time = new Date();
var heurs = time.getHours();
var minutes = time.getMinutes();
var secondes = time.getSeconds();
//document.getElementById("time").textContent = time;
document.getElementById("time").textContent = heurs + ":" + minutes + ":" + secondes;

