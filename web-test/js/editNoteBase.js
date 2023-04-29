function getData(uid,suid){
    var Rdata
    $.ajax({
        url: getURLTest()+"textif/getif_s",
        type: "post",
        async: false,
        headers:{
            Authorization:$.cookie("Tokens")
        },
        data: {
            "uid": uid,
            "suid": suid,
            "GetValueWay":2
        },
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            Rdata = data.details
        },
        error: function (e) {
            swal(uid+suid+"请求失败")
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
    hours =  hours<10?"0"+hours:hours;
    minutes =  minutes<10?"0"+minutes:minutes;
    seconds = seconds<10?"0"+seconds:seconds;
    vWeek_s = date.getDay();
    $(".wenzhang_box_content_jieshao_xieti:eq(2)").html(year + "-" + month + "-" + day + " "  + hours + ":" + minutes + ":" + seconds)
}
async function updateNoteInfo(uid, suid) {
    if ($("#title").text() !== '' && $(".wenzhang_box_article").text() !== '') {
        document.getElementById("uploadIframe").style.display = "block";
        document.getElementsByClassName("base_content_body")[0].style.display = "none";
        document.getElementsByClassName("base_header")[0].style.display = "none";
        document.body.addEventListener('click', function (e) {
            e.preventDefault()
        })
        await deleteFunction(uid, suid, UploadFunction,"upload")
        // .wenzhang_box_article

    } else {
        swal("标题或内容不能为空");
    }
}
try{
    let cc = document.createElement("div");
    cc.id="hidden-value-uploadReaderValue";
    cc.style.display = "none"
    $(".wenzhang_box_article").append(cc)

    let base_ = (window.location.href).split('?')[1].split("&")[0].split("=")[1];
    base_ = base_.split("%")[0]
    uid = sessionStorage.getItem("NoteBookUidInUnique")
    uid = uid.split("%")[0]
    uid = unbase64(uid)
    base_ = unbase64(base_)

    let suid = (window.location.href).split('?')[1].split("&")[1].split("=")[1];
    suid = suid.split("%")[0]
    suid = parseInt(unbase64(suid))


    $(".indexHref").attr("href","NotBook.html?"+base64(base_))
    $(".addHref").attr("href","noteAdd.html?"+base64(base_))
    $("#editNoteList").html(sessionStorage.getItem("editNoteList"))
    $(".updateTime").html(sessionStorage.getItem("updateTime"))
    $(".noteCounts").html(sessionStorage.getItem("noteCounts"))
    $(".collectCounts").html(sessionStorage.getItem("collectCounts"))
    $("#NotBookSave").html(sessionStorage.getItem("NotBookSave"))
    console.log(uid,suid)
    setInterval("time()", 1000);
    data = getData(uid,suid);
    const noteInfo = data;

    console.log(noteInfo)
    if (data !== '没有找到该备忘录') {
        $("#title").text(noteInfo.title);
        $(".wenzhang_box_article").html(noteInfo.text);
        $(".wenzhang_box_article_shengming_title").html(noteInfo.title);
        $(".wenzhang_box_article_shengming_link").html(window.location.href);
        $(".wenzhang_box_content_jieshao_zishu").html("总字数:"+noteInfo.text.length+"字");
        $(".wenzhang_box_content_jieshao_zuozhe").html("作者:"+noteInfo.uid);
        $(".wenzhang_box_content_jieshao_time").html("更新时间:"+noteInfo.time);
        $(".wenzhang_box_content_jieshao_xieti:eq(0)").html(noteInfo.suid);
        $(".wenzhang_box_content_jieshao_xieti:eq(1)").html((Math.random()*10).toFixed(2));
        $(".lsuidHref:eq(0)").attr("href","NotBook.html?"+base64(base_));
        $(".lsuidHref:eq(1)").attr("href","javascript:updateNoteInfo('"+noteInfo.uid+"','"+noteInfo.suid+"')");


    } else {
        swal(data)
        console.log("error:"+data);
    }
}
catch (e) {
    console.log(e);
    swal("你尚未登陆,请重新登录")
    window.location.href = "index.html";
}