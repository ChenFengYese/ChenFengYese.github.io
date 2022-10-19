let slickInitDone = false;
let longpress = false;
let previousImageId = 0,
    currentImageId = 0;
let opa = 1;
let pageAlign = "right";
let bgCycle;
let links;
let eachNavLink;
const imageopacity = document.getElementsByClassName("cycle-bg-image");
const keliopacity = document.getElementById("keliimage");

var listenMenuTree = {"value": 1};

window.onload = function() {
    $("body").addClass("loaded");
};
//onresize属性可以用来获取或设置当前窗口的resize事件的事件处理函数
//onresize事件会在窗口或框架被调整大小时发生
window.onresize = function() {
    changeFrameHeight();
}
function changeFrameHeight() {
    var iframe = document.getElementById("iframe");
    iframe.height = document.documentElement.clientHeight;
}
function navLinkClick(e) {
    if ($(e.target).hasClass("external")) {
        return;
    }

    e.preventDefault();

    if ($(e.target).data("align")) {
        pageAlign = $(e.target).data("align");
    }
    // Change bg image
    previousImageId = currentImageId;
    currentImageId = $(e.target).data("linkid");
    bgCycle.cycleToNextImage(previousImageId, currentImageId);

    // Change menu item highlight
    $(`.tm-nav-item:eq(${previousImageId})`).removeClass("active");
    $(`.tm-nav-item:eq(${currentImageId})`).addClass("active");

    // Change page content
    $(`.tm-section-${previousImageId}`).fadeOut(function(e) {
        $(`.tm-section-${currentImageId}`).fadeIn();
        // Gallery
        if (currentImageId === 2) {
            setupSlider();
        }
    });

    adjustFooter();
}


function common_background(){
    bgCycle = $("body").backgroundCycle({
        imageUrls: [
            "https://pic1.zhimg.com/v2-5d268ec9229b1f1c19536ae0396f4ab4_r.jpg",
            "https://pic4.zhimg.com/v2-1fdb97b222569d22e96dea5abc23d9d7_r.jpg",
            "images//559563.jpg",
            "https://tse1-mm.cn.bing.net/th/id/R-C.f9c462dd6365a3dd02955291f5309e40?rik=z8J70gZRKiJRew&riu=http%3a%2f%2fi1.hdslb.com%2fbfs%2farchive%2fab692f8ffdf6408fb4c19eee684b38f689056580.jpg&ehk=%2fks58fj%2f4R8xzgIqCQayk7TG4c38xCl1R%2fTdNHN1JaU%3d&risl=&pid=ImgRaw&r=0"
            //  "https://pic3.zhimg.com/v2-6a1dc51b6b3efc26b221568894165605_r.jpg",
        ],
        fadeSpeed: 2000,
        duration: -1,
        backgroundSize: SCALING_MODE_COVER
    });
}


function kleecommic(){
        for(let i=0; i<imageopacity.length; i++){imageopacity[i].style.display="none";}
        keliopacity.style.display="block";
        bgCycle = $("body").backgroundCycle({
            imageUrls: [
            ],
            fadeSpeed: 2000,
            duration: -1,
            backgroundSize: SCALING_MODE_COVER
        });
        document.createElement("script").setAttribute("src", "klee.js");
        document.getElementById("dream").innerHTML="梦境的篇章Ⅱ"
        document.getElementById("dream_").innerHTML="梦境的篇章Ⅱ"
        document.getElementsByTagName("h1")[0].style.color="#24d9b2";
        document.getElementsByClassName("tm-navbar-menu")[0].style.color="#26e6abf7"
        document.getElementsByClassName("tm-link m-0")[0].style.color="rgb(35 236 183 / 83%)"
        for(let i=0; i<document.getElementsByTagName("p").length; i++){document.getElementsByTagName("p")[i].style.color="#11f5ba";}
        for(let i=0; i<document.getElementsByTagName("h2").length; i++){document.getElementsByTagName("h2")[i].style.color="#27ffa8";}
        for(let i=0; i<document.getElementsByClassName("tm-nav-link").length; i++){document.getElementsByClassName("tm-nav-link")[i].style.color="rgb(45 238 179 / 75%)";}
        for(let i=0; i<document.getElementsByClassName("tm-link").length; i++){document.getElementsByClassName("tm-link")[i].style.color="rgb(35 236 183 / 83%)";}
        window.onmousewheel = document.onmousewheel = scrollFunc2;
        longpress=true;
}

