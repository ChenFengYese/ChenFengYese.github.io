var myDropdown = document.getElementById("myDropdown");
var myIframe = document.getElementById("myIframe");
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
    if(target===1){
        //swal弹出 因API使用量有限,故设置了访问密码,请联系开发者给与访问密码
        swal({
            title:"联系开发者",
            text:"因API使用量有限,故设置了访问密码,请联系开发者给与访问密码",
            icon:"info",
        });
        myIframe.src = "https://www.nahidelysia.asia/";
    }else {
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
        document.getElementById("mySvg").style.transform = "scale(0.1)";
        document.getElementById("myDiv").style.transform = "translateY(-50%) translateX(-680px)";
        showDropdown()
    } else {
        iframe.style.transform = "translateX(700px)";
        iframe.addEventListener("transitionend", function () {
            iframe.classList.add("hidden");
        }, { once: true });
        document.getElementById("mySvg").style.transform = "scale(0.1) scaleX(-1)";
        document.getElementById("myDiv").style.transform = "translateY(-50%)";
        hideDropdown()
    }
}