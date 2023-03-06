

<!-- Disable the right mouse button -->
document.oncontextmenu = function(){
    return false;
}

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
    var username = document.getElementById("usernameUp").value;
    var password = document.getElementById("passwordUp").value;
    var data = "username="+username+"&password="+password;
    var xhr = new XMLHttpRequest();
    xhr.open("POST","signup",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var result = xhr.responseText;
            if(result == "success"){
                alert("Sign up success!");
            }else{
                alert("Sign up failed!");
            }
        }
    }
    xhr.send(data);
}
<!-- Use ajax to implement the login function -->
function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username+' '+password);
    $.ajax({
        // 设置ajax的参数
        // 请求数据的url地址：接口地址
        url: 'https://www.lbservice.top/wxse/login',
        // 请求数据方式：get  post
        type: 'post',
        // data:发送给接口的数据
        data:{"id":username,"password":password},
        // 请求成功之后要执行的回调函数
        success: function (dat) {
            //dat:服务端返回的数据
            console.log(dat)
            $.ajax({
                // 设置ajax的参数
                // 请求数据的url地址：接口地址
                url: 'https://www.lbservice.top/secure/getUserInfo',
                // 请求数据方式：get  post
                type: 'post',
                headers: {
                    'Authorization': dat
                },
                success: function (dat) {
                    //dat:服务端返回的数据
                    console.log("data "+dat)
                    console.log(dat.split(',')[0].split('=')[1])
                    let id;
                    id = dat.split(',')[0].split('=')[1]
                    id = base64(id)
                    // // Store the id returned by the server in the cookie
                    document.location.href = "NotBook.html?" + id;
                },
                // 请求失败
                error: function (e) {
                    alert('请求失败')
                }
            })
        },
        // 请求失败
        error: function (e) {
            console.log(e)
            alert('请求失败')
        }
    })

}
//
// <!--Implementation login method-->
// function login(){
//     var username = document.getElementById("username").value;
//     var password = document.getElementById("password").value;
//     console.log(username+' '+password);
//     var data = "id="+username+"&password="+password;
//     var xhr = new XMLHttpRequest();
//     xhr.open("post","https://www.lbservice.top/wxse/login",true);
//     xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//     xhr.onreadystatechange = function(){
//         console.log("==========responseText:"+xhr.responseText)
//
//         if(xhr.readyState == 4 && xhr.status == 200){
//             var result = xhr.responseText;
//             if(result !== "login failure"){
//                 var xhrr = new XMLHttpRequest();
//                 xhrr.open("post","https://www.lbservice.top/secure/getUserInfo",true);
//                 xhrr.setRequestHeader("Authorization",result);
//                 xhrr.onreadystatechange = function(){
//                     if(xhrr.readyState == 4 && xhrr.status == 200){
//                         var result = xhr.responseText;
//                         console.log(result);
//                         if(result !== ""){
//                             alert("Login success!");
//                         }else{
//                             alert("Login failed!");
//                         }
//                     }
//                     else if(xhrr.readyState == 4 && xhrr.status == 404){
//                         alert("404");
//                     }
//                     else if(xhrr.readyState == 4 && xhrr.status == 500){
//                         alert("500");
//                     }
//                     else if(xhrr.readyState == 4 && xhrr.status == 403){
//                         alert("403");
//                     }
//                     else if(xhrr.readyState == 4 && xhrr.status == 400){
//                         alert("400");
//                     }
//                     else if(xhrr.readyState == 4 && xhrr.status == 401){
//                         alert("401");
//                     }
//                 }
//                 xhrr.send(result.data);
//             }else{
//                 alert("Login failed!");
//             }
//         }
//         else if(xhr.readyState == 4 && xhr.status == 404){
//             alert("404");
//         }
//         else if(xhr.readyState == 4 && xhr.status == 500){
//             alert("500");
//         }
//         else if(xhr.readyState == 4 && xhr.status == 403){
//             alert("403");
//         }
//         else if(xhr.readyState == 4 && xhr.status == 400){
//             alert("400");
//         }
//         else if(xhr.readyState == 4 && xhr.status == 401){
//             alert("401");
//         }
//     }
//     xhr.send(data);
// }
<!-- Monitor whether the account password is empty in real time. If yes, set the login and registration button as forbidden to click -->
function check(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var usernameUp = document.getElementById("usernameUp").value;
    var passwordUp = document.getElementById("passwordUp").value;
    if(username == "" || password == ""){
        document.getElementById("submit").disabled = true;
        document.getElementsByTagName("submit").style.backgroundColor = "#ccc";
    }else{
        document.getElementsByTagName("submit").disabled = false;
        document.getElementsByTagName("submit").style.backgroundColor = "#fb2525";
    }
    if(usernameUp == "" || passwordUp == ""){
        document.getElementsByTagName("submitUp").disabled = true;
        document.getElementsByTagName("submitUp").style.backgroundColor = "#ccc";
    }else{
        document.getElementsByTagName("submitUp").disabled = false;
        document.getElementsByTagName("submitUp").style.backgroundColor = "#fb2525";
    }
}
<!-- Monitor the input box in real time, and call the check method to check whether the account password is empty -->
document.getElementById("username").addEventListener("input",check);
document.getElementById("password").addEventListener("input",check);
document.getElementById("usernameUp").addEventListener("input",check);
document.getElementById("passwordUp").addEventListener("input",check);





