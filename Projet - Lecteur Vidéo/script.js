var video = document.getElementById("video");

window.addEventListener("load", init);
var play = false;

var dur_total;
var curent_time;

function init()
{
    setTime();

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
        });
    document.getElementById("btn_full").addEventListener('click',
        function (event)
        {

        });

    document.getElementById("btn_stop").addEventListener("click",
        function (event)
        {
            video.currentTime = 0;
        });

    document.getElementById("range_sound").addEventListener("input",
        function(event)
        {
            document.getElementById("volume").innerHTML = document.getElementById("range_sound").value;
        });

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
        });

    document.getElementById("range_video").addEventListener("input",
        function (event)
        {
            video.currentTime = document.getElementById("range_video").value/10;
        });

    document.getElementById("video").addEventListener("timeupdate",
        function (event)
        {
            setTime();
        });
}

function setTime()
{
    curent_time = Math.round(video.currentTime);
    dur_total = Math.round(video.duration);

    if(curent_time <= 9)
    {
        curent_time = "0" + curent_time;
    }
    if(dur_total <= 9)
    {
        dur_total = "0" + dur_total;
    }
    document.getElementById("time").innerHTML = "00:" + curent_time + " - " + "00:" +dur_total;

    document.getElementById("range_video").value = curent_time*10;

    if(curent_time === dur_total)
    {
        document.getElementById("play_btn").innerHTML = "play_arrow";
        play = false;
    }
}