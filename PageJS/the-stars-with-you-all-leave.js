let unfullscreen = true;
let isclick = true;
let opa = 0;
let timeStart, timeEnd, time;//申明全局变量
const spanopacity = document.getElementById("color");
const downopacity = document.getElementById("downfull1");
const downopacity2 = document.getElementById("downfull2");
const downopacity3 = document.getElementById("downfull3");
const fullopacity = document.getElementById("full1");
const fullopacity2 = document.getElementById("full2");
const fullopacity3 = document.getElementById("full3");
let domContent = document.querySelector('#hidden');
let content = ["❤听说点击右键可以全屏喔❤","❤X键似乎可以接触什么限制❤", "❤点按各类字体颜色也会改变呀❤","❤要不要来向上滑滑，向下也行喔❤","❤May all the beauty be blessed❤",
    "❤愿世上所有美好都能被祝福❤", "❤薪火相传❤", "❤为世上所有的美好而战❤", "❤美德不灭❤", "❤德丽莎世界第一可爱❤", "❤星与你消失之日❤", "❤你与星远去的时刻❤", "❤命中注定的离别 ❤",
    "❤跨越星空的爱念。❤", "❤无数次轮回换你一次生路。❤", "❤星空变得黯淡。❤", "❤与星星的故事。❤", "❤舰长，深渊结算了喔❤", "❤你说德丽莎可不可爱。❤",
    "❤舰长~我要内个~给我买~。❤", "❤救我…………❤", "❤霞彩换花火,花火知我愿❤", "❤我愿入夜空，夜空自甄明❤", "❤不要放弃❤", "❤醒时恐为梦一场，事事俱忘，何处是吾乡❤",
    "❤星与你消失之日❤", "❤锦筝叹千年，月下渡忘川❤", "❤花与月与海❤", "❤regression❤", "❤浮生如梦❤", "❤白鹭归庭❤", "❤一樽还酹江月❤", "❤一梦千宵❤",
    "❤最后一课❤", "回家的路", "❤乡愁如丝❤", "❤驻足在这星空下❤", "❤爱莉希雅死了❤", "❤朔夜观星❤",
    "❤星陨❤",  "❤所念皆星河❤"
]; //自定义内容的数组


//移动端自行选择
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
    document.getElementById("query3").innerHTML="nopc";
    document.getElementById("color").innerHTML="听说双击屏幕可以全屏诶<br/>或许完全显示出来后，会发生神奇的事情诶";
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
            document.getElementById("v1").src="mp4/观星1.mp4";
            document.getElementById("v1").style="width: 100%;object-fit:fill";
            document.getElementById("query").innerHTML="nopc";

        } else {
            swal("成功！", "已选择图片背景","success");
            document.getElementById("query2").innerHTML="isphoto";
            document.getElementById("v1").src = "";
            document.getElementById("v1").style.display = "none";
            document.body.style =  "background-image:url(img/星与你消失之日.jpg);background-repeat:no-repeat ;background-size:100% 100%;background-attachment: fixed;";
        }
    });
}
else{document.getElementById("v1").src="mp4/观星1.mp4";
    document.getElementById("v1").style="width: 100%;object-fit:fill";}



//全屏
document.oncontextmenu = function(e){
    if(isclick) {
        if (unfullscreen) {
            fullScreen();
            unfullscreen = false;
        } else {
            fullExit();
            unfullscreen = true;
        }
        isclick = false;
    }
    setTimeout(function(){isclick=true;},500);
    return false
};
//移动端全屏
if(document.getElementById("query3").innerHTML==="nopc"){
    document.body.addEventListener('dblclick', function (e) {
        clearTimeout(timeoutID);
        if(isclick) {
            if (unfullscreen) {
                fullScreen();
                unfullscreen = false;
            } else {
                fullExit();
                unfullscreen = true;
            }
            isclick = false;
        }
        setTimeout(function(){isclick=true;},500);
        return false
    });
}
function fullScreen() {
    var element = document.documentElement; //若要全屏页面中div，var element= document.getElementById("divID");
    //IE 10及以下ActiveXObject
    if (window.ActiveXObject) {
        var WsShell = new ActiveXObject('WScript.Shell');
        WsShell.SendKeys('{F11}');
    }
    //HTML W3C 提议
    else if (element.requestFullScreen) {
        element.requestFullScreen();
    }
    //IE11
    else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
    // Webkit (works in Safari5.1 and Chrome 15)
    else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    }
    // Firefox (works in nightly)
    else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    }
}

