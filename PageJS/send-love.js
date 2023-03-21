// 获取textarea
const textarea = document.getElementById('text')
// 监听内容变化
textarea.addEventListener('input', function(e) {
    const scrollHeight = textarea.scrollHeight
    // 获取textarea的上下边框的高度
    // 由于textarea的边框可能有别的地方定义了更高级别的样式
    // 使用getComputedStyle 读取的样式是最终样式，包括了内联样式、嵌入样式和外部样式
    // document.defaultView.getComputedStyle(element[,pseudo-element]);
    // 或者
    // window.getComputedStyle(element[,pseudo-element]);
    const s = getComputedStyle(textarea)

    const borderTop = parseInt(s.borderTopWidth)
    const borderBottom = parseInt(s.borderBottomWidth)
    const height = scrollHeight + borderTop + borderBottom
    textarea.style.height = height + 'px'
})
if($.cookie("text_value_send_love")!==undefined){
    document.getElementById('text').value=$.cookie("text_value_send_love");
    document.getElementById('show').innerHTML = "已为您保存上次输入的内容(7天内有效)";
}
function IsPC(){
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}
if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
    swal({
        title: "选择背景样式",
        text: "因移动端各浏览器情况不同，请自行选择动态视频背景或者图片背景，若出现问题可刷新网页重新选择",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "动态视频背景",
        cancelButtonText: "图片背景",
        closeOnConfirm: false,
        closeOnCancel: false
    }).then((isConfirm) => {
        if (isConfirm.value) {
            swal("成功！", "已选择动态视频背景","success");
            document.getElementById("v1").src="mp4/01.mp4";
            document.getElementById("v1").style="width: 100%;object-fit:fill";

        } else {
            swal("成功！", "已选择图片背景","success");
            document.getElementById("v1").src = "";
            document.getElementById("v1").style.display = "none";
            document.body.style =  "background-image:url(img/sendlove.jpg);background-repeat:no-repeat ;background-size:100% 100%;background-attachment: fixed;";
        }
    });

}else{
    document.getElementById("v1").src="mp4/01.mp4";
    document.getElementById("v1").style="width: 100%;object-fit:fill";
}
function listen() {
    // if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
    //     swal({
    //         title: '加载失败',
    //         text: "当前移动端浏览器无法进行自定义设计，将为您跳转到默认样式链接，我们为您的糟糕体验感到很抱歉，在未来我们将不断进行优化以满足用户更多需求，感谢你的支持。",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: '跳转至默认链接'
    //     }).then((result) => {
    //         window.open('%E6%99%A8%E6%98%9F%E6%96%B0%E7%BD%91%E7%AB%99.html')
    //     });
    // }else{
        var value = document.getElementById('text').value;
        str_array = [];
        str_array = value.split(/[(\r\n)\r\n]+/);
        let i;
        for (i = 0; i < str_array.length; i++) {
            if (str_array[i] === "") {
                str_array.splice(i, 1);//去掉值为空的数组
                i = i - 1;
            }
        }
        console.log(str_array)
        if(str_array.length>23) {
            document.getElementById('show').innerHTML = "方框内不可输入超过23行的字符";
        }
        else if(str_array.length<=1){
            document.getElementById('show').innerHTML = "你尚未输入任何字符或仅输入一行字符";
        }
        else{
            $.cookie("text_value_send_love", value, { expires: 7, path: '/' });
            $.cookie('str_array_get_love', str_array, { expires: 7, path: '/' });

            window.open('getlove.html');
        }
    // }
}
function launchFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function confirmFull(){
    if(document.getElementById("fullscreen").value==="开启全屏"){
        launchFullscreen(document.documentElement);
        document.getElementById("fullscreen").value="关闭全屏";
    }
    else if(document.getElementById("fullscreen").value==="关闭全屏"){
        document.getElementById("fullscreen").value="开启全屏";
        exitFullscreen()
    }
}
