
<!-- Disable the right mouse button -->
// swal("数据库暂未运行", "服务器正在全力跑其他项目中,该项目原服务器暂时停止运行.可联系开发者开启临时服务器以试用,临时服务器不具备文件上传功能", "error")
document.oncontextmenu = function(){
    return false;
}
var mask = document.getElementById('mask');
var animation = document.getElementById('loading');
var iPicture=1;//表示当前图片所在位置
let imgs = document.getElementById("box");
var timePicture;
var urls = [
    "../../images/wallhaven-72kejo.jpg",
    "../../images/wallhaven-8owjzk.jpg",
    "../../images/wallhaven-rdxr6j.jpg",
    "../../images/wallhaven-v9r7dl.png",
    "../../images/wallhaven-rdxov1.jpg",
    "../../images/wallhaven-8o12go.jpg"
];

function preloadImages(callback) {
    // 显示加载动画
    var loading = document.getElementById('loading-img');
    loading.style.display = 'block';

    var loaded = 0;
    var numImages = urls.length;

    function onImageLoad() {
        loaded++;
        if (loaded === numImages) {
            // 隐藏加载动画
            loading.style.display = 'none';

            callback();
        }
    }

    for (var i = 0; i < numImages; i++) {
        var img = new Image();
        img.onload = onImageLoad;
        img.src = urls[i];
    }
}
function slideOff() {
    imgs.className="1"; //图片淡出

}
function slideOn() {
    imgs.className="cycle-bg-image"; //图片淡入
}
function showImg() { //让背景图片显示
    slideOff();
    iPicture++;
    if(iPicture === 7) {
        iPicture = 1;
    }
    document.getElementById("box").style.background = "url("+urls[iPicture-1]+") no-repeat center";
    slideOn();
    //通过id获取标签并修改背景样式
    timePicture = setTimeout("showImg()", 10000);//启动时钟事件刷新时间 1000==1秒
}
// 在页面加载完成后即开始进行图片预加载
function handlePreloadComplete(){
    document.getElementById("box").style.background = "url('../../images/wallhaven-72kejo.jpg') no-repeat center";
    //服务器遭到恶意攻击,现在进入维护状态中,预计两天内维护完成
    if( $.cookie('EveryBodyKnow')==="" || $.cookie('EveryBodyKnow')===undefined){
        swal("服务器经常被攻击", "服务器经常被攻击且内存较小内容较多,由于是个人运营,因此时不时会导致无法连接的情况,还请谅解,感谢你的使用", "error")
        $.cookie('EveryBodyKnow', "ok", { expires: 7, path: '/',secure:true })
    }

    if( $.cookie('FaceTestAuth')==="" || $.cookie('FaceTestAuth')===undefined){
        //swal确定后在执行后续操作,取消后直接访问
        swal({
            title: "你尚未认证身份",
            text: "为你的安全以及保护你的隐私,请先进行身份认证",
            icon: "error",
            button: "确定",
            cancelButtonText: '下次一定!',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.value) {
                document.location.href = "FaceTest/index.html";
            }else {
                $.cookie('FaceTestAuth', "ok", { expires: 1, path: '/',secure:true })
            }
        });
    }
    timePicture = setTimeout("showImg()", 10000);//启动时钟事件刷新时间 1000==1秒
}

window.addEventListener('load', function() {
    preloadImages(handlePreloadComplete);
});


<!--Implementation of switching to the login page-->
function ChangeTologinPage(){
    document.getElementsByTagName("form")[0].style.display = "block";
    document.getElementsByTagName("form")[1].style.display = "none";
    document.getElementById("ChangeToLoginPage").style.display = "none";
    document.getElementById("ChangeToSignUpPage").style.display = "block";

}
<!--Implementation of switching to the sign-up page-->
function ChangeToSignUpPage(){
    document.getElementsByTagName("form")[0].style.display = "none";
    document.getElementsByTagName("form")[1].style.display = "block";
    document.getElementById("ChangeToSignUpPage").style.display = "none";
    document.getElementById("ChangeToLoginPage").style.display = "block";

}