//退出全屏
function fullExit() {
    var element = document.documentElement; //若要全屏页面中div，var element= document.getElementById("divID");
    //IE ActiveXObject
    if (window.ActiveXObject) {
        var WsShell = new ActiveXObject('WScript.Shell');
        WsShell.SendKeys('{F11}');
    }
    //HTML5 W3C 提议
    else if (element.requestFullScreen) {
        document.exitFullscreen();
    }
    //IE 11
    else if (element.msRequestFullscreen) {
        document.msExitFullscreen();
    }
    // Webkit (works in Safari5.1 and Chrome 15)
    else if (element.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
    }
    // Firefox (works in nightly)
    else if (element.mozRequestFullScreen) {
        document.mozCancelFullScreen();
    }
}


//点击出现文字
window.addEventListener('load', function () {
    let body = document.body;
    body.addEventListener('click', function (e) {
        let spancolor = document.getElementsByClassName("color");
        let x = e.pageX;
        let y = e.pageY; //当前坐标
        let randContent = Math.ceil(Math.random() * content.length);
        let text = new Text(x, y, randContent);
        let span = document.createElement('span');
        span.style.cssText = " position: absolute;user-select: none;font-size:20px";
        span.style.color = text.getRandom();
        for(var i = 0; i < spancolor.length; i++) {            spancolor[i].style.color = span.style.color;}
        text.create(span);
        setTimeout(function () {
            text.out(span)
        }, 1900)

    });

    function Text(x, y, rand) {
        this.x = x;
        this.y = y;
        this.rand = rand;
    }
    Text.prototype.create = function (_this) {
        let body = document.body;
        _this.innerHTML = content[this.rand - 1];
        _this.className = 'text';
        _this.style.top = this.y - 20 + 'px';
        _this.style.left = this.x - 50 + 'px';
        _this.style.animation = 'remove 2s';
        body.appendChild(_this);
        let i = 0;
        setInterval(() => {
            _this.style.top = this.y - 20 - i + 'px';
            i++
        }, 10);
    };
    Text.prototype.out = function (_this) {
        _this.remove()
    };
    //设置随机颜色
    Text.prototype.getRandom = function () {
        var r = Math.floor(Math.random()*256);
        var g = Math.floor(Math.random()*256);
        var b = Math.floor(Math.random()*256);
        return '#' + r.toString(16) + g.toString(16) + b.toString(16);

    }
});
//x


//锁定滑轮
function scrollFunc2(){return false;}
// 锁定长按
function longPressAc(e){e.preventDefault();}

