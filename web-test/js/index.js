
<!-- Disable the right mouse button -->
// Swal.fire("数据库暂未运行", "服务器正在全力跑其他项目中,该项目原服务器暂时停止运行.可联系开发者开启临时服务器以试用,临时服务器不具备文件上传功能", "error")
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
let container = document.getElementById("nowLoading-text");
let data = "全力加载中······"
let index = 0
let timer = null
function writing() {
    if (index < data.length) {
        // 追加文字
        container.innerHTML += data[index ++]
        // 没错，也可以通过，clearTimeout取消setInterval的执行
        // index === 4 && clearTimeout(timer)
    } else {
        setTimeout("index = 0;",200)
        setTimeout("container.innerHTML = ''", 200)
    }
    // console.log(timer) // 这里会打印出 1 1 1 1 1 ...
}
// 使用 setInterval 时，结束后不要忘记进行 clearInterval
timer = setInterval(writing, 200)

function preloadImages(callback) {
    // 显示加载动画
    var loading = document.getElementById('loading-img');
    loading.style.display = 'flex';

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
    timePicture = setTimeout("showImg()", 15000);//启动时钟事件刷新时间 1000==1秒
}
// 在页面加载完成后即开始进行图片预加载
function handlePreloadComplete(){
    document.getElementById("box").style.background = "url('../../images/wallhaven-72kejo.jpg') no-repeat center";
    //服务器遭到恶意攻击,现在进入维护状态中,预计两天内维护完成
    if( $.cookie('EveryBodyKnow')==="" || $.cookie('EveryBodyKnow')===undefined){
        Swal.fire("服务器经常被攻击", "服务器经常被攻击且内存较小内容较多,由于是个人运营,因此时不时会导致无法连接的情况,还请谅解,感谢你的使用", "error")
        $.cookie('EveryBodyKnow', "ok", { expires: 7, path: '/',secure:true })
    }

    if( $.cookie('FaceTestAuth')==="" || $.cookie('FaceTestAuth')===undefined){
        //Swal.fire确定后在执行后续操作,取消后直接访问
        Swal.fire({
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
    timePicture = setTimeout("showImg()", 15000);//启动时钟事件刷新时间 1000==1秒
}

window.addEventListener('load', function() {
    preloadImages(handlePreloadComplete);
});


<!--Implementation of switching to the login page-->
function ChangeTologinPage(){
    document.getElementById('floating-text').innerText = "现在是登陆页面"
    var floatingText = document.getElementById('floating-text');
    setTimeout(function() {
        floatingText.style.display = 'block';
        setTimeout(function() {
            floatingText.style.display = 'none';
        }, 3000);
    }, 0);
    document.getElementsByTagName("form")[0].style.display = "block";
    document.getElementsByTagName("form")[1].style.display = "none";

}
<!--Implementation of switching to the sign-up page-->
function ChangeToSignUpPage(){
    document.getElementById('floating-text').innerText = "现在是注册页面"
    var floatingText = document.getElementById('floating-text');
    setTimeout(function() {
        floatingText.style.display = 'block';
        setTimeout(function() {
            floatingText.style.display = 'none';
        }, 3000);
    }, 0);
    document.getElementsByTagName("form")[0].style.display = "none";
    document.getElementsByTagName("form")[1].style.display = "block";

}

<!--Implementation signup method-->
function signup(){
    Swal.fire({
        title: '请输入你需要绑定的密钥',
        text: '务必记住你设置的密钥,这是你唯一能够找回密码的途径',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        confirmButtonText: '下一步',
        showLoaderOnConfirm: true,
    }).then((result) => {
        console.log(result.value)
        if (result.isConfirmed) {
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
                data: {"id": username, "password": password,"email":result.value},
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
                        Swal.fire("Sign up success!");
                        document.getElementById("username").value = username
                        document.getElementById("password").value = password
                        login();
                    }
                    else if(dat.msg === "verifyCodeIllegal") Swal.fire("该账号已存在");
                    else Swal.fire("该账号已存在");
                }
                // 请求失败
                , error: function () {
                    // 隐藏遮罩层和动画元素
                    mask.style.display = 'none';
                    animation.style.display = 'none';
                    // 恢复其他页面元素的点击事件
                    document.body.style.pointerEvents = 'auto';
                    Swal.fire('请求失败')
                }
            });
        }
    })
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
        // 请求成功之后要执行的回调函数
        success: function (dat) {
            //dat:服务端返回的数据


            var Token = dat.token
            $.ajax({
                // 设置ajax的参数
                // 请求数据的url地址：接口地址
                url: getURLTest()+'secure/getUserInfo',
                // 请求数据方式：get  post
                type: 'post',
                headers: {
                    'Authorization': Token
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
                    Swal.fire('请求失败')
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

            Swal.fire('请求失败')
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





