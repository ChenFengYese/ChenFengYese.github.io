function getData(uid){
    var Rdata
    $.ajax({
        url: "https://www.lbservice.top/textif/getif",
        type: "post",
        async: false,
        data: {
            "uid": uid,
        },
        success: function (data) {
            Rdata = data
        },
        error: function (e) {
            alert(uid+"请求失败")
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
    month =  month<10?"0"+month:month;
    day = date.getDate()<10?"0"+date.getDate():date.getDate();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    vWeek_s = date.getDay();
    $(".wenzhang_box_content_jieshao_xieti:eq(2)").html(year + "-" + month + "-" + day + " "  + hours + ":" + minutes + ":" + seconds)
    $(".wenzhang_box_content_jieshao_zishu").html("总字数:"+$(".wenzhang_box_article").text().length+"字");
    $(".wenzhang_box_article_shengming_title").html($("#title").text());
    $(".wenzhang_box_article_shengming_link").html(document.location.href.split("?")[0].split("noteAdd")[0]+"noteView.html?"+"uid="+document.location.href.split("?")[1]+"&suid="+base64($(".wenzhang_box_content_jieshao_xieti:eq(0)").html()));
}
// Add note
function addNoteInfo(uid) {
    if($("#title").text() !== '' && $(".wenzhang_box_article").text() !== '')
    {
        $.ajax({
            url: "https://www.lbservice.top/textif/addif",
            type: "post",
            dataType: "json",
            data: {
                "uid": uid,
                // "suid": $(".wenzhang_box_content_jieshao_xieti:eq(0)").html(),
                "time": $(".wenzhang_box_content_jieshao_xieti:eq(2)").html(),
                "title": $("#title").text(),
                "text": $(".wenzhang_box_article").text()
            },
            success: function (data) {
                alert("添加成功");
                setTimeout(function () {
                    window.location.href = "NotBook.html?"+(window.location.href).split('?')[1];
                }, 1000);
            },
            error: function () {
                console.log("服务器异常");
            }
        });
    }
    else {
        alert("标题或内容不能为空");
    }
}
try{
    var id = (window.location.href).split('?')[1];
    const key = parseInt(id.split("%")[1].split("").reverse().join(""))
    id = id.split("%")[0]
    id = unbase64(id)
    uid = id
    console.log(uid)
    setInterval("time()", 1000);
    data = getData(uid);
    const noteInfo = data;
    $(".indexHref").attr("href","NotBook.html?"+base64(uid))
    $(".wenzhang_box_content_jieshao_zuozhe").html("作者:"+uid);
    $(".wenzhang_box_content_jieshao_xieti:eq(1)").html((Math.random()*10).toFixed(2));
    $(".lsuidHref:eq(0)").attr("href","NotBook.html?"+base64(uid));

    if (JSON.stringify(data) !== '{}') {
        var note = 0;
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].suid)
            note = data[i].suid>note?data[i].suid:note;
        }
        console.log(note)
        const suid = note+1;
        console.log(suid)
        $(".wenzhang_box_content_jieshao_xieti:eq(0)").html(suid);
        $(".lsuidHref:eq(1)").attr("href","javascript:addNoteInfo('"+uid+"')");
    } else {
        console.log("error:"+data);
    }
}
catch (e) {
    console.log(e);
    alert("你尚未登陆,请重新登录")
    window.location.href = "index.html";
}