function getData(uid,suid){
    var Rdata
    $.ajax({
        url: "https://www.lbservice.top/textif/getif_s",
        type: "post",
        async: false,
        data: {
            "uid": uid,
            "suid": suid
        },
        success: function (data) {
            Rdata = data
        },
        error: function (e) {
            alert(uid+suid+"请求失败")
            console.log(e)
        }
    });
    return Rdata
}
function time() {
    var vWeek, vWeek_s, vDay;
    vWeek = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var date =  new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate()<10?"0"+date.getDate():date.getDate();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    vWeek_s = date.getDay();
    $(".wenzhang_box_content_jieshao_xieti:eq(2)").html(year + "-" + month + "-" + day + "-"  + hours + ":" + minutes + ":" + seconds)
}
function updateNoteInfo(uid,suid) {
    $.ajax({
        url: "https://www.lbservice.top/textif/alterif",
        type: "post",
        dataType: "json",
        data: {
            "title": $("#title").text(),
            "text": $(".wenzhang_box_article").text(),
            "uid": uid,
            "suid": suid,
            "time": $(".wenzhang_box_content_jieshao_xieti:eq(2)").html()
        },
        success: function (data) {
            if (data !=='') {
                alert("修改成功");
                setTimeout(function () {
                    window.location.href = "noteView.html?uid=" + base64(uid) + "&suid=" + base64(suid.toString()) ;
                }, 1000);
            } else {
                console.log("修改失败");
                console.log(data);
            }
        },
        error: function () {
            alert("服务器异常");
        }
    });
}
try{
    let uid = (window.location.href).split('?')[1].split("&")[0].split("=")[1];
    uid = uid.split("%")[0]
    uid = unbase64(uid)

    let suid = (window.location.href).split('?')[1].split("&")[1].split("=")[1];
    suid = suid.split("%")[0]
    suid = parseInt(unbase64(suid))


    $(".indexHref").attr("href","NotBook.html?"+base64(uid))
    $(".addHref").attr("href","noteAdd.html?"+base64(uid))
    console.log(uid,suid)
    setInterval("time()", 1000);
    data = getData(uid,suid);
    const noteInfo = data;

    if (data !== '') {
        $("#title").text(noteInfo[0].title);
        $(".wenzhang_box_article").text(noteInfo[0].text);
        $(".wenzhang_box_article_shengming_title").html(noteInfo[0].title);
        $(".wenzhang_box_article_shengming_link").html(window.location.href);
        $(".wenzhang_box_content_jieshao_zishu").html("总字数:"+noteInfo[0].text.length+"字");
        $(".wenzhang_box_content_jieshao_zuozhe").html("作者:"+noteInfo[0].uid);
        $(".wenzhang_box_content_jieshao_time").html("更新时间:"+noteInfo[0].time);
        $(".wenzhang_box_content_jieshao_xieti:eq(0)").html(noteInfo[0].suid);
        $(".wenzhang_box_content_jieshao_xieti:eq(1)").html((Math.random()*10).toFixed(2));
        $(".lsuidHref:eq(0)").attr("href","NotBook.html?"+base64(noteInfo[0].uid));
        $(".lsuidHref:eq(1)").attr("href","javascript:updateNoteInfo('"+noteInfo[0].uid+"','"+noteInfo[0].suid+"')");
    } else {
        console.log("error:"+data);
    }
}
catch (e) {
    console.log(e);
    alert("你尚未登陆,请重新登录")
    window.location.href = "index.html";
}