function dream_picture(){
    keliopacity.style.display="none";
    bgCycle = $("body").backgroundCycle({
        imageUrls: [
            "images//klee.png",
            "images//nahida.png",
            "images//Elysia.png",
            "images//nahida2.jpg",
        ],
        fadeSpeed: 2000,
        duration: -1,
        backgroundSize: SCALING_MODE_COVER
    });
    opa=1;
    for(let i=0; i<imageopacity.length; i++){imageopacity[i].style.opacity=opa;}
    window.onmousewheel = document.onmousewheel = scrollFunc;
    longpress=false;
}

function quick_game(){
    //音游 {}
    //successful:
    ls = document.getElementById("music_ls");
    jg = document.getElementById("quick-game");
    if (jg.innerHTML === "音韵梦云") {
        ls.innerHTML = 0;
    } else if (jg.innerHTML === "旋律回梦") {
        ls.innerHTML = 1;
    } else if (jg.innerHTML === "幻梦与梦"){
        ls.innerHTML = 2
    }
    ifr = document.createElement("iframe");
    ifr.id="ifr";
    ifr.src ="test.html";
    ifr.frameBorder = "0";
    ifr.style="position: absolute; width: 100%; height: 100%; border-radius: 3px;";
    document.getElementById("popupDiv").appendChild(ifr);
    document.getElementById("musictouch").style.display = "block";

}


Object.defineProperty(listenMenuTree, 'value', {
    configurable:true,
    get: function (newVal) {
        // get 和 set 方法
        return this._value;
    },
    set: function (newVal) {
        // 当listenMenuTree 的value值发生改变时，触发set函数的内容
        analyse();
        this._value=newVal;
        console.log('set:'+this._value);
    }
});

function analyse(){
    document.getElementById("popupDiv").removeChild(document.getElementById("ifr"));
    if (document.getElementById("quick-game").innerHTML === "音韵梦云") {
        kleecommic();
        document.getElementById("quick-game").innerHTML = "旋律回梦";
    } else if (document.getElementById("quick-game").innerHTML === "旋律回梦") {
        dream_picture();
        document.getElementById("quick-game").innerHTML = "幻梦与梦"
    } else {
        location.reload();
    }
}

$(document).ready(function() {
    // Set first page
    $(".tm-section").fadeOut(0);
    $(".tm-section-0").fadeIn();

    // Set Background images
    // https://www.jqueryscript.net/slideshow/Simple-jQuery-Background-Image-Slideshow-with-Fade-Transitions-Background-Cycle.html

    common_background();
    eachNavLink = $(".tm-nav-link");
    links = $(".tm-nav-links");

    // "Menu" open/close
    if (links.hasClass("open")) {
        links.fadeIn(0);
    } else {
        links.fadeOut(0);
    }

    $("#tm_about_link").on("click", navLinkClick);
    $("#tm_work_link").on("click", navLinkClick);

    // Each menu item click
    eachNavLink.on("click", navLinkClick);

    $(".tm-navbar-menu").click(function(e) {
        if (links.hasClass("open")) {
            links.fadeOut();
        } else {
            links.fadeIn();
        }

        links.toggleClass("open");
    });

    // window resize
    $(window).resize(function() {
        // If current page is Gallery page, set it up
        if (currentImageId === 2) {
            setupSlider();
        }

        // Adjust footer
        adjustFooter();
    });

    adjustFooter();
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
        a = document.createElement("a");
        a.setAttribute("rel", "nofollow")
        a.setAttribute("class", "tm-nav-link external")
        a.setAttribute("href", "javascript:quick_game()")
        a.setAttribute("id", "quick-game")
        document.getElementById("mobile").appendChild(a);
        document.getElementById("mobile").style.display="block";
        document.getElementById("quick-game").innerHTML="音韵梦云";
    }
}); // DOM is ready
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
    if(document.getElementById("fullscreen").innerHTML==="开启全屏模式"){
        launchFullscreen(document.documentElement);
        document.getElementById("fullscreen").innerHTML="关闭全屏模式";
    }
    else if(document.getElementById("fullscreen").innerHTML==="关闭全屏模式"){
        document.getElementById("fullscreen").innerHTML="开启全屏模式";
        exitFullscreen()
    }
}
function adjustFooter() {
    const windowHeight = $(window).height();
    const topHeight = $(".tm-top-container").height();
    const middleHeight = $(".tm-content").height();
    let contentHeight = topHeight + middleHeight;

    if (pageAlign === "left") {
        contentHeight += $(".tm-bottom-container").height();
    }

    if (contentHeight > windowHeight) {
        $(".tm-bottom-container").addClass("tm-static");
    } else {
        $(".tm-bottom-container").removeClass("tm-static");
    }
}

