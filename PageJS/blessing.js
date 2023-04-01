// function IsPC(){
//   var userAgentInfo = navigator.userAgent;
//   var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
//   var flag = true;
//   for (var v = 0; v < Agents.length; v++) {
//     if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
//   }
//   return flag;
// }
document.getElementById("contact_name").value = $.cookie("contact_name_blessing")!==="undefined"?$.cookie("contact_name_blessing"):"";
document.getElementById("contact_name2").value = $.cookie("contact_name2_blessing")!==="undefined"?$.cookie("contact_name_blessing2"):"";
document.getElementById("contact_message").value = $.cookie("contact_message_blessing")!==="undefined"?$.cookie("contact_message_blessing"):"";
document.getElementById("contact_info").value = $.cookie("contact_info_blessing")!==="undefined"?$.cookie("contact_info_blessing"):"";

document.querySelector('#file').onchange = function (){
    document.getElementById("save").innerHTML = getFileURL(this.files[0]);
    document.getElementById("showfile").innerHTML = "已提交"+this.files[0].name;
};
function getFileURL(file) {
    var getUrl = null;
    if (window.createObjectURL !== undefined) { // basic
        getUrl = window.createObjectURL(file);
    } else if (window.URL !== undefined) { // mozilla(firefox)
        getUrl = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) { // webkit or chrome
        getUrl = window.webkitURL.createObjectURL(file);
    }
    return getUrl;
}
function btn_choice() {
    document.getElementById("file").click();

}
function btn_deleteCookies() {
   $.cookie("contact_name_blessing", null, { expires: 7, path: '/' });
    $.cookie("contact_name2_blessing", null, { expires: 7, path: '/' });
    $.cookie("contact_message_blessing", null, { expires: 7, path: '/' });
    $.cookie("contact_info_blessing", null, { expires: 7, path: '/' });
    $.cookie("music_info_blessing", null, { expires: 7, path: '/' });
    $("#contact_name").val("");
    $("#contact_name2").val("");
    $("#contact_message").val("");
    $("#contact_info").val("");
    $("#save").html("");
    swal("清除成功","已清除所有缓存信息","success");

}
function contact(){
    window.open('https://wpa.qq.com/msgrd?v=3&uin=3107663466&site=qq&menu=yes')
}
function btn() {
    // if (/(Android)/i.test(navigator.userAgent)) {
    //   swal({
    //     title: '加载失败',
    //     text: "当前手机端浏览器无法进行自定义设计，将为您跳转到默认样式链接，我们为您的糟糕体验感到很抱歉，在未来我们将不断进行优化以满足用户更多需求，感谢你的支持。",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: '跳转至默认链接'
    //   }).then((result) => {
    //     window.open('happybirthday.html')
    //   });
    // }
    // else{
    var inf1 = document.getElementById("contact_name").value;
    var inf2 = document.getElementById("contact_name2").value;
    var inf3 = document.getElementById("contact_message").value;
    var inf4 = document.getElementById("contact_info").value;
    var inf5 = document.getElementById("save").innerHTML
    function isnull(val) {
        var str = val.replace(/(^\s*)|(\s*$)/g, '');//去除空格;
        return str === '' || str === undefined || str == null;
    }

    if ((!isnull(inf1)) && (!isnull(inf2))  && (!isnull(inf3)) ) {
        swal("提交成功！","欢迎进行更多尝试","success");
        // document.getElementById("contact_info").value = "";
        $.cookie("contact_name_blessing", inf1, { expires: 7, path: '/' });
        $.cookie("contact_name2_blessing", inf2, { expires: 7, path: '/' });
        $.cookie("contact_message_blessing", inf3, { expires: 7, path: '/' });
        $.cookie("contact_info_blessing", inf4, { expires: 7, path: '/' });
        $.cookie("music_info_blessing", inf5, { expires: 7, path: '/' });
        window.open('happybirth.html');
    }
    else{
        swal("提交失败","当前信息未全部填写或仅填写空格")
    }
    // }
}
function view(){
    if(document.getElementById("moreinfo").style.display !=="block")
    {document.getElementById("moreinfo").style.display ="block";
        document.getElementById("viewinf").innerHTML = "已显示"}
    else{
        document.getElementById("moreinfo").style.display ="none";
        document.getElementById("viewinf").innerHTML = "显示更多"
    }
}
function btn_info(){
    // if (/(Android)/i.test(navigator.userAgent)) {
    //   swal({
    //     title: '加载失败',
    //     text: "当前手机端浏览器无法进行自定义设计，将为您跳转到默认样式链接，我们为您的糟糕体验感到很抱歉，在未来我们将不断进行优化以满足用户更多需求，感谢你的支持。",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: '跳转至默认链接'
    //   }).then((result) => {
    //     window.open('happybirthday.html')
    //   });
    // }
    // else{
    const inf = document.getElementById("contact_info").value;
    const inf2 = document.getElementById("save").innerHTML;

    function isnull(val) {
        var str = val.replace(/(^\s*)|(\s*$)/g, '');//去除空格;
        return str === '' || str === undefined || str == null;
    }
    if (!isnull(inf)){swal("提交成功！","欢迎进行更多尝试","success")
        $.cookie("contact_info_blessing", inf, { expires: 7, path: '/' });
        $.cookie("music_info_blessing", inf2, { expires: 7, path: '/' });
        window.open('happybirth.html');
    }
    else{
        swal("提交失败","当前信息未全部填写或仅填写空格")
    }
    // }
}

var urls = ["images/wallhaven-72kejo.jpg","images/wallhaven-8owjzk.jpg","images/wallhaven-rdxr6j.jpg","images/wallhaven-v9r7dl.png",
    "images/wallhaven-rdxov1.jpg","images/wallhaven-8o12go.jpg"];
var i=1;//表示当前图片所在位置
var time = setTimeout("showImg()", 20000);//启动时钟事件刷新时间 1000==1秒
imgs = document.getElementById("box");
function icon_left(){
    clearTimeout(time);//清楚时钟事件
    if(i<=1){
        i=6;
    }else{
        i=i-2;
    }
    console.info(i);
    showImg()
}
function slideOff() {
    imgs.className="1"; //图片淡出

}
function slideOn() {
    imgs.className="cycle-bg-image"; //图片淡入
}
function icon_right(){
    clearTimeout(time);//清楚时钟事件
    showImg()
}
function showImg() { //让背景图片显示
    slideOff();
    i++;
    if(i === 7) {
        i = 1;
    }
    document.getElementById("box").style.background = "url("+urls[i-1]+") no-repeat center";
    slideOn();
    //通过id获取标签并修改背景样式
    time = setTimeout("showImg()", 20000);//启动时钟事件刷新时间 1000==1秒
}
