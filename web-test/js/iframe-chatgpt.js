var myDropdown = document.getElementById("myDropdown");
var myIframe = document.getElementById("myIframe");
var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
myIframe.addEventListener('load', function() {
    hideLoading();
});
myIframe.addEventListener('readystatechange', function() {
    if (this.readyState == 'interactive') {
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