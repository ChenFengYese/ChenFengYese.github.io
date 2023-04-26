

var myDropdown = document.getElementById("myDropdown");
var myIframe = document.getElementById("myIframe");
var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
myIframe.addEventListener('load', function() {
    hideLoading();
});
myIframe.addEventListener('readystatechange', function() {
    if (this.readyState === 'interactive') {
        showLoading();
    }
});
function showLoading() {
    var loading = document.getElementById('loading');
    loading.style.display = 'block';
}

function hideLoading() {
    var loading = document.getElementById('loading');
    loading.style.display = 'none';
}
function showDropdown() {
    myDropdown.style.display = "block";
}
function iframeLoaded(target) {
    if(target===1&&myIframe.src !== "https://www.nahidelysia.asia/"){
        toggleIframe()
        //swal弹出 因API使用量有限,故设置了访问密码,请联系开发者给与访问密码
        swal({
            title:"联系开发者",
            text:"因API使用量有限,故设置了访问密码,请联系开发者给与访问密码",
            icon:"info",
        }).then((result) => {
            if (result.value) {
                toggleIframe()
                myIframe.src = "https://www.nahidelysia.asia/";
            }
        });
    }else if(target!==1&&myIframe.src!== "https://1fp4u.aichatos.com/#/chat/1681556898217"){
        myIframe.src = "https://1fp4u.aichatos.com/#/chat/1681556898217";
    }
}
function iframeToEdit() {
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Next →',
            showCancelButton: true,
            progressSteps: ['1', '2', '3']
        }).queue([
            {
                title: '请输入你的账号',
                text: '请确定你的账号没有输入错误'
            },
            {
                title: '请输入你的密钥',
                text: '请确定该密钥已与你的账号进行绑定'
            },
            {
                title: '请输入你的新密码',
                text: '请务必记住你的新密码'
            },
        ]).then((result) => {
            if (result.value) {
                var mask = document.getElementById('mask');
                var animation = document.getElementById('loading');
                const answers = result.value
                if(answers[0]===""||answers[1]===""||answers[2]===""){
                    Swal.fire('任何元素都不能为空!')
                }
                else{
                    // 获取遮罩层和动画元素
                    mask.style.display = 'block';
                    animation.style.display = 'block';
                    // 禁用其他页面元素的点击事件
                    document.body.style.pointerEvents = 'none';
                    $.ajax({
                        // 设置ajax的参数
                        // 请求数据的url地址：接口地址
                        url: getURLTest()+'wxse/changePwd',
                        // 请求数据方式：get  post
                        type: 'post',
                        data:{
                            id:answers[0],
                            email:answers[1],
                            password:answers[2],
                        },
                        success: function (dat) {
                            if(dat.success){
                                Swal.fire('修改成功,正在为你登录···')
                                document.body.style.pointerEvents = 'auto';
                                document.getElementById("username").value = answers[0]
                                document.getElementById("password").value = answers[2]
                                login();
                            }

                            else if(dat.error){
                                Swal.fire(dat.error)
                                mask.style.display = 'none';
                                animation.style.display = 'none';
                                document.body.style.pointerEvents = 'auto';
                            }else {
                                console.log(dat)
                                Swal.fire('修改失败')
                                mask.style.display = 'none';
                                animation.style.display = 'none';
                                document.body.style.pointerEvents = 'auto';

                            }
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
                }

            }
        })
}
function hideDropdown() {
    myDropdown.style.transform = "translateY(-50%)";
    myDropdown.style.display = "none";
}
function resizeIframe() {
    var obj = document.getElementById("myIframe");
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}
function toggleIframe() {
    var iframe = document.getElementById("myIframe");
    if (iframe.classList.contains("hidden")) {
        iframe.classList.remove("hidden");
        iframe.style.transform = "translateX(0)";
        if (viewportWidth >= 768) {
            document.getElementById("mySvg").style.transform = "scale(0.1)";
            document.getElementById("myDiv").style.transform = "translateY(-50%) translateX(-40vw)";
        }else {
            document.getElementById("mySvg").style.transform = "scale(0.3)";
            document.getElementById("myDiv").style.transform = "translateY(-50%) translateX(-80vw)";
        }

        showDropdown()
    } else {
        iframe.addEventListener("transitionend", function () {
            iframe.classList.add("hidden");
        }, { once: true });
        if (viewportWidth >= 768) {
            iframe.style.transform = "translateX(40vw)";
            document.getElementById("mySvg").style.transform = "scale(0.1) scaleX(-1)";
        }
        else{
            iframe.style.transform = "translateX(80vw)";
            document.getElementById("mySvg").style.transform = "scale(0.3) scaleX(-1)";
        }
        document.getElementById("myDiv").style.transform = "translateY(-50%)";
        hideDropdown()
    }
}