//解除锁定
function keyEvent(){
    if(event.keyCode===88)
    {   window.onmousewheel = document.onmousewheel = scrollFunc;}
}
//滑轮事件
const scrollFunc = function (e) {
    e = e || window.event;

    if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
        if(spanopacity.style.opacity===0&&downopacity.style.opacity===0&&fullopacity2.style.opacity===0)
        {document.getElementById("v1").src = 'mp4/观星.mp4';}

        if (e.wheelDelta > 0) { //当滑轮向上滚动时
            if (spanopacity.style.opacity !== 0) {
                downopacity2.style.opacity = 0;
                downopacity.style.opacity = 0;
                downopacity3.style.opacity = 0;
            }
            if (opa < 1) {
                opa = opa > 0 ? opa:0;
                opa += 0.02;
                spanopacity.style.opacity = opa;
            } else {
                if(opa<2){opa += 0.02;
                    fullopacity2.style.opacity = opa-1;
                    fullopacity.style.opacity = opa-1;
                    fullopacity3.style.opacity = opa-1;}
                else if( document.getElementById("v1").src !== 'mp4/德丽莎.mp4')
                {
                    document.getElementById("v1").src = 'mp4/德丽莎.mp4';
                    document.getElementById("music").src = 'mp4/德丽莎.mp3';
                    if(document.getElementById("query").innerHTML === "ispc" )
                    {document.getElementById("v1").style.bottom = '-26%';}
                    else{document.getElementById("v1").style.bottom = '0';}
                    spanopacity.style.opacity = 0;
                    window.onmousewheel = document.onmousewheel = scrollFunc2;
                }
            }
        }
        if (e.wheelDelta < 0) { //当滑轮向下滚动时
            if (fullopacity2.style.opacity * 10 > 0) {
                fullopacity2.style.opacity = 0;
                fullopacity.style.opacity = 0;
                fullopacity3.style.opacity = 0;
            }

            if (opa > 0) {
                opa -= 0.02;
                if(spanopacity.style.opacity>0)
                    spanopacity.style.opacity = opa;
                else if(opa<= 1)
                    spanopacity.style.opacity = opa;

            } else {
                opa -= 0.02;
                if (opa > -1) {
                    downopacity2.style.opacity = -opa;
                    downopacity.style.opacity = -opa;
                    downopacity3.style.opacity = -opa;
                }
                else {
                    if(document.getElementById("v1").src !== 'mp4/观星2.mp4')
                    {document.getElementById("v1").src = 'mp4/观星2.mp4';
                        document.getElementById("v1").style.bottom = '0';
                        window.onmousewheel = document.onmousewheel = scrollFunc2;
                    }
                    else{return false;}
                }
            }
        }
    } else if (e.detail) {  //Firefox滑轮事件
        if (e.detail > 0) { //当滑轮向上滚动时
            if (spanopacity.style.opacity !== 0) {
                downopacity2.style.opacity = 0;
                downopacity.style.opacity = 0;
                downopacity3.style.opacity = 0;
            }
            if (opa < 1) {
                opa = opa > 0 ? opa:0;
                opa += 0.02;
                spanopacity.style.opacity = opa;
            } else {
                if(opa<2){opa += 0.02;
                    fullopacity2.style.opacity = opa-1;
                    fullopacity.style.opacity = opa-1;
                    fullopacity3.style.opacity = opa-1;}
                else if( document.getElementById("v1").src !== 'mp4/德丽莎.mp4')
                {document.getElementById("v1").src = 'mp4/德丽莎.mp4';
                    document.getElementById("music").src = 'mp4/德丽莎.mp3';
                    document.getElementById("v1").style.bottom = '-26%';
                    spanopacity.style.opacity = 0;
                    window.onmousewheel = document.onmousewheel = scrollFunc2;
                }
            }
        }
        if (e.detail < 0) { //当滑轮向下滚动时
            if (fullopacity2.style.opacity * 10 > 0) {
                fullopacity2.style.opacity = 0;
                fullopacity.style.opacity = 0;
                fullopacity3.style.opacity = 0;
            }

            if (opa > 0) {
                opa -= 0.02;
                if(spanopacity.style.opacity>0)
                    spanopacity.style.opacity = opa;
                else if(opa<= 1)
                    spanopacity.style.opacity = opa;

            } else {
                opa -= 0.02;
                if (opa > -1) {
                    downopacity2.style.opacity = -opa;
                    downopacity.style.opacity = -opa;
                    downopacity3.style.opacity = -opa;
                } else {
                    if(document.getElementById("v1").src !== 'mp4/观星2.mp4')
                    {document.getElementById("v1").src = 'mp4/观星2.mp4';
                        document.getElementById("v1").style.bottom = '0';
                        window.onmousewheel = document.onmousewheel = scrollFunc2;
                    }
                    else{return false;}
                }
            }
        }
    }
};


//鼠标长按事件
function getTimeNow()//获取此刻时间
{
    var now=new Date();
    return now.getTime();
}
function holdDown()//鼠标按下时触发
{
    timeStart=getTimeNow();//获取鼠标按下时的时间
    time=setInterval(function()//setInterval会每100毫秒执行一次
    {
        timeEnd=getTimeNow();//也就是每100毫秒获取一次时间
        let v1;
        let v2;
        if (timeEnd - timeStart > 1000)//如果此时检测到的时间与第一次获取的时间差有1000毫秒
        {
            clearInterval(time);//便不再继续重复此函数 （clearInterval取消周期性执行）
            opa = 0;
            document.getElementById("color").style.opacity = "0";
            document.getElementById("downfull1").style.opacity = "0";
            document.getElementById("downfull2").style.opacity = "0";
            document.getElementById("downfull3").style.opacity = "0";
            document.getElementById("full1").style.opacity = "0";
            document.getElementById("full2").style.opacity = "0";
            document.getElementById("full3").style.opacity = "0";
            v1 = document.getElementById("v1").src;
            v2 = document.getElementById("music").src;
            if (v1.slice(v1.lastIndexOf("/")+1, ) !== '%E8%A7%82%E6%98%9F1.mp4') {
                document.getElementById("v1").src = 'mp4/观星1.mp4';
            }
            if (v2.slice(v1.lastIndexOf("/")+1, ) !== '%E8%A7%82%E6%98%9F.mp3') {
                document.getElementById("music").src = 'mp4/观星.mp3';
            }
            document.getElementById("v1").style.bottom = '0';
            window.onmousewheel = document.onmousewheel = scrollFunc;
        }
    },100);
}
function holdUp()
{
    clearInterval(time);//如果按下时间不到1000毫秒便弹起，
}