function setupSlider() {
    let slidesToShow = 4;
    let slidesToScroll = 2;
    let windowWidth = $(window).width();

    if (windowWidth < 480) {
        slidesToShow = 1;
        slidesToScroll = 1;
    } else if (windowWidth < 768) {
        slidesToShow = 2;
        slidesToScroll = 1;
    } else if (windowWidth < 992) {
        slidesToShow = 3;
        slidesToScroll = 2;
    }

    if (slickInitDone) {
        $(".tm-gallery").slick("unslick");
    }

    slickInitDone = true;

    $(".tm-gallery").slick({
        dots: true,
        customPaging: function(slider, i) {
            var thumb = $(slider.$slides[i]).data();
            return `<a>${i + 1}</a>`;
        },
        infinite: true,
        prevArrow: false,
        nextArrow: false,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll
    });

    // Open big image when a gallery image is clicked.
    // $(".slick-list").magnificPopup({
    //   delegate: "a",
    //   type: "image",
    //   gallery: {
    //     enabled: true
    //   }
    // });
}
function JudgePC(url) {
    if (/(Android)/i.test(navigator.userAgent)) {
        document.getElementById("pc").value = "nopc";
        window.open(url);
    }else{
        document.getElementById("pc").value = "ispc";
        window.open(url);
    }
}
//锁定滑轮
function scrollFunc2(){return false;}
//滑轮事件
const scrollFunc = function (e) {
    e = e || window.event;

    if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta > 0) { //当滑轮向上滚动时
            if (opa>0 && opa<0.7){
                opa += 0.02;
                for(let i=0; i<imageopacity.length; i++){imageopacity[i].style.opacity=opa+0.3;}
            }
        }
        if (e.wheelDelta < 0) { //当滑轮向下滚动时
            if (opa > 0) {
                opa -= 0.02;
                for(let i=0; i<imageopacity.length; i++){imageopacity[i].style.opacity=opa+0.3;}
            } else {
                kleecommic();
            }
        }
    }else if (e.detail) {  //Firefox滑轮事件
        if (e.detail > 0) { //当滑轮向上滚动时
            if (opa>0 && opa<0.7){
                opa += 0.02;
                for(let i=0; i<imageopacity.length; i++){imageopacity[i].style.opacity=opa+0.3;}
            }
        }
        if (e.detail < 0) { //当滑轮向下滚动时
            if (opa > 0) {
                opa -= 0.02;
                for(let i=0; i<imageopacity.length; i++){imageopacity[i].style.opacity=opa+0.3;}
            } else {
                kleecommic();
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
    if(longpress){
        timeStart=getTimeNow();//获取鼠标按下时的时间
        time=setInterval(function()//setInterval会每100毫秒执行一次
        {
            timeEnd=getTimeNow();//也就是每100毫秒获取一次时间
            if (timeEnd - timeStart > 1000)//如果此时检测到的时间与第一次获取的时间差有1000毫秒
            {
                clearInterval(time);//便不再继续重复此函数 （clearInterval取消周期性执行）
                dream_picture();
            }
        },100);
    }
}
function holdUp()
{
    clearInterval(time);//如果按下时间不到1000毫秒便弹起，
}


//给页面绑定滑轮滚动事件
if (document.addEventListener) {//firefox
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
}
window.onmousewheel = document.onmousewheel = scrollFunc;
