
function play() {
    var audio = document.getElementById('music');
    var src = audio.src;
    var str;
    if (audio.paused) {
        audio.play();
        str = src.split('//');
        document.getElementById('musicImg').innerHTML = "正在播放" + str[str.length - 1];
    } else {
        audio.pause();
        audio.currentTime = 0;//音乐从头播放
        document.getElementById('musicImg').innerHTML = "已停止";
    }
}
function select(srcs) {
    const audio = document.getElementById('music');
    audio.src = srcs;
    play();
}

function post() {
    const choice = document.getElementById("choice");
    const index = choice.selectedIndex;
    const value = choice.options[index].value;
    const name = choice.options[index].innerHTML;
    try{
        $.cookie("music_choose_name_selected", "已加载"+ name + ".MP3", { expires: 7, path: '/' });
        $.cookie("music_choose_address_selected", value, { expires: 7, path: '/' });
        alert(value)
        window.opener.document.getElementById("add").innerHTML = "已加载"+ name + ".MP3";
        window.opener.document.getElementById("address").href = value;}
    catch (e) {
        alert("出现错误"+e);
    }
    window.close();
}