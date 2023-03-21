var offsetX = $("#loveHeart").width() / 2;
var offsetY = $("#loveHeart").height() / 2 - 55;
var together = new Date();
together.setFullYear(2021, 0o6, -32);
together.setHours(0o0);
together.setMinutes(0);
together.setSeconds(0);
together.setMilliseconds(0);
str_array = $.cookie("str_array_get_love").split(",");
for(i = 0; i<str_array.length; i++) {
    if(i<=22){
        document.getElementsByClassName("comments")[i].innerHTML=str_array[i];
        console.log(document.getElementsByClassName("comments")[i].innerHTML)
    }
    if(i>22){
        document.getElementById("pe").innerHTML=str_array[23];
        break;
    }
}

if (!document.createElement('canvas').getContext) {
    var msg = document.createElement("div");
    msg.id = "errorMsg";
    msg.innerHTML = "Your browser doesn't support HTML5!<br/>Recommend use Chrome 14+/IE 9+/Firefox 7+/Safari 4+";
    document.body.appendChild(msg);
    $("#code").css("display", "none")
    $("#copyright").css("position", "absolute");
    $("#copyright").css("bottom", "10px");
    document.execCommand("stop");
} else {
    setTimeout(function () {
        startHeartAnimation();
    }, 3000);

    timeElapse(together);
    setInterval(function () {
        timeElapse(together);
    }, 300);

    adjustCodePosition();
    $("#code").typewriter();
}