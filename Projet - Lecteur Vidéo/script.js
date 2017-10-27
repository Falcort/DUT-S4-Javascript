var video = document.getElementById("video");

window.addEventListener("load", init);
var play = false;
var muted = false;
var started = false;
var mouseDown;

function init()
{

    setTime();

    /* Boutton pour lancer la video */
    document.getElementById("btn_play").addEventListener("click",
        function(event)
        {
            if(play == false)
            {
                document.getElementById("play_btn").innerHTML = "pause";
                video.play();
                play = true;
            }
            else
            {
                document.getElementById("play_btn").innerHTML = "play_arrow";
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
            document.getElementById("volume").innerHTML = document.getElementById("range_sound").value;
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
    document.getElementById("time").innerHTML = "00:" + curent_time + " - " + "00:" +dur_total;

    //document.getElementById("range_video").value = curent_time*10;

    if(curent_time === dur_total)
    {
        document.getElementById("play_btn").innerHTML = "play_arrow";
        play = false;
    }
}

/* Fonction pour le volume */
function setVolume(i)
{
    if(i === 1)
    {
        document.getElementById("volume_icon").innerHTML = "volume_off";
        muted = true;
    }
    else
    {
        if(document.getElementById("range_sound").value >= 75)
        {
            document.getElementById("volume_icon").innerHTML = "volume_up";
        }
        else if(document.getElementById("range_sound").value <= 25)
        {
            document.getElementById("volume_icon").innerHTML = "volume_mute";
        }
        else
        {
            document.getElementById("volume_icon").innerHTML = "volume_down";
        }

        if(document.getElementById("range_sound").value < 1)
        {
            document.getElementById("volume_icon").innerHTML = "volume_off";
            muted = true;
        }
    }
}