<!--Implementation signup method-->
function signup(){
    // 获取遮罩层和动画元素
    mask.style.display = 'block';
    animation.style.display = 'block';
    // 禁用其他页面元素的点击事件
    document.body.style.pointerEvents = 'none';
    var username = document.getElementById("usernameUp").value;
    var password = document.getElementById("passwordUp").value;
    $.ajax({
        // 设置ajax的参数
        // 请求数据的url地址：接口地址
        url: getURLTest()+'wxse/register',
        // 请求数据方式：get  post
        type: 'post',
        // data:发送给接口的数据
        data: {"id": username, "password": password},
        headers: {
            'verifyCode': "wwssadadbaba"
        },
        xhrFields: {
            withCredentials: true
        },
        // 请求成功之后要执行的回调函数
        success: function (dat) {
            // 隐藏遮罩层和动画元素
            mask.style.display = 'none';
            animation.style.display = 'none';
            // 恢复其他页面元素的点击事件
            document.body.style.pointerEvents = 'auto';
            //dat:服务端返回的数据

            if(dat.msg === "success")
            {
                swal("Sign up success!");
                document.getElementById("username").value = username
                document.getElementById("password").value = password
                login();
            }
            else if(dat.msg === "verifyCodeIllegal") swal("Sign up failed!");
            else swal("Sign up failed!");
        }
        // 请求失败
        , error: function () {
            // 隐藏遮罩层和动画元素
            mask.style.display = 'none';
            animation.style.display = 'none';
            // 恢复其他页面元素的点击事件
            document.body.style.pointerEvents = 'auto';
            swal('请求失败')
        }
    });
}
<!-- Use ajax to implement the login function -->
function login(){
    // 获取遮罩层和动画元素
    mask.style.display = 'block';
    animation.style.display = 'block';
    // 禁用其他页面元素的点击事件
    document.body.style.pointerEvents = 'none';
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    $.ajax({
        // 设置ajax的参数
        // 请求数据的url地址：接口地址
        url: getURLTest()+'wxse/login',
        // 请求数据方式：get  post
        type: 'post',
        // data:发送给接口的数据
        data:{"id":username,"password":password},
        xhrFields: {
            withCredentials: true
        },
        // 请求成功之后要执行的回调函数
        success: function (dat) {
            //dat:服务端返回的数据


            Token = dat.token
            $.ajax({
                // 设置ajax的参数
                // 请求数据的url地址：接口地址
                url: getURLTest()+'secure/getUserInfo',
                // 请求数据方式：get  post
                type: 'post',
                headers: {
                    'Authorization': Token
                },
                xhrFields: {
                    withCredentials: true
                },
                success: function (dat) {
                    $.cookie('Tokens', Token, { expires: 7, path: '/',secure:true });
                    //dat:服务端返回的数据

                    let id;
                    let base_;
                    id = dat.id
                    id = base64(id)
                    base_ = base64(Math.round(Math.random() * 10000000))
                    sessionStorage.setItem("NoteBookUidInUnique", id);
                    // // Store the id returned by the server in the cookie
                    document.location.href = "NotBook.html?"+base_;
                    // document.location.href = "NotBook.html?" + id;
                },
                // 请求失败
                error: function () {
                    // 隐藏遮罩层和动画元素
                    mask.style.display = 'none';
                    animation.style.display = 'none';
                    // 恢复其他页面元素的点击事件
                    document.body.style.pointerEvents = 'auto';
                    swal('请求失败')
                }
            })
        },
        // 请求失败
        error: function (e) {
            // 隐藏遮罩层和动画元素
            mask.style.display = 'none';
            animation.style.display = 'none';
            // 恢复其他页面元素的点击事件
            document.body.style.pointerEvents = 'auto';

            swal('请求失败')
        }
    })

}
function check(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var usernameUp = document.getElementById("usernameUp").value;
    var passwordUp = document.getElementById("passwordUp").value;
    if(username === "" || password === ""){
        document.getElementById("submit").disabled = true;
        document.getElementById("submit").style.backgroundColor = "#ccc";
    }else{
        document.getElementById("submit").disabled = false;
        document.getElementById("submit").style.backgroundColor = "#fb2525";
    }
    if(usernameUp === "" || passwordUp === ""){
        document.getElementById("submitUp").disabled = true;
        document.getElementById("submitUp").style.backgroundColor = "#ccc";
    }else{
        document.getElementById("submitUp").disabled = false;
        document.getElementById("submitUp").style.backgroundColor = "#fb2525";
    }
}
<!-- Monitor the input box in real time, and call the check method to check whether the account password is empty -->
document.getElementById("username").addEventListener("input",check);
document.getElementById("password").addEventListener("input",check);
document.getElementById("usernameUp").addEventListener("input",check);
document.getElementById("passwordUp").addEventListener("input",check);





