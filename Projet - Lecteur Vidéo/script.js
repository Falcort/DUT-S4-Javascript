var video = document.getElementById("video");

window.addEventListener("load", init);
var play = false;
var muted = false;
var started = false;
var mouseDown;
var tableau = Array("POUR TABLEAU A 1");
var ITtableau = 1;

function init()
{

    setTime();

    /* Boutton pour lancer la video */
    document.getElementById("btn_play").addEventListener("click",
        function(event)
        {
            if(play == false)
            {
                document.getElementById("play_btn").textContent = "pause";
                video.play();
                play = true;
            }
            else
            {
                document.getElementById("play_btn").textContent = "play_arrow";
                video.pause();
                play = false;
            }
        }
    );

    /* Boutton pour re lancer la video */
    document.getElementById("btn_stop").addEventListener("click",
        function (event)
        {
            video.currentTime = 0;
        }
    );

    /* Ligne (Range) pour le sond */
    document.getElementById("range_sound").addEventListener("input",
        function(event)
        {
            document.getElementById("volume").textContent = document.getElementById("range_sound").value;
            video.volume = document.getElementById("range_sound").value/100;
            setVolume(0);
        }
    );

    /* Boutton de mute du sond */
    document.getElementById("mute").addEventListener("click",
        function (event)
        {
            if(muted === false)
            {
                muted = true;
                setVolume(1);
            }
            else
            {
                muted = false;
                setVolume(0);
            }
        }
    );

    /* Button de fullscreen */
    /* Ce Boutton est plus la pour la déco, car il fait revenir les controls de base */
    document.getElementById("btn_full").addEventListener("click",
        function(event)
        {
            if (video.requestFullscreen)
            {
                video.requestFullscreen();
            }
            else if (video.mozRequestFullScreen)
            {
                video.mozRequestFullScreen();
            }
            else if (video.webkitRequestFullscreen)
            {
                video.webkitRequestFullscreen();
            }
        }
    );

    /* Fonction qui met a jour la durée de la video */
    document.getElementById("video").addEventListener("timeupdate",
        function (event)
        {
            setTime();
        }
    );


    document.getElementById("progress").addEventListener("mousedown",
        function (e)
        {
            mouseDown = true;
        }
    );

    document.getElementById("progress").addEventListener("mouseup",
        function (e)
        {
            mouseDown = false;
        }
    );

    /*document.getElementById("progress").addEventListener("mousemove",
        function (e) {
            if(mouseDown)
            {
                var offset = this.offsetLeft;
                var position = Math.floor((e.pageX - offset)/this.offsetWidth*100+0.5);
                var determinate = document.getElementById("determinate");
                determinate.style.width = position + "%";
                video.currentTime = (position/100)*Math.round(video.duration);
            }
        }
    );*/

    document.getElementById("progress").addEventListener("click",
        function (e)
        {
            var determinate = document.getElementById("determinate");
            var offset = this.offsetLeft;
            var position = Math.floor((e.pageX - offset)/this.offsetWidth*100+0.5);
            determinate.style.width = position + "%";
            video.currentTime = (position/100)*Math.round(video.duration);
        }
    );

    document.getElementById("btn_add").addEventListener("click",
        function (e)
        {
            var table = document.getElementById("tableURL");
            var nbRow = table.getElementsByTagName("tr").length;
            var row = table.insertRow(nbRow);
            row.id=nbRow;
            row.setAttribute("draggable", "true");
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            if(document.getElementById("URL").value === "" || !learnRegExp(document.getElementById("URL").value))
            {
                document.getElementById("URL").style.borderBottom ="2px solid red";
            }
            else
            {
                cell1.textContent = document.getElementById("URL").value;

                cell2.textContent = "<button id=\"button" + nbRow + "\" class=\"waves-effect waves-light btn btn_remove\"><i class=\"material-icons\">clear</i></button>";
                tableau.push(document.getElementById("URL").value);
                document.getElementById("URL").value = "";
                document.getElementById("URL").style.borderBottom = null;
                document.getElementById("button" + nbRow).addEventListener("click", remove);
            }
            row.addEventListener("dragstart",
                function(e)
                {
                    /* Fonction de drag & drop */
                }
            );
        }
    );

    document.getElementById("btn_prev").addEventListener("click",
        function (e)
        {
            if(tableau.length === 1)
            {
                video.setAttribute("src", "video/mov_bbb.mp4");
            }
            else
            {
                video.setAttribute("src", tableau[ITtableau]);
                if((ITtableau - 1)  > 0)
                {
                    ITtableau--;
                }
            }
        }
    );

    document.getElementById("btn_next").addEventListener("click",
        function (e)
        {
            if(tableau.length === 1)
            {
                video.setAttribute("src", "video/mov_bbb.mp4");
            }
            else
            {
                video.setAttribute("src", tableau[ITtableau]);
                if((ITtableau + 1 ) < tableau.length)
                {
                    ITtableau++;
                }
            }

        }
    );
}

/* Fonction de mise en forme du temps et d'affichage */
function setTime()
{
    var dur_total;
    var curent_time;

    curent_time = Math.round(video.currentTime);
    dur_total = Math.round(video.duration);

    var determinate = document.getElementById("determinate");

    var tempsProgress = (curent_time/dur_total)*100;
    determinate.style.width = tempsProgress + "%";

    if(curent_time <= 9)
    {
        curent_time = "0" + curent_time;
    }
    if(dur_total <= 9)
    {
        dur_total = "0" + dur_total;
    }
    document.getElementById("time").textContent = "00:" + curent_time + " - " + "00:" +dur_total;

    //document.getElementById("range_video").value = curent_time*10;

    if(curent_time === dur_total)
    {
        document.getElementById("play_btn").textContent = "play_arrow";
        play = false;
    }
}

/* Fonction pour le volume */
function setVolume(i)
{
    if(i === 1)
    {
        document.getElementById("volume_icon").textContent = "volume_off";
        muted = true;
        video.muted = true;
    }
    else
    {
        if(document.getElementById("range_sound").value >= 75)
        {
            document.getElementById("volume_icon").textContent = "volume_up";
            video.muted = false;
        }
        else if(document.getElementById("range_sound").value <= 25)
        {
            document.getElementById("volume_icon").textContent = "volume_mute";
            video.muted = false;
        }
        else
        {
            document.getElementById("volume_icon").textContent = "volume_down";
            video.muted = false;
        }

        if(document.getElementById("range_sound").value < 1)
        {
            document.getElementById("volume_icon").textContent = "volume_off";
            muted = true;
        }
    }
}

function learnRegExp(s)
{
    var regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(s);
}

function remove()
{
    var id = this.id;
    id = id.replace("button", "");
    var tr = document.getElementById(id);
    var td = tr.cells[0].textContent;
    var index = tableau.indexOf(td);
    if (index >= 1)
    {
        tableau.splice( index, 1 );
    }
    var tr = document.getElementById(id);
    tr.parentNode.removeChild(tr);
}