//移动端触碰事件
//下滑
function handleUp() {
    if (fullopacity2.style.opacity * 10 > 0) {
        fullopacity2.style.opacity = 0;
        fullopacity.style.opacity = 0;
        fullopacity3.style.opacity = 0;
    }

    if (opa > 0) {
        opa -= 0.1;
        if(spanopacity.style.opacity>0)
            spanopacity.style.opacity = opa;
        else if(opa<= 1)
            spanopacity.style.opacity = opa;

    } else {
        opa -= 0.1;
        if (opa > -1) {
            downopacity2.style.opacity = -opa;
            downopacity.style.opacity = -opa;
            downopacity3.style.opacity = -opa;
        } else if(document.getElementById("query2").innerHTML === "isphoto" )
        {
            document.body.style =  "background-image:url(img/观星02.jpg);background-repeat:no-repeat ;background-size:100% 100%;background-attachment: fixed;";}
        else {
            if(document.getElementById("v1").src !== 'mp4/观星2.mp4')
            {document.getElementById("v1").src = 'mp4/观星2.mp4';
                document.getElementById("v1").style.bottom = '0';
                window.onmousewheel = document.onmousewheel = scrollFunc2;
                spanopacity.style.opacity = 0;
            }
            else{return false;}

        }
    }
}
//上滑
function handleDown() {
    if (spanopacity.style.opacity !== 0) {
        downopacity2.style.opacity = 0;
        downopacity.style.opacity = 0;
        downopacity3.style.opacity = 0;
    }
    if (opa < 1) {
        opa = opa > 0 ? opa:0;
        opa += 0.1;
        spanopacity.style.opacity = opa;
    } else {
        if(opa<2){opa += 0.1;
            fullopacity2.style.opacity = opa-1;
            fullopacity.style.opacity = opa-1;
            fullopacity3.style.opacity = opa-1;}
        else if(document.getElementById("query2").innerHTML === "isphoto" )
        {
            spanopacity.style.opacity = 0;
            document.body.style =  "background-image:url(img/观星01.jpg);background-repeat:no-repeat ;background-size:100% 100%;background-attachment: fixed;";}
        else if( document.getElementById("v1").src !== 'mp4/德丽莎.mp4')
        {
            document.getElementById("v1").src = 'mp4/德丽莎.mp4';
            document.getElementById("music").src = 'mp4/德丽莎.mp3';
            if(document.getElementById("query").innerHTML === "ispc" )
            {document.getElementById("v1").style.bottom = '-26%';}
            else{document.getElementById("v1").style.bottom = '0';}
            spanopacity.style.opacity = 0;
            window.onmousewheel = document.onmousewheel = scrollFunc2;
        }}
}
//长按
function handleLong() {
    opa = 0;
    document.getElementById("color").style.opacity = "0";
    document.getElementById("downfull1").style.opacity = "0";
    document.getElementById("downfull2").style.opacity = "0";
    document.getElementById("downfull3").style.opacity = "0";
    document.getElementById("full1").style.opacity = "0";
    document.getElementById("full2").style.opacity = "0";
    document.getElementById("full3").style.opacity = "0";
    const v1 = document.getElementById("v1").src;
    const v2 = document.getElementById("music").src;
    const v3 = document.body.style.backgroundImage;
    if(document.getElementById("query2").innerHTML === "nophoto")
    {
        if (v1.slice(v1.lastIndexOf("/")+1, ) !== '%E8%A7%82%E6%98%9F1.mp4') {
            document.getElementById("v1").src = 'mp4/观星1.mp4';
        }
    }
    else{ if (v3.slice(v3.lastIndexOf("/")+1, ) !== '星与你消失之日.jpg') {document.body.style =  "background-image:url(img/星与你消失之日.jpg);background-repeat:no-repeat ;background-size:100% 100%;background-attachment: fixed;";}}
    if (v2.slice(v1.lastIndexOf("/")+1, ) !== '%E8%A7%82%E6%98%9F.mp3') {
        document.getElementById("music").src = 'mp4/观星.mp3';
    }
    document.getElementById("v1").style.bottom = '0';
    window.onmousewheel = document.onmousewheel = scrollFunc;
}


//给页面绑定滑轮滚动事件
if (document.addEventListener) {//firefox
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
}
//按键事件绑定
document.onkeydown = keyEvent;
//滚动滑轮触发scrollFunc方法  //ie 谷歌
window.onmousewheel = document.onmousewheel = scrollFunc;
//禁用浏览器自带长按效果
if(document.getElementById("query3").innerHTML==="nopc"){
    EventUtil.bindEvent(domContent, 'contextmenu',longPressAc);}
//上滑事件
EventUtil.bindEvent(domContent, 'slideup', handleUp);
//下滑事件
EventUtil.bindEvent(domContent, 'slidedown', handleDown);
//长按点击事件
EventUtil.bindEvent(domContent, 'longpress', handleLong);
